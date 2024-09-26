const ApiError = require('../error/ApiError')
const { Sequelize, DataTypes, Op } = require('sequelize');
const fs = require('fs');
const jwt = require('jsonwebtoken')

const {GenresForSelection, AuthorsForSelection, CategoriesForSelection, IndividualSelectionOfBooks, Clients, Genres, Categories, Authors, ResultBySelectionOfGoods, Consultants,PhotoGoods, OtherGoods, BookList, Goods} = require('../models/models')

class individualSelectionControllers {

    async IndividualSelectionAdd(req, res) {
        try{
            const {IdClients, Author, Category, Genre, Comment, RequestDate} = req.body;
            console.log('Найдено');
            console.log(IdClients, Author, Category, Genre, Comment, RequestDate);
            console.log(Author.length, Category.length, Genre.length);
            if (Author.length==0 && Category.length==0 && Genre.length==0 && Comment==''){            
                return res.status(400).json(ApiError.badRequest('необходимо заполнить хотя бы одно поле'));
            }
            const individualData = {
                Interests: Comment, 
                RequestDate:RequestDate, 
                IdClients:IdClients
            }
    
            const individual = await IndividualSelectionOfBooks.create(individualData)
            
            if(Author != ''){
                await Author.forEach(async item => {
                    await AuthorsForSelection.create({
                        IdAuthors: parseInt(item.value),
                        IdSelectionOfBooks: individual.IdIndividualSelectionOfBooks 
                    });
                });
            }        
            if(Category != ''){
                await Category.forEach(async item => {
                    await CategoriesForSelection.create({
                        IdCategories: parseInt(item.value),
                        IdSelectionOfBooks: individual.IdIndividualSelectionOfBooks 
                    });
                });
            }
    
            if(Genre != ''){
                await Genre.forEach(async item => {
                    await GenresForSelection.create({
                        IdGenres: parseInt(item.value),
                        IdSelectionOfBooks: individual.IdIndividualSelectionOfBooks 
                    });
                });
            }
            return res.json({individual})
        }
        catch(e){
            console.log(e)
            return res.status(500).json({ error: 'возникла ошибка непредвиденная ошибка' });
        }
        
    }
    async IndividualSelectionClientsGetAll(req, res) {
        console.log('!!!')
        const {dataToken}= req.query;
        console.log("1111")
        console.log(jwt.decode(dataToken))
        const dataToken2 = jwt.decode(dataToken)
        try{
            const Individual = await IndividualSelectionOfBooks.findAll({
                where:{
                    IdClients: dataToken2.IdClients
                },
            include: [{
                model: CategoriesForSelection,
                required: false, 
                include:[{
                    model: Categories
                }]
            },{
                model: AuthorsForSelection,
                required: false, 
                include:[{
                    model: Authors
                }]
            },{
                model: GenresForSelection,
                required: false, 
                include:[{
                    model: Genres
                }]
            },{
                model: ResultBySelectionOfGoods,
                // required: false,
                include:[{
                    model: Goods,
                    attributes: ['Price'],
                    include: [
                        {
                            model: BookList,
                            attributes: ['Name'], 
                            required: false
                        },
                        {
                            model: OtherGoods,
                            attributes: ['Name'], 
                            required: false
                        },
                        {
                            model: PhotoGoods,
                            where: {
                                Photo: {
                                    [Sequelize.Op.like]: '%\\_0.txt'
                                }
                            },
                            attributes: ['Photo', 'Cover']
                        }
                    ]
                }]
            }]
        })
        return res.json({Individual})
        }
        catch(e){
            console.log(e)
            return res.status(500).json({ error: 'возникла ошибка' });
        }
        // return res.json({Receptiono})
    }
    async IndividualSelectionGetOne(req, res) {
        console.log('!!!')
        const {id}= req.query;
        try{
            const Individual = await IndividualSelectionOfBooks.findOne({
                where:{
                    IdIndividualSelectionOfBooks: id
                },
            include: [{
                model: Clients,
                attributes:['Name']
            },{
                model: CategoriesForSelection,
                required: false, 
                include:[{
                    model: Categories
                }]
            },{
                model: AuthorsForSelection,
                required: false, 
                include:[{
                    model: Authors
                }]
            },{
                model: GenresForSelection,
                required: false, 
                include:[{
                    model: Genres
                }]
            }]
        })
        return res.json({Individual})
        }
        catch(e){
            console.log(e)
            return res.status(500).json({ error: 'возникла ошибка' });
        }
        // return res.json({Receptiono})
    }
    async IndividualSelectionGetAll(req, res) {
        console.log('!!!')
        try{
            const Individual = await IndividualSelectionOfBooks.findAll({
            include: [{
                model: Clients,
                attributes:['Name']
            },{
                model: CategoriesForSelection,
                required: false, 
                include:[{
                    model: Categories
                }]
            },{
                model: AuthorsForSelection,
                required: false, 
                include:[{
                    model: Authors
                }]
            },{
                model: GenresForSelection,
                required: false, 
                include:[{
                    model: Genres
                }]
            }, {
                model: ResultBySelectionOfGoods,
                required: false
            }]
            ,
            where: {
                '$resultbyselectionofGoods.IdResultBySelectionOfBooks$': {
                    [Op.is]: null
                }
            }
        })
        return res.json({Individual})
        }
        catch(e){
            console.log(e)
            return res.status(500).json({ error: 'возникла ошибка' });
        }
    }
    async ResultBySelectionOfGoodsAdd(req, res) {
        try{
            const {goods, idIndividualSelectionOfBooks, comment,dataToken} = req.body;
            console.log('Найдено');
            console.log(goods, idIndividualSelectionOfBooks, comment);
            const dataToken2 = jwt.decode(dataToken)
            if (goods.length==0){            
                return res.status(400).json(ApiError.badRequest('необходимо добавить книгу'));
            }
            const idConsultants = await Consultants.findOne({
                where:{
                    IdClients:dataToken2.IdClients
                }
            })
            for (const good of goods){
                await ResultBySelectionOfGoods.create({
                    IdGoods:good.IdGoods,
                    IdConsultants:idConsultants.Id,
                    IdIndividualSelectionOfBooks:idIndividualSelectionOfBooks,
                    Comment:comment
                })
            }
            
            return res.json({message:"ответ отправлен"})
        }
        catch(e){
            console.log(e)
            return res.status(500).json({ error: 'возникла непредвиденная ошибка' });
        }
        
    }
    // async IndividualSelectionGetOne(req, res) {
    //     const Categories = await CategoriesOtherGoods.findAll()
    //     return res.json({Categories})
    // }
    // async IndividualSelectionDel(req, res) {
    //     try {
    //         const { id } = req.body;
    //         console.log(id);
    //         const countId = await OtherGoods.count({ 
    //             where: { IdCategoriesOtherGoods: id }
    //         });
    //         console.log(id, countId);
    //         if (countId == 0) {
    //             const categories = await CategoriesOtherGoods.destroy({
    //                 where: { Id: id }
    //             });
    //             return res.json({ categories });
    //         } else {
    //             return res.status(500).json({ error: 'Эта характеристика уже используется. Лучше отредактируйте ее' });
    //         }
    //     } catch (error) {
    //         console.error("Error deleting category:", error);
    //         return res.status(500).json({ error: 'Произошла ошибка. Попробуйте позже' });
    //     }
    // }
    // async IndividualSelectionUpdate(req, res) {
    //     try {
    //         const { id, name } = req.body;
    //         console.log(id);
           
    //         const content = await CategoriesOtherGoods.update(
    //             { Name: name }, // данные для обновления
    //             { where: { Id: id } } // условия для обновления
    //         );
    //         return res.json({ content });
    //     } 
    //     catch (error) {
    //         console.error("Error updating record:", error);
    //         return res.status(500).json({ error: "Произошла ошибка. Попробуйте позже" });
    //     } 
    // }
    // async IndividualSelectionGetAllSearch(req, res) {
    //     let {Name} = req.query;
    //     console.log(Name)
    //     const categories = await CategoriesOtherGoods.findAll({
    //         where: { 
    //             Name: { [Op.iLike]: '%' + Name + '%' } }
    //     })
    //     return res.json({categories})
    // }
    //
    
}

            
module.exports = new individualSelectionControllers()