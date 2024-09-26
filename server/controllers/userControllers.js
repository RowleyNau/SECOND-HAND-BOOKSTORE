const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const {Clients, Consultants} = require('../models/models')

const generateJwt = (IdClients, Mail, Con)=>{
    return jwt.sign(
        {IdClients: IdClients, Mail, Con}, 
        process.env.SECRET_KEY, 
        {expiresIn: '24h'})
}
function generateRandomString() {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const allChars = letters + digits;

    let hasLetter = false;
    let hasDigit = false;
    let randomString = '';

    // Ensure at least one letter and one digit
    randomString += letters[Math.floor(Math.random() * letters.length)];
    randomString += digits[Math.floor(Math.random() * digits.length)];

    while (randomString.length < 6) {
        const char = allChars[Math.floor(Math.random() * allChars.length)];
        if (letters.includes(char)) hasLetter = true;
        if (digits.includes(char)) hasDigit = true;
        randomString += char;
    }

    // Shuffle the string to make it truly random
    randomString = randomString.split('').sort(() => 0.5 - Math.random()).join('');

    // Verify that the string has at least one letter and one digit
    if (!/[a-zA-Z]/.test(randomString) || !/\d/.test(randomString)) {
        return generateRandomString();
    }

    return randomString;
}
const consultantCheck = async(id) => {
    const consul = await Consultants.count({where: {IdClients: id}});
    console.log(consul)
    if (consul>0)
        {
        return true
        }
    else{
        return false
    } 
}

class UserController {
    async registration(req, res) {
        try{
            const {Name, Mail, Password} = req.body
            console.log(req.body)
            var MAIL = new RegExp("[^@]+@[^@]+\\.[a-zA-Z]{2,6}");
            var PASS = new RegExp("^[a-zA-Z0-9]{3,20}$");

            if (!Mail||Mail==''||!MAIL.test(Mail)){
                return res.status(500).json(ApiError.badRequest('введен некорректный e-mail'))
            }

            if (!Name||Name==''){
                return res.status(500).json(ApiError.badRequest('необходимо ввести имя'))
            }

            const candidate1 = await Clients.findOne({where: {Mail}})
            console.log(candidate1)
            if (candidate1 && candidate1.Confirmed==true) {
                return res.status(500).json(ApiError.badRequest('пользователь с таким e-mail уже существует'))
            }
            if (!candidate1){
                const PasswordTime= generateRandomString();
                const hashPassword = await bcrypt.hash(PasswordTime, 5)
                
                const clients = await Clients.create({Name, Mail, Password: hashPassword, Confirmed:false})
                let testEmailAccount = await nodemailer.createTestAccount();
                // Настройка транспортера с правильным хостом и портом
                let transporter = nodemailer.createTransport({
                    host: 'smtp.mail.ru', // Использование правильного SMTP-сервера
                    port: 587,
                    secure: false, // true для 465, false для других портов
                    auth: {
                        user: 'rowleynau@mail.ru', // Ваш email
                        pass: 'FFzJ5NgxiYSBcTGvXubh', // Ваш пароль
                    },
                    tls: {
                        rejectUnauthorized: false // Отключение проверки сертификата (может помочь при некоторых проблемах с SSL)
                    }
                });
                
                let result = await transporter.sendMail({
                    from: '"BookBox" <rowleynau@mail.ru>',
                    to: Mail,
                    subject: 'Регитрация',
                    text: 'Завершите регистрацию на сайте BookBox',
                    html: 'Ваш времнный пароль для входа <strong>'+PasswordTime+'</strong>. Его можно будет изменить в личном кабинете. Если вы не регистрировались, то просто проигнорируйте сообщение данное сообщение.',
                });

                // if (!Password||Password==''||!PASS.test(Password)){
                    return res.status(500).json(ApiError.badRequest('Вам на почту был отправлен пароль. Введите его в соответвующее поле', {value:false}))
                // }
        
                // console.log('Email sent:', result)
                // return res.json(clients)
            }
            // if (!Password||Password==''||!PASS.test(Password)){
            //     return res.status(500).json(ApiError.badRequest('Введен некорректный пароль'))
            // }
            console.log(Password, candidate1.Password)
            let comparePassword = bcrypt.compareSync(Password, candidate1.Password);
            if (!Password||Password==''||candidate1 && !comparePassword) {
                return res.status(500).json(ApiError.badRequest('введен неверный пароль', {value:false}))
            }
            if (candidate1 && comparePassword) {
                console.log('здесь в штуке')
                const dataCl = {
                    Name: candidate1.Name, Mail: candidate1.Mail, Password: candidate1.Password, Confirmed:true
                }
                await Clients.update(dataCl, { where: {Mail: Mail} });
                let Con= false;
                const token = generateJwt(candidate1.IdClients, Mail, Con)
                console.log(candidate1.IdClients, Mail, Con);
                return res.json({token})
            }





            let testEmailAccount = await nodemailer.createTestAccount();

            if (!Password||Password==''||!PASS.test(Password)){
                return res.status(500).json(ApiError.badRequest('введен некорректный пароль'))
            }
            // Настройка транспортера с правильным хостом и портом
            let transporter = nodemailer.createTransport({
                host: 'smtp.mail.ru', // Использование правильного SMTP-сервера
                port: 587,
                secure: false, // true для 465, false для других портов
                auth: {
                    user: 'rowleynau@mail.ru', // Ваш email
                    pass: 'FFzJ5NgxiYSBcTGvXubh', // Ваш пароль
                },
                tls: {
                    rejectUnauthorized: false // Отключение проверки сертификата (может помочь при некоторых проблемах с SSL)
                }
            });
    
            
            let result = await transporter.sendMail({
                from: '"BookBox" <rowleynau@mail.ru>',
                to: 'rowleynau@gmail.com',
                subject: 'Регитрация',
                text: 'Завершите регистрацию на сайте BookBox',
                html: 'Ваш времнный пароль для входа <strong>Node js</strong>. Его можно будет изменить в личном кабинете. Если вы не регистрировались, то просто проигнорируйте сообщение данное сообщение.',
            });
    
            console.log('Email sent:', result);

            // const hashPassword = await bcrypt.hash(Password, 5)
            // const clients = await Clients.create({Name, Mail, Password: hashPassword})
            // let Con= false;
            // const token = generateJwt(clients.IdClients, Mail, Con)
            // console.log(clients.IdClients, Mail, Con);
            // return res.json({token})

        }
        catch(error){
            console.error("Error deleting category:", error);
            return res.status(500).json({ error: 'Произошла ошибка. Попробуйте позже' });
        }
    }
    async login(req, res, next) {
        try{
            const {Mail, Password} = req.body
            if (!Mail||Mail==''){
                return res.status(500).json(ApiError.badRequest('необходимо ввести e-mail'))
            }
            if (!Password||Password==''){
                return res.status(500).json(ApiError.badRequest('необходимо ввести пароль'))
            }

            const client = await Clients.findOne({where: {Mail}})
            if (!client){
                return res.status(500).json(ApiError.badRequest('пользователь с такими данными не найден'))
            }
            let comparePassword = bcrypt.compareSync(Password, client.Password);
            if (!comparePassword){
                return res.status(500).json(ApiError.badRequest('указан неверный пароль'))
            }
            let Con= await consultantCheck(client.IdClients);
            console.log(Con)
            const token = generateJwt(client.IdClients, client.Mail, Con);
            return res.json({token})
        }
        catch(error){
            console.error("Error deleting category:", error);
            return res.status(500).json({ error: 'произошла ошибка. Попробуйте позже' });
        }
    }
    async check(req, res, next) {
        // const token = generateJwt(req.user.id, req.user.email, req.user.role)
        const {dataToken}= req.query;
        console.log("1111")
        console.log(jwt.decode(dataToken))
        const dataToken2 = jwt.decode(dataToken)
        const token = generateJwt(dataToken2.IdClients, dataToken2.Mail, dataToken2.Con);
        console.log(token)
        return res.json(token)
    }
    async UserGetOne(req, res){
        const {dataToken}= req.query;
        const dataDecode = jwt.decode(dataToken);
        const client = await Clients.findOne(
            {
                where: {
                    IdClients: dataDecode.IdClients
                }
            }
        )
        return res.json(client)
        // console.log(client)

    }
    async UserGetOneId(req, res){
        const {id}= req.query;
        const client = await Clients.findOne(
            {
                where: {
                    IdClients: id
                },
                attributes:['IdClients', 'LastName', 'Name', 'MiddleName', 'Phone', 'Mail'], 
                include:[{
                    model:Consultants, 
                    required: false
                }]
            }
        )
        return res.json(client)
    }
    async UserDel(req, res){
        const {id}= req.body;
        const client = await Clients.destroy(
            {
                where: {
                    IdClients: id
                }
            }
        )
        return res.json(client)
    }
    async UserGetAll(req, res){
        const {limit, page} = req.query;
        let pageConst = page||1;
        let limitConst = limit||50;
        let offset = pageConst * limitConst - limit;
        const amount = await Clients.count();
        const clients = await Clients.findAll({
            offset: offset,
            limit: limitConst,
            attributes:['IdClients', 'LastName', 'Name', 'MiddleName', 'Phone', 'Mail'], 
            include:[{
                model:Consultants, 
                required: false
            }]
        })
        return res.json({clients, amount})

    }
    async UserSearchGetAll(req, res){
        const {Name,limit, page,} = req.query;
        page = page||1;
        limit = limit||50;
        let offset = page * limit - limit;
        const amount = await Clients.count();
        const clients = await Clients.findAll({
            offset: offset,
            limit: limit,
            attributes:['IdClients', 'LastName', 'Name', 'MiddleName', 'Phone', 'Mail'], 
            where:{
                [Op.or]: [
                    { Phone: { [Op.iLike]: '%' + Name + '%' } },
                    { Name: { [Op.iLike]: '%' + Name + '%' } }
                ]
            },
            include:[{
                model:Consultants, 
                required: false
            }]
        })
        return res.json({clients, amount})
    }
}
module.exports = new UserController()