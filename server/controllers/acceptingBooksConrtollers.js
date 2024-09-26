const ApiError = require('../error/ApiError')
const { Sequelize, DataTypes, Op } = require('sequelize');
const fs = require('fs');
const jwt = require('jsonwebtoken')

const {Genres, Authors, Consultants, CategoriesOtherGoods, OtherGoods, ReceptionofGoods, Clients, Photobooksforreception, ResponseToRequestToAcceptBook} = require('../models/models')

    async function syncSequence() {
        try {
            // Получаем текущее значение последовательности
            const result = await sequelize.query('SELECT last_value FROM public.genres_id_seq', { type: sequelize.QueryTypes.SELECT });
            const lastValue = result[0].last_value;
        
            // Получаем максимальное значение Id в таблице genres
            const maxIdResult = await sequelize.query('SELECT MAX("Id") AS maxId FROM public.genres', { type: sequelize.QueryTypes.SELECT });
            const maxId = maxIdResult[0].maxId;
        
            if (lastValue < maxId) {
              // Обновляем последовательность
              await sequelize.query(`SELECT setval('public.genres_id_seq', ${maxId})`);
              console.log('Sequence synchronized successfully.');
            } else {
              console.log('Sequence is already synchronized.');
            }
          } catch (error) {
            console.error('Error synchronizing sequence:', error);
          }
      }
class acceptingBooksConrtollers {

    async AcceptingBooksAdd(req, res) {
        const {IdClients, Comment, TransportAssistance, RequestDate, Photo} = req.body;
        console.log(typeof IdClients, typeof Comment, typeof TransportAssistance,typeof  RequestDate);
        console.log(IdClients, Comment, TransportAssistance, RequestDate);
        if (!Photo){            
            return res.status(400).json(ApiError.badRequest('необходимо прикрепить фото'));
        }
        
        const ReceptionData = {
            IdClients: parseInt(IdClients),
            Comment:Comment, 
            TransportAssistance:JSON.parse(TransportAssistance), 
            RequestDate:RequestDate
        }
        const Reception = await ReceptionofGoods.create(ReceptionData)
        const IdReceptionOfGoods = Reception.IdReceptionOfGoods
        console.log(Reception);
        return res.json({IdReceptionOfGoods})
    }

    async AcceptingBooksPhotoAdd(req, res) {
        console.log('!');
        const {IdReceptionOfGoods, formData} = req.body;
        console.log(req.body);
        try{

          var Photo=[];
          var Ph = /^Photo\[\d+\]$/;
          for (let key in req.body) {
            console.log(key)
            console.log(Ph.test(key))
            if(Ph.test(key)){
                console.log('!!!')
                Photo.push(req.body[key])
            }
          }
              
          console.log(Photo, 111);
        
            fs.mkdir('static/images/accepting/'+IdReceptionOfGoods, { recursive: true }, err => {
                if(err) throw err; // не удалось создать папки
                console.log('Все папки успешно созданы');
            });


            if (Photo!=="")
            {for (let i = 0; i< Photo.length; i++){
                console.log(Photo[i], "я тут");
                fs.writeFile('static/images/accepting/'+IdReceptionOfGoods+'/'+IdReceptionOfGoods+'_'+i+'.txt', Photo[i], (err) => {
                    if (err) {
                        console.error('Ошибка при сохранении файла:', err);
                    } else {
                        console.log('Файл успешно сохранен.');
                    }
                });
                await Photobooksforreception.create({
                    Photo: String(IdReceptionOfGoods+'_'+i+'.txt'),
                    IdReceptionOfGoods: IdReceptionOfGoods
                });
            }} 
            console.log('!') 
            return res.json({ message: 'Фото успешно добавлены'});        
        } 
        catch (error) {
            console.log('!!')
            console.error("Error creating records:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
    async AcceptingBooksGetAll(req, res) {
        console.log('!!!')
        try{
            const Receptiono = await ReceptionofGoods.findAll({
            include: [{
                model: Photobooksforreception,
            required: false
            },{
                model: Clients,
                attributes:['Name']
            }, {
                model: ResponseToRequestToAcceptBook,
                required: false
            }],
            where: {
                '$responsetorequesttoacceptbook.IdReceptionOfBooks$': {
                    [Op.is]: null
                }
            }
            
        })
        return res.json({Receptiono})
        }
        catch(e){
            console.log(e)
            return res.status(500).json({ error: 'возникла ошибка' });
        }
    }
    async AcceptingBooksClientsGetAll(req, res) {
        console.log('подбор клиента')
        const {dataToken}= req.query;
        console.log(jwt.decode(dataToken))
        const dataToken2 = jwt.decode(dataToken)
        try{
            const Receptiono = await ReceptionofGoods.findAll({
                where:{
                    IdClients: dataToken2.IdClients
                },
                include: [{
                    model: Photobooksforreception,
                    where: {
                        Photo: {
                            [Sequelize.Op.like]: '%\\_0.txt'
                        }
                    },
                required: false
                },{
                    model: ResponseToRequestToAcceptBook,
                    attributes:['Response'],
                    required: false
                }]
            })
        return res.json({Receptiono})
        }
        catch(e){
            console.log(e)
            return res.status(500).json({ error: 'возникла ошибка' });
        }
        // return res.json({Receptiono})
    }
    async AcceptingBooksGetOne(req, res) {
        const {id}= req.query;
        try{
            const Receptiono = await ReceptionofGoods.findOne({
                where:{
                    IdReceptionOfGoods:id
                },
                include: [{
                    model: Photobooksforreception,
                required: false
                },{
                    model: Clients,
                    attributes:['Name']
                }]
             })
            return res.json({Receptiono})
        }
        catch(e){
            console.log(e)
            return res.status(500).json({ error: 'возникла ошибка' });
        }
    }
    async AcceptingBooksDel(req, res) {
        try {
            const { id } = req.body;
            console.log(id);
            const countId = await OtherGoods.count({ 
                where: { IdCategoriesOtherGoods: id }
            });
            console.log(id, countId);
            if (countId == 0) {
                const categories = await CategoriesOtherGoods.destroy({
                    where: { Id: id }
                });
                return res.json({ categories });
            } else {
                return res.status(500).json({ error: 'Эта характеристика уже используется. Лучше отредактируйте ее' });
            }
        } catch (error) {
            console.error("Error deleting category:", error);
            return res.status(500).json({ error: 'Произошла ошибка. Попробуйте позже' });
        }
    }
    async AcceptingBooksUpdate(req, res) {
        try {
            const { id, name } = req.body;
            console.log(id);
           
            const content = await CategoriesOtherGoods.update(
                { Name: name }, // данные для обновления
                { where: { Id: id } } // условия для обновления
            );
            return res.json({ content });
        } 
        catch (error) {
            console.error("Error updating record:", error);
            return res.status(500).json({ error: "Произошла ошибка. Попробуйте позже" });
        } 
    }
    // async CategoriesOtherGoodsGetAllSearch(req, res) {
    //     let {Name} = req.query;
    //     console.log(Name)
    //     const categories = await CategoriesOtherGoods.findAll({
    //         where: { 
    //             Name: { [Op.iLike]: '%' + Name + '%' } }
    //     })
    //     return res.json({categories})
    // }
    //
     async ResponseToRequestToAcceptBookAdd(req, res) {
        try{
        const {Response, IdReceptionOfBooks, dataToken} = req.body;
        console.log(typeof IdClients, typeof Comment, typeof TransportAssistance,typeof  RequestDate);
        const dataToken2 = jwt.decode(dataToken)
        const consultant = await Consultants.findOne({
            where:{
                IdClients:dataToken2.IdClients
            }
        })
        const Reception = await ResponseToRequestToAcceptBook.create({
            Response:Response,
            IdReceptionOfBooks:IdReceptionOfBooks,
            IdConsultants:consultant.Id
        })
        
        return res.json({Reception})
        }catch(e){
            console.log(e)
            return res.status(500).json({ error: 'возникла непредвиденная ошибка' });
        }
        
    }
}

            
module.exports = new acceptingBooksConrtollers()