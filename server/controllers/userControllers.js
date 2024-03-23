const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Clients} = require('../models/models')

const generateJwt = (IdClients, Mail)=>{
    return jwt.sign(
        {IdClients: IdClients, Mail}, 
        process.env.SECRET_KEY, 
        {expiresIn: '24h'})
}


class UserController {
    async registration(req, res) {
        const {LastName, Name, MiddleName, Phone, Mail, Password} = req.body
        console.log(req.body)

        if (!(Phone || Mail)){
            return next(ApiError.badRequest('Необходимо ввести email или номер телефона'))
        }

        if (!(Phone || Mail) || !Password || !Name){
            return next(ApiError.badRequest('Некорректный пароль или имя'))
        }

        const candidate1 = await Clients.findOne({where: {Mail}})
        if (candidate1) {
        return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }

        const candidate2 = await Clients.findOne({where: {Phone}})
        if (candidate2) {
        return next(ApiError.badRequest('Пользователь с таким номером телефона уже существует'))
        }

        const hashPassword = await bcrypt.hash(Password, 5)
        const clients = await Clients.create({LastName, Name, MiddleName, Phone, Mail, Password: hashPassword})
        const token = generateJwt(clients.IdClients, Mail)
        return res.json({token})
    }
    async login(req, res, next) {
        const {Phone, Mail, Password} = req.body
        if (!Phone && !Mail){
            console.log(req.body)
            return next(ApiError.badRequest('Необходимо ввести email или номер телефона'))
        }
   
        if (!Password){
            return next(ApiError.badRequest('Необходимо ввести пароль'))
        }

        
        
        // const clientM = await Clients.findOne({where: {Mail}})
        
        if (Phone){
            const client = await Clients.findOne({where: {Phone}})
            if (!client){
                return next(ApiError.badRequest('Пользователь с такими данными не найден'))
            }
            let comparePassword = bcrypt.compareSync(Password, client.Password)
            if (!comparePassword){
                return next(ApiError.badRequest('Указан неверный пароль'))
            }
            const token = generateJwt(client.IdClients, Mail)
            return res.json({token})
        }
        if (Mail){
            const client = await Clients.findOne({where: {Mail}})
            if (!client){
                return next(ApiError.badRequest('Пользователь с такими данными не найден'))
            }
            let comparePassword = bcrypt.compareSync(Password, client.Password)
            if (!comparePassword){
                return next(ApiError.badRequest('Указан неверный пароль'))
            }
            const token = generateJwt(client.IdClients, Mail)
            return res.json({token})
        }


    }
    async check(req, res, next) {
        // const {id}= req.query
        // if (!id){
        //     return next(ApiError.badRequest('Не задан id'))
        // }
        // res.json(id)
        // async getAll(req, res) {
            // res.json({message:'ffff'})
            // const clients = await Clients.findAll()
        const token = generateJwt(req.clients.IdClients, req.clients.Mail)
            return res.json(token)
        // }
    }
}
module.exports = new UserController()