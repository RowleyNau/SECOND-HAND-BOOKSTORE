
const { Sequelize, DataTypes, Op } = require('sequelize');
const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')
const fs = require('fs');
const path = require('path');
const {Goods, BookList, BookAuthors, BookCategories, BookGenres, GoodsSize, Owners, PhotoGoods, Connections, Locations, Availability, Authors, Genres, Categories, Bindingtype, Agerestriction, Goodstates, Clients, Publishers, Cities} = require('../models/models')

class GoodsControllers {

    async GoodsTimeGet(req, res) {
        let {startDate, endDate} = req.query;
        const all = await Goods.findAll({
            where:{
                ReceiptDate:{
                    [Op.between]: [startDate, endDate]
                }
            }
        })
        return res.json({all})
    }


//     async BookAdd(req, res) {
//         // const token = req.headers.authorization.split(' ')[1];
//         const {IdCities, Price, OZON, VK, Instagram, IdStates, Weight, Amount, IdLocations, IdAvailability, ReceiptDate, IdConnections, Name, YearOfPublication,NumberOfPages, IdBindingType, ISBN, IdAgeRestriction, Description, Notes, IdPublishers, Author, Category, Genre, Parametr1, Parametr2, Parametr3, OwnerBook, MainPhoto} = req.body;
//         console.log(req.body);
//         let IdCitiesCorrect=IdCities, PriceCorrect=Price, OZONCorrect =OZON, VKCorrect=VK, InstagramCorrect=Instagram, IdStatesCorrect=IdStates, WeightCorrect=Weight, AmountCorrect=Amount, IdLocationsCorrect=IdLocations, IdAvailabilityCorrect=IdAvailability, ReceiptDateCorrect=ReceiptDate, IdConnectionsCorrect=IdConnections;

//         let  NameCorrect = Name, YearOfPublicationCorrect = YearOfPublication, NumberOfPagesCorrect = NumberOfPages, IdBindingTypeCorrect = IdBindingType, ISBNCorrect = ISBN,  IdAgeRestrictionCorrect = IdAgeRestriction, DescriptionCorrect = Description, NotesCorrect = Notes, IdPublishersCorrect = IdPublishers;
       
//         let Parametr1Correct=Parametr1, Parametr2Correct=Parametr2, Parametr3Correct=Parametr3;

        

//         if ((((Name=='')||(Author=='')||(Price=='')||(IdStates=='')||(Amount=='')||(IdLocations=='')||(IdAvailability=='')||(NumberOfPages=='')||(IdBindingType=='')||(IdAgeRestriction=='')||(Description=='')||(Genre=='')||(Parametr1=='')||(Parametr2=='')||(Parametr3==''))||(!(Name)||!(Author)||!(Price)||!(IdStates)||!(Amount)||!(IdLocations)||!(IdAvailability)||!(NumberOfPages)||!(IdBindingType)||!(IdAgeRestriction)||!(Description)||!(Genre)||!(Parametr1)||!(Parametr2)||!(Parametr3)))||!MainPhoto){
//             console.log(Name, ' | ', Author, ' | ', Price, ' | ', IdStates, ' | ', Amount, ' | ', IdLocations, ' | ', IdAvailability, ' | ', NumberOfPages, ' | ', IdBindingType, ' | ', IdAgeRestriction, ' | ', Description, ' | ', Genre, ' | ', Parametr1, ' | ', Parametr2, ' | ', Parametr3);
//             return res.status(400).json(ApiError.badRequest('Не все обязательные поля заполнены'));
//             // "Missing required fields"
//             }


//             // Сначала создаем запись в таблице Goods
//         const goodsData = {
//             Price: parseInt(PriceCorrect),
//             IdStates: parseInt(IdStatesCorrect),
//             // Weight: parseInt(WeightCorrect),
//             Amount: parseInt(AmountCorrect),
//             IdLocations: parseInt(IdLocationsCorrect),
//             IdAvailability: parseInt(IdAvailabilityCorrect),
//             ReceiptDate: ReceiptDateCorrect
//         };
        
//         if (IdConnectionsCorrect==''||typeof IdConnectionsCorrect == "undefined"){
//             const ConNew = await Connections.create();
//             console.log(ConNew.Id);
//             goodsData.IdConnections= parseInt(ConNew.Id);
//         }
//         else{
//             goodsData.IdConnections = parseInt(IdConnectionsCorrect);
//         }
//         if (IdCitiesCorrect != ''&typeof IdCitiesCorrect != "undefined") {
//             goodsData.IdCities = parseInt(IdCitiesCorrect);
//         }
//         if (OZONCorrect != ''&typeof OZONCorrect != "undefined") {
//             goodsData.OZON= OZONCorrect;
//         }
//         if (InstagramCorrect != ''&typeof InstagramCorrect != "undefined") {
//             goodsData.Instagram = InstagramCorrect;
//         } 
//         if (VKCorrect != ''&typeof VKCorrect != "undefined") {
//             goodsData.VK= VKCorrect;
//         }
//         if (WeightCorrect != ''&typeof WeightCorrect != "undefined") {
//             goodsData.Weight= parseInt(WeightCorrect);
//         }
//     try {
//         const goods = await Goods.create(goodsData)
        

//         const bookListData ={
//             Name: Name,
//             NumberOfPages: parseInt(NumberOfPagesCorrect),
//             IdBindingType: parseInt(IdBindingTypeCorrect),
//             IdAgeRestriction: parseInt(IdAgeRestrictionCorrect),
//             Description: DescriptionCorrect,
//             Notes: NotesCorrect,
//             IdGoods: goods.IdGoods
//         }
        
//         if (YearOfPublicationCorrect !== '' && typeof YearOfPublicationCorrect !== "undefined") {
//             bookListData.YearOfPublication = parseInt(YearOfPublicationCorrect);
//         }
//         if (ISBNCorrect !== '' && typeof ISBNCorrect !== "undefined") {
//             bookListData.ISBN = ISBNCorrect;
//         }
//         if (IdPublishersCorrect !== '' && typeof IdPublishersCorrect !== "undefined") {
//             bookListData.IdPublishers = parseInt(IdPublishersCorrect);  
//         }
        
//         // Предположим, что BookList.create() ожидает объект, а не объект в объекте.
//         const bookList = await BookList.create(bookListData);

//         await Author.forEach(async item => {
//             await BookAuthors.create({
//                 IdAuthors: parseInt(item.value),
//                 IdBookList: bookList.IdBookList 
//             });
//         });
//         if(Category != '')
//         {await Category.forEach(async item => {
//             await BookCategories.create({
//                 IdCategories: parseInt(item.value),
//                 IdBookList: bookList.IdBookList 
//             });
//         });}
//         await Genre.forEach(async item => {
//             await BookGenres.create({
//                 IdGenres: parseInt(item.value),
//                 IdBookList: bookList.IdBookList 
//             });
//         });
//         if(OwnerBook != ''&typeof OwnerBook != "undefined")
//         {await OwnerBook.forEach(async item => {
//             await Owners.create({
//                 IdClient: parseInt(item.id),
//                 IdGoods: goods.IdGoods 
//             });
//         });}
//         if((Parametr1Correct != '')&(Parametr2Correct != '')&(Parametr3Correct != ''))
//         {await GoodsSize.create({
//             Parameter1: parseInt(Parametr1Correct),
//             Parameter2: parseInt(Parametr2Correct),
//             Parameter3: parseInt(Parametr3Correct),
//             IdGoods: goods.IdGoods 
//         });}


//         // fs.mkdir('static/images/goods/'+goods.IdGoods, { recursive: true }, err => {
//         //     if(err) throw err; // не удалось создать папки
//         //     console.log('Все папки успешно созданы');
//         //  });

//         // fs.writeFile('static/images/goods/'+goods.IdGoods+'/'+goods.IdGoods+'_0.txt', MainPhoto[0], (err) => {
//         //     if (err) {
//         //         console.error('Ошибка при сохранении файла:', err);
//         //     } else {
//         //         console.log('Файл успешно сохранен.');
//         //     }
//         // });
//         // await PhotoGoods.create({
//         //     Photo: String(goods.IdGoods+'_0.txt'),
//         //     IdGoods: goods.IdGoods, 
//         //     Cover: true 
//         // });

//         // if (Photo!=="")
//         // {for (let i = 0; i< Photo.length; i++){
//         //     console.log(Photo[i], "я тут");
//         //     fs.writeFile('static/images/goods/'+goods.IdGoods+'/'+goods.IdGoods+'_1'+i+'.txt', Photo[i], (err) => {
//         //         if (err) {
//         //             console.error('Ошибка при сохранении файла:', err);
//         //         } else {
//         //             console.log('Файл успешно сохранен.');
//         //         }
//         //     });
//         //     await PhotoGoods.create({
//         //         Photo: String(goods.IdGoods+'_1'+i+'.txt'),
//         //         IdGoods: goods.IdGoods, 
//         //         Cover: false 
//         //     });
//         // }} 
//         console.log('!')
//         const IdGoods = goods.IdGoods;
//         console.log({IdGoods})    
//         return res.json({IdGoods});           
//     } 
//         catch (error) {
//         console.log('!1111111')
//             console.error("Error creating records:", error);
//             return res.status(500).json({ error: "Internal server error" });
//         }
//     }

//     async BookGetAll(req, res) {
//         // const token = req.headers.authorization.split(' ')[1];
//         let {limit, page} = req.query;
        
//         console.log(req.query);
//         page = page||1;
//         limit = limit||50;
//         let offset = page * limit - limit;
//         const amount = await BookList.count();
//         const good = await BookList.findAll({
//             offset: offset,
//             limit: limit,
//             include: [
//                 {
//                     model: Goods,
//                     attributes: ['IdGoods', 'Price'],
//                     include: [
//                         {
//                             model: Locations,
//                             attributes: ['Name']
//                         },
//                         {
//                             model: Availability,
//                             attributes: ['Name']
//                         }
//                     ]
//                 },
//                 {
//                     model: BookAuthors,
//                     attributes: ['IdBookAuthors'],
//                     include: [
//                         {
//                             model: Authors,
//                             attributes: ['Name', 'Id']
//                         }
//                     ]
//                 }
//             ],
//             attributes: ['Name']
            
//         });
//         // console.log(good)
//         return res.json({good, amount});
//     }
//     async BookSearchGetAll(req, res) {
//         // const token = req.headers.authorization.split(' ')[1];
//         let {limit, page, Name} = req.query;
        
//         console.log(req.query);
//         page = page||1;
//         limit = limit||50;
//         let offset = page * limit - limit;
//         const amount = await BookList.count();
//         const good = await Goods.findAll({
//             offset: offset,
//             limit: limit,
//             include: [
//                 {
//                     model: BookList,
//                     where: { 
//                         Name: { [Op.iLike]: '%' + Name + '%' } },
//                     attributes: ['Name'],
//                     include: [
//                         {
//                             model: BookAuthors,
//                             attributes: ['IdBookAuthors'],
//                             include: [
//                                 {
//                                     model: Authors,
//                                     attributes: ['Name', 'Id']
//                                 }
//                             ]
//                         }
//                     ]
//                 },
//                 {
//                     model: Locations,
//                     attributes: ['Name']
//                 },
//                 {
//                     model: Availability,
//                     attributes: ['Name']
//                 }
//             ],
//             attributes: ['IdGoods', 'Price']
            
//         });
//         console.log(good, amount)
//         return res.json({good, amount});
//     }
//     async BookGet(req, res) {
//         const {id} = req.query;
//         console.log(typeof id);
//         console.log(req.query);
//         try {
//             const good = await Goods.findOne({
//                 where: {
//                     IdGoods: id
//                 },
//                 include: [
//                     {
//                         model: BookList,
//                         include: [
//                             {
//                                 model: BookAuthors,
//                                 attributes: ['IdBookAuthors'],
//                                 include: [
//                                     {
//                                         model: Authors,
//                                         attributes: ['Name', 'Id']
//                                     }
//                                 ]
//                             },
//                             {
//                                 model: BookCategories,
//                                 attributes: ['IdBookCategories'],
//                                 include: [
//                                     {
//                                         model: Categories,
//                                         attributes: ['Name', 'Id']
//                                     }
//                                 ]
//                             },
//                             {
//                                 model: BookGenres,
//                                 attributes: ['IdBookGenres'],
//                                 include: [
//                                     {
//                                         model: Genres,
//                                         attributes: ['Name', 'Id']
//                                     }
//                                 ]
//                             },
//                             {
//                                 model: Bindingtype,
//                                 attributes: ['Name', 'Id']
//                             },
//                             {
//                                 model: Publishers,
//                                 attributes: ['Name', 'Id']
//                             },
//                             {
//                                 model: Agerestriction,
//                                 attributes: ['Name', 'Id']
//                             }
//                         ]
//                     },
//                     {
//                         model: Cities,
//                         attributes: ['Name']
//                     },
//                     {
//                         model: Availability,
//                         attributes: ['Name']
//                     },
//                     {
//                         model: Goodstates,
//                         attributes: ['Name']
//                     },
//                     {
//                         model: Locations,
//                         attributes: ['Name']
//                     },
//                     {
//                         model: Connections,
//                         attributes: ['Id'],
//                         include: [
//                             {
//                                 model: Goods,
//                                 attributes: ['IdGoods'],
//                                 include: [
//                                     {
//                                         model: BookList,
//                                         attributes: ['Name', 'IdBookList']
//                                     }
//                                 ]
//                             }
//                         ]
//                     },
//                     {
//                         model: PhotoGoods,
//                         attributes: ['Photo', 'Cover']
//                     },
//                     {
//                         model: Owners,
//                         attributes: ['IdClient'],
//                         include: [
//                             {
//                                 model: Clients,
//                                 attributes: ['Name', 'Phone', 'IdClients']
//                             }
//                         ]
//                     },
//                     {
//                         model: GoodsSize,
//                         attributes: ['Parameter1', 'Parameter2', 'Parameter3']
//                     },
//                     {
//                         model: Goodstates,
//                         attributes: ['Name']
//                     }
//                 ]
//             });
    
//             return res.json({ good });
//         } catch (error) {
//             console.error(error);
//             return res.status(500).json({ error: 'Something went wrong' });
//         }
//     }

//     async BookDel(req, res) {
//         const {id} = req.body;
//         console.log(req.body);
//         try {
//         const goodID = await Goods.findOne({
//             where:{
//                 IdGoods:id
//             }
//         })
//         const good = await Goods.destroy({
//             where:{
//                 IdGoods:id
//             }
//         })

//         const idCon = await Goods.count(
//             { 
//                 where: { IdConnections: goodID.IdConnections }
//             }
//         )
//         console.log(goodID.IdConnections, idCon)
//         if (idCon==0){
//             await Connections.destroy({
//                 where:{
//                     Id:goodID.IdConnections
//                 }
//             })
//         }

//         // return res.json({good})
//         // console.log('static/images/goods/'+goodID.IdGoods)
//         const folderPath = 'static/images/goods/'+goodID.IdGoods;
//         if (fs.existsSync(folderPath)) {
//             fs.readdirSync(folderPath).forEach((file) => {
//               const curPath = path.join(folderPath, file);
//               if (fs.lstatSync(curPath).isDirectory()) { // рекурсивный вызов
//                 deleteFolderRecursive(curPath);
//               } else { // удалить файл
//                 fs.unlinkSync(curPath);
//               }
//             });
//             fs.rmdirSync(folderPath);
//           }
//         return res.status(201).json({ message: 'Данные книги удалены', good });        
//     } 
//         catch (error) {
//             console.error("Error creating records:", error);
//             return res.status(500).json({ error: "Произошла ошибка. Попробуйте позже" });
//         }
//     }

//     async BookUpdate(req, res) {
//         // const {id} = req.params; // Идентификатор книги для обновления
//         const {IdGoods, IdCities, Price, OZON, VK, Instagram, IdStates, Weight, Amount, IdLocations, IdAvailability, ReceiptDate, IdConnections, Name, YearOfPublication, NumberOfPages, IdBindingType, ISBN, IdAgeRestriction, Description, Notes, IdPublishers, Author, Category, Genre, Parametr1, Parametr2, Parametr3, OwnerBook, MainPhoto} = req.body;
//         const id = IdGoods;
//         console.log(req.body);
//         console.log(((((Name=='')||(Author=='')||(Price=='')||(IdStates=='')||(Amount=='')||(IdLocations=='')||(IdAvailability=='')||(NumberOfPages=='')||(IdBindingType=='')||(IdAgeRestriction=='')||(Description=='')||(Genre=='')||(Parametr1=='')||(Parametr2=='')||(Parametr3==''))||(!(Name)||!(Author)||!(Price)||!(IdStates)||!(Amount)||!(IdLocations)||!(IdAvailability)||!(NumberOfPages)||!(IdBindingType)||!(IdAgeRestriction)||!(Description)||!(Genre)||!(Parametr1)||!(Parametr2)||!(Parametr3)))&&!MainPhoto))
//         if ((((Name=='')||(Author=='')||(Price=='')||(IdStates=='')||(Amount=='')||(IdLocations=='')||(IdAvailability=='')||(NumberOfPages=='')||(IdBindingType=='')||(IdAgeRestriction=='')||(Description=='')||(Genre=='')||(Parametr1=='')||(Parametr2=='')||(Parametr3==''))||(!(Name)||!(Author)||!(Price)||!(IdStates)||!(Amount)||!(IdLocations)||!(IdAvailability)||!(NumberOfPages)||!(IdBindingType)||!(IdAgeRestriction)||!(Description)||!(Genre)||!(Parametr1)||!(Parametr2)||!(Parametr3)))||!MainPhoto){
//             console.log(Name, ' | ', Author, ' | ', Price, ' | ', IdStates, ' | ', Amount, ' | ', IdLocations, ' | ', IdAvailability, ' | ', NumberOfPages, ' | ', IdBindingType, ' | ', IdAgeRestriction, ' | ', Description, ' | ', Genre, ' | ', Parametr1, ' | ', Parametr2, ' | ', Parametr3);
//             return res.status(400).json(ApiError.badRequest('Не все обязательные поля заполнены'));
//             // "Missing required fields"
//             }
//             let IdCitiesCorrect=IdCities, PriceCorrect=Price, OZONCorrect =OZON, VKCorrect=VK, InstagramCorrect=Instagram, IdStatesCorrect=IdStates, WeightCorrect=Weight, AmountCorrect=Amount, IdLocationsCorrect=IdLocations, IdAvailabilityCorrect=IdAvailability, ReceiptDateCorrect=ReceiptDate, IdConnectionsCorrect=IdConnections;

//             let  NameCorrect = Name, YearOfPublicationCorrect = YearOfPublication, NumberOfPagesCorrect = NumberOfPages, IdBindingTypeCorrect = IdBindingType, ISBNCorrect = ISBN,  IdAgeRestrictionCorrect = IdAgeRestriction, DescriptionCorrect = Description, NotesCorrect = Notes, IdPublishersCorrect = IdPublishers;
           
//             let Parametr1Correct=Parametr1, Parametr2Correct=Parametr2, Parametr3Correct=Parametr3;
//         try {
//             const goods = await Goods.findOne({ where: { IdGoods: id } });
//             if (!goods) {
//                 return res.status(404).json({ message: "Goods not found" });
//             }
    
//             const goodsData = {
//                 Price: parseInt(Price),
//                 IdStates: parseInt(IdStates),
//                 // Weight: parseInt(Weight),
//                 Amount: parseInt(Amount),
//                 IdLocations: parseInt(IdLocations),
//                 IdAvailability: parseInt(IdAvailability),
//                 ReceiptDate: ReceiptDate
//                 // IdCities: parseInt(IdCities),
//                 // OZON: OZON,
//                 // Instagram: Instagram,
//                 // VK: VK,
//                 // IdConnections: parseInt(IdConnections)
//             };
//             if (IdConnectionsCorrect==''||typeof IdConnectionsCorrect == "undefined"){
//                 const ConNew = await Connections.create();
//                 console.log(ConNew.Id);
//                 goodsData.IdConnections= parseInt(ConNew.Id);
//             }
//             else{
//                 goodsData.IdConnections = parseInt(IdConnectionsCorrect);
//             }
//             if (IdCitiesCorrect != ''&typeof IdCitiesCorrect != "undefined") {
//                 goodsData.IdCities = parseInt(IdCitiesCorrect);
//             }
//             if (OZONCorrect != ''&typeof OZONCorrect != "undefined") {
//                 goodsData.OZON= OZONCorrect;
//             }
//             if (InstagramCorrect != ''&typeof InstagramCorrect != "undefined") {
//                 goodsData.Instagram = InstagramCorrect;
//             } 
//             if (VKCorrect != ''&typeof VKCorrect != "undefined") {
//                 goodsData.VK= VKCorrect;
//             }
//             if (WeightCorrect != ''&typeof WeightCorrect != "undefined") {
//                 goodsData.Weight= parseInt(WeightCorrect);
//             }
//             await Goods.update(goodsData, { where: { IdGoods: id } });
    
//             const bookListData = {
//                 Name: Name,
//                 // YearOfPublication: parseInt(YearOfPublication),
//                 NumberOfPages: parseInt(NumberOfPages),
//                 IdBindingType: parseInt(IdBindingType),
//                 // ISBN: ISBN,
//                 IdAgeRestriction: parseInt(IdAgeRestriction),
//                 Description: Description,
//                 Notes: Notes
//                 // IdPublishers: parseInt(IdPublishers)
//             };
//             if (YearOfPublicationCorrect !== '' && typeof YearOfPublicationCorrect !== "undefined") {
//                 bookListData.YearOfPublication = parseInt(YearOfPublicationCorrect);
//             }
//             if (ISBNCorrect !== '' && typeof ISBNCorrect !== "undefined") {
//                 bookListData.ISBN = ISBNCorrect;
//             }
//             if (IdPublishersCorrect !== '' && typeof IdPublishersCorrect !== "undefined") {
//                 bookListData.IdPublishers = parseInt(IdPublishersCorrect);  
//             }    

//             await BookList.update(bookListData, { where: { IdGoods: id } });
//             const BookNew = await BookList.findOne({
//                  where: { IdGoods: id }
//             })
//             // console.log(BookNew)
//             // Обновление авторов
//             await BookAuthors.destroy({ where: { IdBookList: BookNew.IdBookList } });
//             for (const item of Author) {
//                 await BookAuthors.create({
//                     IdAuthors: parseInt(item.value),
//                     IdBookList: BookNew.IdBookList 
//                 });
//             }
    
//             // Обновление категорий
//             await BookCategories.destroy({ where: { IdBookList: BookNew.IdBookList } });
//             if (Category!=='') {
//                 for (const item of Category) {
//                     await BookCategories.create({
//                         IdCategories: parseInt(item.value),
//                         IdBookList: BookNew.IdBookList 
//                     });
//                 }
//             }
    
//             // Обновление жанров
//             await BookGenres.destroy({ where: { IdBookList: BookNew.IdBookList } });
//             for (const item of Genre) {
//                 await BookGenres.create({
//                     IdGenres: parseInt(item.value),
//                     IdBookList: BookNew.IdBookList 
//                 });
//             }
    
//             // Обновление владельцев
//             await Owners.destroy({ where: { IdGoods: id } });
//             if (OwnerBook!=='') {
//                 for (const item of OwnerBook) {
//                     await Owners.create({
//                         IdClient: parseInt(item.id),
//                         IdGoods: id 
//                     });
//                 }
//             }
    
//             // Обновление размеров
//             if (Parametr1!=='' && Parametr2!=='' && Parametr3!=='') {
//                 await GoodsSize.update({
//                     Parameter1: parseInt(Parametr1),
//                     Parameter2: parseInt(Parametr2),
//                     Parameter3: parseInt(Parametr3)
//                 }, { where: { IdGoods: id } });
//             }
  
            

//             // Обновление фото

//             const folderPath = 'static/images/goods/'+id;
//             if (fs.existsSync(folderPath)) {
//                 fs.readdirSync(folderPath).forEach((file) => {
//                   const curPath = path.join(folderPath, file);
//                   if (fs.lstatSync(curPath).isDirectory()) { // рекурсивный вызов
//                     deleteFolderRecursive(curPath);
//                   } else { // удалить файл
//                     fs.unlinkSync(curPath);
//                   }
//                 });
//                 fs.rmdirSync(folderPath);
//               }

//             await PhotoGoods.destroy({ where: { IdGoods: id } });
//             fs.mkdir('static/images/goods/'+id, { recursive: true }, err => {
//                 if(err) throw err;
//                 console.log('Все папки успешно созданы');
//             });
    
//             // fs.writeFile('static/images/goods/'+id+'/'+id+'_0.txt', MainPhoto[0], (err) => {
//             //     if (err) {
//             //         console.error('Ошибка при сохранении файла:', err);
//             //     } else {
//             //         console.log('Файл успешно сохранен.');
//             //     }
//             // });
    
//             // await PhotoGoods.create({
//             //     Photo: String(id+'_0.txt'),
//             //     IdGoods: id, 
//             //     Cover: true 
//             // });
    
//             // if (Photo!=='' && Photo.length > 0) {
//             //     for (let i = 0; i < Photo.length; i++) {
//             //         fs.writeFile('static/images/goods/'+id+'/'+id+'_1'+i+'.txt', Photo[i], (err) => {
//             //             if (err) {
//             //                 console.error('Ошибка при сохранении файла:', err);
//             //             } else {
//             //                 console.log('Файл успешно сохранен.');
//             //             }
//             //         });
    
//             //         await PhotoGoods.create({
//             //             Photo: String(id+'_1'+i+'.txt'),
//             //             IdGoods: id, 
//             //             Cover: false 
//             //         });
//             //     }
//             // }

//             const idCon = await Goods.count(
//                 { 
//                     where: { IdConnections: goods.IdConnections }
//                 }
//             )
//             console.log(goods.IdConnections, idCon)
//             if (idCon==0){
//                 await Connections.destroy({
//                     where:{
//                         Id:goods.IdConnections
//                     }
//                 })
//             }
    
//             return res.json({ message: "Book updated successfully" });
//         } catch (error) {
//             console.error(error);
//             return res.status(500).json({ message: "Internal server error" });
//         }
//     }
}
module.exports = new GoodsControllers()