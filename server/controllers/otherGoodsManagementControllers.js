
const { Sequelize, DataTypes, Op } = require('sequelize');
const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')
const fs = require('fs');
// const multer = require('multer');
// const upload = multer();
const path = require('path');
const {Goods, GoodsLocations, BookAuthors, BookCategories, BookGenres, GoodsSize, Owners, PhotoGoods, Connections, Locations, Availability, Authors, Genres, Categories, Bindingtype, Agerestriction, Goodstates, Clients, Publishers, Cities, OtherGoods, CategoriesOtherGoods} = require('../models/models')
function extractIndex(key) {
            const match = key.match(/^photo\[(\d+)\]$/);
            console.log(match);
            return match ? parseInt(match[1], 10) : null;
          }
class BookManagementController {

    async OtherGoodsAdd(req, res) {
        // const token = req.headers.authorization.split(' ')[1];
        console.log('!');
        const {IdCities, Price, OZON, VK, Instagram, IdStates, Weight, Amount, IdLocations, IdAvailability, ReceiptDate, IdConnections, Name, Description, Notes, Category,  Parametr1, Parametr2, Parametr3, OwnerBook} = req.body;
        console.log(req.body);
        let IdCitiesCorrect=IdCities, PriceCorrect=Price, OZONCorrect =OZON, VKCorrect=VK, InstagramCorrect=Instagram, IdStatesCorrect=IdStates, WeightCorrect=Weight, AmountCorrect=Amount, IdLocationsCorrect=IdLocations, IdAvailabilityCorrect=IdAvailability, ReceiptDateCorrect=ReceiptDate, IdConnectionsCorrect=IdConnections;
// , MainPhoto, Photo
        let  NameCorrect = Name, DescriptionCorrect = Description, NotesCorrect = Notes;
       
        let Parametr1Correct=Parametr1, Parametr2Correct=Parametr2, Parametr3Correct=Parametr3;
        

        if (((Name=='')||(Price=='')||(IdStates=='')||(Amount=='')||(IdLocations=='')||(IdAvailability=='')||(Description=='')||(Parametr1=='')||(Parametr2=='')||(Parametr3==''))||(!(Name)||!(Price)||!(IdStates)||!(Amount)||(IdLocations.length==0)||!(IdAvailability)||!(Description)||!(Parametr1)||!(Parametr2)||!(Parametr3))){
            // ||(MainPhoto=='')(MainPhoto)||!
            console.log('!!!')
            return res.status(400).json(ApiError.badRequest('Не все обязательные поля заполнены'));
            // "Missing required fields"
       
            }


            // Сначала создаем запись в таблице Goods
        const goodsData = {
            Price: parseInt(PriceCorrect),
            IdStates: parseInt(IdStatesCorrect),
            // Weight: parseInt(WeightCorrect),
            Amount: parseInt(AmountCorrect),
            // IdLocations: parseInt(IdLocationsCorrect),
            IdAvailability: parseInt(IdAvailabilityCorrect),
            ReceiptDate: ReceiptDateCorrect
        };
        
        if (IdConnectionsCorrect==''||typeof IdConnectionsCorrect == "undefined"){
            const ConNew = await Connections.create();
            console.log(ConNew.Id);
            goodsData.IdConnections= parseInt(ConNew.Id);
        }
        else{
            goodsData.IdConnections = parseInt(IdConnectionsCorrect);
        }
        if (IdCitiesCorrect != ''&typeof IdCitiesCorrect != "undefined") {
            goodsData.IdCities = parseInt(IdCitiesCorrect);
        }
        if (OZONCorrect != ''&typeof OZONCorrect != "undefined") {
            goodsData.OZON= OZONCorrect;
        }
        if (InstagramCorrect != ''&typeof InstagramCorrect != "undefined") {
            goodsData.Instagram = InstagramCorrect;
        } 
        if (VKCorrect != ''&typeof VKCorrect != "undefined") {
            goodsData.VK= VKCorrect;
        }
        if (WeightCorrect != ''&typeof WeightCorrect != "undefined") {
            goodsData.Weight= parseInt(WeightCorrect);
        }
    try {
        const goods = await Goods.create(goodsData)
        

        const othergoods ={
            Name: Name,
            IdCategoriesOtherGoods: parseInt(Category.value),
            Description: DescriptionCorrect,
            Notes: NotesCorrect,
            IdGoods: goods.IdGoods
        }
        
        const other = await OtherGoods.create(othergoods);

       
        if(OwnerBook != ''&typeof OwnerBook != "undefined")
        {await OwnerBook.forEach(async item => {
            await Owners.create({
                IdClient: parseInt(item.id),
                IdGoods: goods.IdGoods 
            });
        });}
        if((Parametr1Correct != '')&(Parametr2Correct != '')&(Parametr3Correct != ''))
        {await GoodsSize.create({
            Parameter1: parseInt(Parametr1Correct),
            Parameter2: parseInt(Parametr2Correct),
            Parameter3: parseInt(Parametr3Correct),
            IdGoods: goods.IdGoods 
        });}

        await IdLocations.forEach(async item => {
            await GoodsLocations.create({
                Idlocations: parseInt(item.id),
                Amount: parseInt(item.Amount),
                IdGoods: goods.IdGoods
            });
        });

        console.log('!')
        const IdGoods = goods.IdGoods;
        console.log({IdGoods}) 

        return res.json({IdGoods});     
    } 
        catch (error) {
            console.log('!!')
            console.error("Error creating records:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
    async OtherGoodsPhotoAdd(req, res) {
        // const token = req.headers.authorization.split(' ')[1];
        console.log('!');
        const {IdGoods,  MainPhoto, formData} = req.body;
        console.log(req.body);
        // console.log(typeof Photo, typeof MainPhoto);
        // const photoArray = splitString(PhotoStr, ' ');;
        // const obj = JSON.parse(Photo);
        
        // console.log(photoArray,typeof photoArray);

        
          
          // Преобразование объекта в массив
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
              
          console.log(Photo);
        try{
            if (!(MainPhoto)||MainPhoto==''){
                // ||)
                console.log('!!!')
                return res.status(400).json(ApiError.badRequest('Не все обязательные поля заполнены'));
                // "Missing required fields"
        
                }



            fs.mkdir('static/images/goods/'+IdGoods, { recursive: true }, err => {
                if(err) throw err; // не удалось создать папки
                console.log('Все папки успешно созданы');
            });

            
            fs.writeFile('static/images/goods/'+IdGoods+'/'+IdGoods+'_0.txt', MainPhoto, (err) => {
                if (err) {
                    console.error('Ошибка при сохранении файла:', err);
                } else {
                    console.log('Файл успешно сохранен.');
                }
            });
            await PhotoGoods.create({
                Photo: String(IdGoods+'_0.txt'),
                IdGoods: IdGoods, 
                Cover: true 
            });

            if (Photo!=="")
            {for (let i = 0; i< Photo.length; i++){
                console.log(Photo[i], "я тут");
                fs.writeFile('static/images/goods/'+IdGoods+'/'+IdGoods+'_1'+i+'.txt', Photo[i], (err) => {
                    if (err) {
                        console.error('Ошибка при сохранении файла:', err);
                    } else {
                        console.log('Файл успешно сохранен.');
                    }
                });
                await PhotoGoods.create({
                    Photo: String(IdGoods+'_1'+i+'.txt'),
                    IdGoods: IdGoods, 
                    Cover: false 
                });
            }} 
            console.log('!') 
            return res.json({ message: 'Фото товара успешно добавлены'});        
        } 
        catch (error) {
            console.log('!!')
            console.error("Error creating records:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
    async OtherGoodsGetAll(req, res) {
        try {
            // const token = req.headers.authorization.split(' ')[1];
            let { limit, page } = req.query;
            
            console.log(req.query);
            page = page || 1;
            limit = limit || 50;
            let offset = page * limit - limit;
    
            // Логирование параметров запроса
            console.log('Page:', page, 'Limit:', limit, 'Offset:', offset);
    
            // Проверка количества записей в таблице OtherGoods
            const amount = await OtherGoods.count();
            console.log('Total OtherGoods count:', amount);
    
            // Запрос к базе данных
            const good = await OtherGoods.findAll({
                offset: offset,
                limit: limit,
                include: [
                    {
                        model: Goods,
                        attributes: ['IdGoods', 'Price'],
                        include: [
                            {
                                model: GoodsLocations,
                                include: [
                                    {
                                        model: Locations,
                                        attributes: ['Name']
                                    }
                                ]
                            },
                            {
                                model: Availability,
                                attributes: ['Name']
                            }
                        ]
                    }
                ],
                attributes: ['Name']
            });
    
            // Логирование полученных данных
            console.log('Retrieved goods:', good);
    
            return res.json({ good, amount });
        } catch (error) {
            console.error('Error in OtherGoodsGetAll:', error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
    async OtherGoodsSearchGetAll(req, res) {
        // const token = req.headers.authorization.split(' ')[1];
        let {limit, page, Name} = req.query;
        
        console.log(req.query);
        page = page||1;
        limit = limit||50;
        let offset = page * limit - limit;
        const amount = await OtherGoods.count();
            console.log('Total OtherGoods count:', amount);
    
            // Запрос к базе данных
            const good = await OtherGoods.findAll({
                offset: offset,
                limit: limit,
                where: { 
                    Name: { [Op.iLike]: '%' + Name + '%' } },
                include: [
                    {
                        model: Goods,
                        attributes: ['IdGoods', 'Price'],
                        include: [
                            {
                                model: GoodsLocations,
                                include: [
                                    {
                                        model: Locations,
                                        attributes: ['Name']
                                    }
                                ]
                            },
                            {
                                model: Availability,
                                attributes: ['Name']
                            }
                        ]
                    }
                ],
                attributes: ['Name']
            });
    
            // Логирование полученных данных
            console.log('Retrieved goods:', good);
    
            return res.json({ good, amount });
    }
    async OtherGoodsGet(req, res) {
        const {id} = req.query;
        console.log(typeof id);
        console.log(req.query);
        try {
            const good = await Goods.findOne({
                where: {
                    IdGoods: id
                },
                include: [
                    {
                        model: OtherGoods,
                        include: [
                            {
                                model: CategoriesOtherGoods,
                                attributes: ['Name', 'Id']
                            }
                        ]
                    },
                    {
                        model: Cities,
                        attributes: ['Name']
                    },
                    {
                        model: Availability,
                        attributes: ['Name']
                    },
                    {
                        model: Goodstates,
                        attributes: ['Name']
                    },
                    {
                        model: GoodsLocations,
                        include: [
                            {
                                model: Locations,
                                attributes: ['Name']
                            }
                        ]
                    },
                    {
                        model: Connections,
                        attributes: ['Id'],
                        include: [
                            {
                                model: Goods,
                                attributes: ['IdGoods'],
                                include: [
                                    {
                                        model: OtherGoods,
                                        attributes: ['Name', 'IdOtherGoods']
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        model: PhotoGoods,
                        attributes: ['Photo', 'Cover']
                    },
                    {
                        model: Owners,
                        attributes: ['IdClient'],
                        include: [
                            {
                                model: Clients,
                                attributes: ['Name', 'Mail', 'IdClients']
                            }
                        ]
                    },
                    {
                        model: GoodsSize,
                        attributes: ['Parameter1', 'Parameter2', 'Parameter3']
                    },
                    {
                        model: Goodstates,
                        attributes: ['Name']
                    }
                ]
            });
    
            return res.json({ good });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Something went wrong' });
        }
    }
    async OtherGoodsDel(req, res) {
        const {id} = req.body;
        console.log(req.body);
        try {
        const goodID = await Goods.findOne({
            where:{
                IdGoods:id
            }
        })
        const good = await Goods.destroy({
            where:{
                IdGoods:id
            }
        })

        const idCon = await Goods.count(
            { 
                where: { IdConnections: goodID.IdConnections }
            }
        )
        console.log(goodID.IdConnections, idCon)
        if (idCon==0){
            await Connections.destroy({
                where:{
                    Id:goodID.IdConnections
                }
            })
        }

        // return res.json({good})
        // console.log('static/images/goods/'+goodID.IdGoods)
        const folderPath = 'static/images/goods/'+goodID.IdGoods;
        if (fs.existsSync(folderPath)) {
            fs.readdirSync(folderPath).forEach((file) => {
              const curPath = path.join(folderPath, file);
              if (fs.lstatSync(curPath).isDirectory()) { // рекурсивный вызов
                deleteFolderRecursive(curPath);
              } else { // удалить файл
                fs.unlinkSync(curPath);
              }
            });
            fs.rmdirSync(folderPath);
          }
        return res.status(201).json({ message: 'Данные книги удалены', good });        
    } 
        catch (error) {
            console.error("Error creating records:", error);
            return res.status(500).json({ error: "Произошла ошибка. Попробуйте позже" });
        }
    }

    async OtherGoodsUpdate(req, res) {
        // const {id} = req.params; // Идентификатор книги для обновления
        const {IdGoods, IdCities, Price, OZON, VK, Instagram, IdStates, Weight, Amount, AmountPurchased, AmountReserved, IdLocations, IdAvailability, ReceiptDate, IdConnections, Name, Description, Notes, Category, Parametr1, Parametr2, Parametr3, OwnerBook} = req.body;
        const id = IdGoods;
        console.log(req.body);
        console.log(Category);
        if (((Name=='')||(Price=='')||(IdStates=='')||(Amount=='')||(IdLocations=='')||(IdAvailability=='')||(Description=='')||(Parametr1=='')||(Parametr2=='')||(Parametr3==''))||(!(Name)||!(Price)||!(IdStates)||!(Amount)||(IdLocations.length==0)||!(IdAvailability)||!(Description)||!(Parametr1)||!(Parametr2)||!(Parametr3))){
            console.log(Name, ' | ', ' | ', Price, ' | ', IdStates, ' | ', Amount, ' | ', IdLocations, ' | ', IdAvailability,  ' | ', Description, ' | ', Parametr1, ' | ', Parametr2, ' | ', Parametr3);
        console.log('!!!!');
            return res.status(400).json(ApiError.badRequest('Не все обязательные поля заполнены'));
            // "Missing required fields"
            }
            let IdCitiesCorrect=IdCities, PriceCorrect=Price, OZONCorrect =OZON, VKCorrect=VK, InstagramCorrect=Instagram, IdStatesCorrect=IdStates, WeightCorrect=Weight, AmountCorrect=Amount, IdLocationsCorrect=IdLocations, IdAvailabilityCorrect=IdAvailability, ReceiptDateCorrect=ReceiptDate, IdConnectionsCorrect=IdConnections;

            let  NameCorrect = Name, DescriptionCorrect = Description, NotesCorrect = Notes;
           
            let Parametr1Correct=Parametr1, Parametr2Correct=Parametr2, Parametr3Correct=Parametr3;
        try {
            const goods = await Goods.findOne({ where: { IdGoods: id } });
            if (!goods) {
                return res.status(404).json({ message: "Goods not found" });
            }
    
            const goodsData = {
                Price: parseInt(Price),
                IdStates: parseInt(IdStates),
                // Weight: parseInt(Weight),
                Amount: parseInt(Amount),
                AmountPurchased: parseInt(AmountPurchased),
                AmountReserved: parseInt(AmountReserved),
                // IdLocations: parseInt(IdLocations),
                IdAvailability: parseInt(IdAvailability),
                ReceiptDate: ReceiptDate
                // IdCities: parseInt(IdCities),
                // OZON: OZON,
                // Instagram: Instagram,
                // VK: VK,
                // IdConnections: parseInt(IdConnections)
            };
            if (IdConnectionsCorrect==''||typeof IdConnectionsCorrect == "undefined"){
                const ConNew = await Connections.create();
                console.log(ConNew.Id);
                goodsData.IdConnections= parseInt(ConNew.Id);
            }
            else{
                goodsData.IdConnections = parseInt(IdConnectionsCorrect);
            }
            if (IdCitiesCorrect != ''&typeof IdCitiesCorrect != "undefined") {
                goodsData.IdCities = parseInt(IdCitiesCorrect);
            }
            if (OZONCorrect != ''&typeof OZONCorrect != "undefined") {
                goodsData.OZON= OZONCorrect;
            }
            if (InstagramCorrect != ''&typeof InstagramCorrect != "undefined") {
                goodsData.Instagram = InstagramCorrect;
            } 
            if (VKCorrect != ''&typeof VKCorrect != "undefined") {
                goodsData.VK= VKCorrect;
            }
            if (WeightCorrect != ''&typeof WeightCorrect != "undefined") {
                goodsData.Weight= parseInt(WeightCorrect);
            }
            await Goods.update(goodsData, { where: { IdGoods: id } });
    
            const OtherGoodsData = {
                Name: Name,
                IdCategoriesOtherGoods: parseInt(Category),
                Description: DescriptionCorrect,
                Notes: NotesCorrect,
                IdGoods: goods.IdGoods
            };

            await OtherGoods.update(OtherGoodsData, { where: { IdGoods: id } });
            const BookNew = await OtherGoods.findOne({
                 where: { IdGoods: id }
            })
            // console.log(BookNew)
            // Обновление владельцев
            await Owners.destroy({ where: { IdGoods: id } });
            if (OwnerBook!=='') {
                for (const item of OwnerBook) {
                    await Owners.create({
                        IdClient: parseInt(item.id),
                        IdGoods: id
                    });
                }
            }
    
            // Обновление размеров
            if (Parametr1!=='' && Parametr2!=='' && Parametr3!=='') {
                await GoodsSize.update({
                    Parameter1: parseInt(Parametr1),
                    Parameter2: parseInt(Parametr2),
                    Parameter3: parseInt(Parametr3)
                }, { where: { IdGoods: id } });
            }
  
            await GoodsLocations.destroy({ where: { IdGoods: goods.IdGoods } });
            await IdLocations.forEach(async item => {
                await GoodsLocations.create({
                    Idlocations: parseInt(item.id),
                    Amount: parseInt(item.Amount),
                    IdGoods: goods.IdGoods
                });
            });

            // Обновление фото

            const folderPath = 'static/images/goods/'+id;
            if (fs.existsSync(folderPath)) {
                fs.readdirSync(folderPath).forEach((file) => {
                  const curPath = path.join(folderPath, file);
                  if (fs.lstatSync(curPath).isDirectory()) { // рекурсивный вызов
                    deleteFolderRecursive(curPath);
                  } else { // удалить файл
                    fs.unlinkSync(curPath);
                  }
                });
                fs.rmdirSync(folderPath);
              }

            await PhotoGoods.destroy({ where: { IdGoods: id } });
        
            const idCon = await Goods.count(
                { 
                    where: { IdConnections: goods.IdConnections }
                }
            )
            console.log(goods.IdConnections, idCon)
            if (idCon==0){
                await Connections.destroy({
                    where:{
                        Id:goods.IdConnections
                    }
                })
            }
    console.log('lf');
            return res.json({ message: "Book updated successfully" });
        } catch (error) {
            console.error(error);
            console.log('!!no!!');
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
module.exports = new BookManagementController()