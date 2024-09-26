const ApiError = require('../error/ApiError')
const { Sequelize, DataTypes, Op } = require('sequelize');
const fs = require('fs');
const jwt = require('jsonwebtoken')
const {Genres, Authors, Categories, Publishers, Bindingtype, Agerestriction, Locations, Goodstates, Cities, Availability, Clients, BookList, Goods, CategoriesOtherGoods, OtherGoods, BookGenres, BookAuthors, BookCategories} = require('../models/models')

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
class parametersConrtollers {

    async CategoriesOtherGoodsAdd(req, res) {
        const {Name} = req.body;
        const Categories = await CategoriesOtherGoods.create({Name})
        return res.json({Categories})
    }
    async CategoriesOtherGoodsGetAll(req, res) {
        const Categories = await CategoriesOtherGoods.findAll()
        return res.json({Categories})
    }
    async CategoriesOtherGoodsDel(req, res) {
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
    async CategoriesOtherGoodsUpdate(req, res) {
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
    async CategoriesOtherGoodsGetAllSearch(req, res) {
        let {Name} = req.query;
        console.log(Name)
        const categories = await CategoriesOtherGoods.findAll({
            where: { 
                Name: { [Op.iLike]: '%' + Name + '%' } }
        })
        return res.json({categories})
    }
    //-------------------------------------------------------------
    async GenreAdd(req, res) {
        const { Name } = req.body;
        // try {

            // await syncSequence();

            const genre = await Genres.create({ Name: Name });
            return res.json({ genre });
        // } catch (error) {
        //     console.error("Error adding genre:", error);
        //     return res.status(500).json({ error: "An error occurred while adding the genre." });
        // }
    }
    async GenreGetAll(req, res) {
        const genre = await Genres.findAll()
        return res.json({genre})
    }
    async GenreDel(req, res) {
        try {
            const { id } = req.body;
            console.log(id)
            const countId = await BookGenres.count(
                { 
                    where: { IdGenres: id }
                }
            )
            console.log(id, countId)
            if (countId==0){
                const genre = await Genres.destroy({
                    where:{
                        Id:id
                    }
                })
                return res.json({ genre });
            } else {
                return res.status(500).json({ error: 'Эта характеристика уже используется. Лучше отредактируйте ее' });
            }
        } catch (error) {
            console.error("Error deleting category:", error);
            return res.status(500).json({ error: 'Произошла ошибка. Попробуйте позже' });
        }
    }
    async GenreUpdate(req, res) {
        try {
            const { id, name } = req.body;
            console.log(id);
           
            const genre = await Genres.update(
                { Name: name }, // данные для обновления
                { where: { Id: id } } // условия для обновления
            );
            return res.json({ genre });
        } 
        catch (error) {
            console.error("Error updating record:", error);
            return res.status(500).json({ error: "Произошла ошибка. Попробуйте позже" });
        } 
    }
    async GenreGetAllSearch(req, res) {
        let {Name} = req.query;
        console.log(Name)
        const genre = await Genres.findAll({
            where: { 
                Name: { [Op.iLike]: '%' + Name + '%' } }
        })
        return res.json({genre})
    }
    //-------------------------------------------------------------
    async AuthorsAdd(req, res) {
        const {LastName, Name, MiddleName} = req.body;
        let LastNameСorrect=LastName, NameСorrect=Name, MiddleNameСorrect =MiddleName;
        if (LastName==''){

            LastNameСorrect=null;
        }
        if (MiddleName==''){
            
            MiddleNameСorrect=null;
        }
        const authors = await Authors.create({LastName:LastNameСorrect, Name:NameСorrect, MiddleName:MiddleNameСorrect})
        return res.json({authors})
    }
    async AuthorsGetAll(req, res) {
        console.log("AAA");
        const authors = await Authors.findAll()
        return res.json({authors})
    }
    async AuthorsDel(req, res) {
        try {
            const { id } = req.body;
            // const id =idA[0];
            console.log(id)
            const countId = await BookAuthors.count(
                { 
                    where: { IdAuthors: id }
                }
            )
            console.log(id, countId)
            if (countId==0){
                const authors = await Authors.destroy({
                    where:{
                        Id:id
                    }
                })
                return res.json({ authors });
            } else {
                return res.status(500).json({ error: 'Эта характеристика уже используется. Лучше отредактируйте ее' });
            }
        } catch (error) {
            console.error("Error deleting category:", error);
            return res.status(500).json({ error: 'Произошла ошибка. Попробуйте позже' });
        }
    }
    async AuthorsUpdate(req, res) {
        try {
            const {id, LastName, Name, MiddleName} = req.body;
            let LastNameСorrect=LastName, NameСorrect=Name, MiddleNameСorrect =MiddleName;
            if (LastName==''){

                LastNameСorrect=null;
            }
            if (MiddleName==''){
                
                MiddleNameСorrect=null;
            }
            console.log(id, LastName, Name, MiddleName);
           
            const content = await Authors.update(
                {LastName:LastNameСorrect, Name:NameСorrect, MiddleName:MiddleNameСorrect}, // данные для обновления
                { where: { Id: id } } // условия для обновления
            );
            return res.json({ content });
        } 
        catch (error) {
            console.error("Error updating record:", error);
            return res.status(500).json({ error: "Произошла ошибка. Попробуйте позже" });
        } 
    }
    async AuthorsGetAllSearch(req, res) {
        let { Name } = req.query;
        console.log(Name);
    
        // Разбиваем строку запроса на отдельные слова
        const nameParts = Name.split(' ');
    
        // Создаем массив условий для поиска
        const searchConditions = nameParts.map(part => ({
            [Op.or]: [
                { Name: { [Op.iLike]: '%' + part + '%' } },
                { LastName: { [Op.iLike]: '%' + part + '%' } },
                { MiddleName: { [Op.iLike]: '%' + part + '%' } }
            ]
        }));
    
        try {
            const authors = await Authors.findAll({
                where: {
                    [Op.or]: searchConditions
                }
            });
            return res.json({ authors });
        } catch (error) {
            console.error('Error fetching authors:', error);
            return res.status(500).json({ error: 'Произошла ошибка. Попробуйте позже' });
        }
    }
    //-------------------------------------------------------------
    async CategoriesAdd(req, res) {
        const {Name} = req.body;
        const categories = await Categories.create({Name})
        return res.json({categories})
    }
    async CategoriesGetAll(req, res) {
        const categories = await Categories.findAll()
        return res.json({categories})
    }
    async CategoriesDel(req, res) {
        try {
            const { id } = req.body;
            console.log(id)
            const countId = await BookCategories.count(
                { 
                    where: { IdCategories: id }
                }
            )
            console.log(id, countId)
            if (countId==0){
                const categories = await Categories.destroy({
                    where:{
                        Id:id
                    }
                })
                return res.json({ categories });
            } else {
                return res.status(500).json({ error: 'Эта характеристика уже используется. Лучше отредактируйте ее' });
            }
        } catch (error) {
            console.error("Error deleting category:", error);
            return res.status(500).json({ error: 'Произошла ошибка. Попробуйте позже' });
        }
    }
    async CategoriesUpdate(req, res) {
        try {
            const { id, name } = req.body;
            console.log(id);
           
            const content = await Categories.update(
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
    async CategoriesGetAllSearch(req, res) {
        let {Name} = req.query;
        console.log(Name)
        const categories = await Categories.findAll({
            where: { 
                Name: { [Op.iLike]: '%' + Name + '%' } }
        })
        return res.json({categories})
    }
    //-------------------------------------------------------------
    async PublishersAdd(req, res) {
        const {Name} = req.body;
        const publishers = await Publishers.create({Name})
        return res.json({publishers})
    }
    async PublishersGetAll(req, res) {
        const publishers = await Publishers.findAll()
        return res.json({publishers})
    }
    async PublishersDel(req, res) {
        try {
            const { id } = req.body;
            console.log(id)
            const countId = await BookList.count(
                { 
                    where: { IdBindingType: id }
                }
            )
            console.log(id, countId)
            if (countId==0){
                const publishers = await Publishers.destroy({
                    where:{
                        Id:id
                    }
                })
                return res.json({ publishers });
            } else {
                return res.status(500).json({ error: 'Эта характеристика уже используется. Лучше отредактируйте ее' });
            }
        } catch (error) {
            console.error("Error deleting category:", error);
            return res.status(500).json({ error: 'Произошла ошибка. Попробуйте позже' });
        }
    }
    async PublishersUpdate(req, res) {
        try {
            const { id, name } = req.body;
            console.log(id);
           
            const content = await Publishers.update(
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
    async PublishersGetAllSearch(req, res) {
        let {Name} = req.query;
        console.log(Name)
        const publishers = await Publishers.findAll({
            where: { 
                Name: { [Op.iLike]: '%' + Name + '%' } }
        })
        return res.json({publishers})
    }
    //-------------------------------------------------------------
    async BindingtypeAdd(req, res) {
        const {Name} = req.body;
        const bindingtype = await Bindingtype.create({Name})
        return res.json({bindingtype})
    }
    async BindingtypeGetAll(req, res) {
        const bindingtype = await Bindingtype.findAll()
        return res.json({bindingtype})
    }
    async BindingtypeDel(req, res) {
        try {
            const { id } = req.body;
            console.log(id)
            const countId = await BookList.count(
                { 
                    where: { IdBindingType: id }
                }
            )
            console.log(id, countId)
            if (countId==0){
                const bindingtype = await Bindingtype.destroy({
                    where:{
                        Id:id
                    }
                })
                return res.json({ bindingtype });
            } else {
                return res.status(500).json({ error: 'Эта характеристика уже используется. Лучше отредактируйте ее' });
            }
        } catch (error) {
            console.error("Error deleting category:", error);
            return res.status(500).json({ error: 'Произошла ошибка. Попробуйте позже' });
        }
    }
    async BindingtypeUpdate(req, res) {
        try {
            const { id, name } = req.body;
            console.log(id);
           
            const content = await Bindingtype.update(
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
    async BindingtypeGetAllSearch(req, res) {
        let {Name} = req.query;
        console.log(Name)
        const bindingtype = await Bindingtype.findAll({
            where: { 
                Name: { [Op.iLike]: '%' + Name + '%' } }
        })
        return res.json({bindingtype})
    }
    //-------------------------------------------------------------
    async AgerestrictionAdd(req, res) {
        const {Name} = req.body;
        const agerestriction = await Agerestriction.create({Name})
        return res.json({agerestriction})
    }
    async AgerestrictionGetAll(req, res) {
        const agerestriction = await Agerestriction.findAll()
        return res.json({agerestriction})
    }
    async AgerestrictionDel(req, res) {
        try {
            const { id } = req.body;
            console.log(id)
            const countId = await BookList.count(
                { 
                    where: { IdAgeRestriction: id }
                }
            )
            console.log(id, countId)
            if (countId==0){
                const agerestriction = await Agerestriction.destroy({
                    where:{
                        Id:id
                    }
                })
                return res.json({ agerestriction });
            } 
            else {
                return res.json({ error: "Эта характеристика уже используется. Лучше отредактируйте ее" });
            }    
        } 
        catch (error) {
            console.error("Error creating records:", error);
            return res.status(500).json({ error: "Произошла ошибка. Попробуйте позже" });
        } 
    }
    async AgerestrictionUpdate(req, res) {
        try {
            const { id, name } = req.body;
            console.log(id);
           
            const content = await Agerestriction.update(
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
    //-------------------------------------------------------------
    async LocationsAdd(req, res) {
        const {Name} = req.body;
        const locations = await Locations.create({Name})
        return res.json({locations})
    }
    async LocationsGetAll(req, res) {
        const locations = await Locations.findAll()
        return res.json({locations})
    }
    async LocationsDel(req, res) {
        try {
            const { id } = req.body;
            console.log(id)
            const countId = await Goods.count(
                { 
                    where: { IdLocations: id }
                }
            )
            console.log(id, countId)
            if (countId==0){
                const locations = await Locations.destroy({
                    where:{
                        Id:id
                    }
                })
                return res.json({ locations });
            } else {
                return res.status(500).json({ error: 'Эта характеристика уже используется. Лучше отредактируйте ее' });
            }
        } catch (error) {
            console.error("Error deleting category:", error);
            return res.status(500).json({ error: 'Произошла ошибка. Попробуйте позже' });
        }
    }
    async LocationsUpdate(req, res) {
        try {
            const { id, name } = req.body;
            console.log(id);
           
            const content = await Locations.update(
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
    async LocationsGetAllSearch(req, res) {
        let {Name} = req.query;
        console.log(Name)
        const locations = await Locations.findAll({
            where: { 
                Name: { [Op.iLike]: '%' + Name + '%' } }
        })
        return res.json({locations})
    }
    //-------------------------------------------------------------
    async GoodstatesAdd(req, res) {
        const {Name} = req.body;
        const goodstates = await Goodstates.create({Name})
        return res.json({goodstates})
    }
    async GoodstatesGetAll(req, res) {
        const goodstates = await Goodstates.findAll()
        return res.json({goodstates})
    }
    async GoodstatesDel(req, res) {
        try {
            const { id } = req.body;
            console.log(id)
            const countId = await Goods.count(
                { 
                    where: { IdStates: id }
                }
            )
            console.log(id, countId)
            if (countId==0){
                const goodstates = await Goodstates.destroy({
                    where:{
                        Id:id
                    }
                })
                return res.json({ goodstates });
            } 
            else {
                return res.json({ error: "Эта характеристика уже используется. Лучше отредактируйте ее" });
            }    
        } 
        catch (error) {
            console.error("Error creating records:", error);
            return res.status(500).json({ error: "Произошла ошибка. Попробуйте позже" });
        } 
    }
    //-------------------------------------------------------------
    async CitiesAdd(req, res) {
        const {Name} = req.body;
        const cities = await Cities.create({Name})
        return res.json({cities})
    }
    async CitiesGetAll(req, res) {
        const cities = await Cities.findAll()
        return res.json({cities})
    }
    async CitiesDel(req, res) {
        try {
            const { id } = req.body;
            console.log(id)
            const countId = await Goods.count(
                { 
                    where: { IdCities: id }
                }
            )
            console.log(id, countId)
            if (countId==0){
                const cities = await Cities.destroy({
                    where:{
                        Id:id
                    }
                })
                return res.json({ cities });
            } else {
                return res.status(500).json({ error: 'Эта характеристика уже используется. Лучше отредактируйте ее' });
            }
        } catch (error) {
            console.error("Error deleting category:", error);
            return res.status(500).json({ error: 'Произошла ошибка. Попробуйте позже' });
        }
    }
    async CitiesUpdate(req, res) {
        try {
            const { id, name } = req.body;
            console.log(id);
           
            const content = await Cities.update(
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
    async CitiesGetAllSearch(req, res) {
        let {Name} = req.query;
        console.log(Name)
        const cities = await Cities.findAll({
            where: { 
                Name: { [Op.iLike]: '%' + Name + '%' } }
        })
        return res.json({cities})
    }
    //-------------------------------------------------------------
    async AvailabilityAdd(req, res) {
        const {Name} = req.body;
        const availability = await Availability.create({Name})
        return res.json({availability})
    }
    async AvailabilityGetAll(req, res) {
        const availability = await Availability.findAll()
        return res.json({availability})
    }
    //-------------------------------------------------------------    
    async PhotoAdd(req, res) {
        for (let i = 0; i< req.body.ABC.length; i++){
            console.log(req.body.ABC[i], "я тут");
            fs.writeFile("hello2"+0+".txt", req.body.ABC[i], (err) => {
                if (err) {
                    console.error('Ошибка при сохранении файла:', err);
                } else {
                    console.log('Файл успешно сохранен.');
                }
            });
        }
    }
    async PhotoGet(req, res) {
        const {Name} = req.query;
        console.log (
            fs.readFileSync(Name, 'utf-8'));
        return res.json(
           fs.readFileSync(Name, 'utf-8')
        )
    
        }
    //-------------------------------------------------------------    
    async SearchOwnersGet(req, res) {
        const {Name} = req.query;
        console.log(req.query);
        const GetClient = await Clients.findAll({
            limit: 5,
            where: {
                [Op.or]: [
                    { Phone: { [Op.iLike]: '%' + Name + '%' } },
                    { Name: { [Op.iLike]: '%' + Name + '%' } }
                ]
            },
            attributes: ['IdClients', 'Name', 'Phone']
          });
        //   console.log(GetClient);
          return res.json({GetClient})
    }
    //-------------------------------------------------------------   
    async SearchConnectionGet(req, res) {
        const {Name} = req.query;
        console.log(Name);
        try {
            // Найти все записи Goods, которые связаны с BookList, где Name содержит введенный текст
            const goodsWithName = await Goods.findAll({
                include: [{
                    model: BookList,
                    where: { Name: { [Op.iLike]: '%' + Name + '%' } },
                    attributes: ['IdBookList', 'Name', 'IdGoods']
                }],
                attributes: ['IdConnections', 'IdGoods']
            });
    
            // Извлечь все IdConnections из найденных записей Goods
            const idConnections = goodsWithName.map(goods => goods.IdConnections);
    
            if (idConnections.length === 0) {
                return res.json({ data: [], data2: [] });
            }
    
            // Найти все записи BookList, которые связаны с Goods, где IdConnections совпадает с найденными ранее
            const data = await BookList.findAll({
                include: [{
                    model: Goods,
                    attributes: ['IdConnections'],
                    where: {
                        IdConnections: {
                            [Op.in]: idConnections
                        }
                    }
                }],
                attributes: ['IdBookList', 'Name', 'IdGoods']
            });
    
            console.log(data);
    
            return res.json({data});
        } catch (error) {
            console.error('Error fetching records:', error);
            return res.status(500).json({ error: 'An error occurred while fetching records' });
        }
    }
    //-------------------------------------------------------------   
    async SearchConnectionForOtherGoodsGet(req, res) {
        const {Name} = req.query;
        console.log(Name);
        try {
            // Найти все записи Goods, которые связаны с BookList, где Name содержит введенный текст
            const goodsWithName = await Goods.findAll({
                include: [{
                    model: OtherGoods,
                    where: { Name: { [Op.iLike]: '%' + Name + '%' } },
                    attributes: ['IdOtherGoods', 'Name', 'IdGoods']
                }],
                attributes: ['IdConnections', 'IdGoods']
            });
    
            // Извлечь все IdConnections из найденных записей Goods
            const idConnections = goodsWithName.map(goods => goods.IdConnections);
    
            if (idConnections.length === 0) {
                return res.json({ data: [], data2: [] });
            }
    
            // Найти все записи BookList, которые связаны с Goods, где IdConnections совпадает с найденными ранее
            const data = await OtherGoods.findAll({
                include: [{
                    model: Goods,
                    attributes: ['IdConnections'],
                    where: {
                        IdConnections: {
                            [Op.in]: idConnections
                        }
                    }
                }],
                attributes: ['IdOtherGoods', 'Name', 'IdGoods']
            });
    
            console.log(data);
    
            return res.json({data});
        } catch (error) {
            console.error('Error fetching records:', error);
            return res.status(500).json({ error: 'An error occurred while fetching records' });
        }
    }
    
}

            
module.exports = new parametersConrtollers()