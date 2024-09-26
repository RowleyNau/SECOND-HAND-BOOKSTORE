const ApiError = require('../error/ApiError')
const { Sequelize, DataTypes, Op, fn, col, literal  } = require('sequelize');
// import { sql } from '@sequelize/core';

const fs = require('fs');
const jwt = require('jsonwebtoken')
// const { Op } = require('sequelize');

const {GoodsLocations, Owners, CategoriesForSelection, IndividualSelectionOfBooks, PhotoGoods, OtherGoods, BookList, Goods, ShoppingCart, ReceivingMethod, ReceivingState, PaymentMethod, PaymentState, Purchase, Clients} = require('../models/models')

class PurchaseConrtollers {

    async ShoppingcartAdd(req, res) {
        try{
            const {IdClients, IdGoods} = req.body;
            console.log('Найдено');
            console.log(IdGoods, IdClients);

            const shData = {
                IdGoods: IdGoods, 
                IdClients:IdClients
            }
    
            const ShoppingCartData = await ShoppingCart.create(shData)

            return res.json({ShoppingCartData})
        }
        catch(e){
            console.log(e)
            return res.status(500).json({ error: 'возникла непредвиденная ошибка' });
        }
        
    }
    async ShoppingcartGetAll(req, res) {
        const {IdClients} = req.query;
        try{
            const ShoppingCartData = await ShoppingCart.findAll({
                where:{
                    IdClients:IdClients
                },
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
            })
        return res.json({ShoppingCartData})
        }
        catch(e){
            console.log(e)
            return res.status(500).json({ error: 'возникла ошибка' });
        }
        // return res.json({Receptiono})
    }
    //-----------------------------------
    async ReceivingMethodGetAll(req, res) {
        // const {IdClients} = req.query;
        try{
            const ReceivingMethodData = await ReceivingMethod.findAll()
        return res.json({ReceivingMethodData})
        }
        catch(e){
            console.log(e)
            return res.status(500).json({ error: 'возникла ошибка' });
        }
        // return res.json({Receptiono})
    }
    async ReceivingMethodGetOne(req, res) {
        const {id} = req.query;
        try{
            const ReceivingMethodData = await ReceivingMethod.findOne({
                where:{
                    Id:id
                }
            })
        return res.json({ReceivingMethodData})
        }
        catch(e){
            console.log(e)
            return res.status(500).json({ error: 'возникла ошибка' });
        }
        // return res.json({Receptiono})
    }
    async ReceivingStateGetAll(req, res) {
        // const {IdClients} = req.query;
        try{
            const ReceivingStateData = await ReceivingState.findAll()
        return res.json({ReceivingStateData})
        }
        catch(e){
            console.log(e)
            return res.status(500).json({ error: 'возникла ошибка' });
        }
        // return res.json({Receptiono})
    }
    async ReceivingStateGetOne(req, res) {
        const {id} = req.query;
        try{
            const ReceivingStateData = await ReceivingState.findOne({
                where:{
                    Id:id
                }
            })
        return res.json({ReceivingStateData})
        }
        catch(e){
            console.log(e)
            return res.status(500).json({ error: 'возникла ошибка' });
        }
        // return res.json({Receptiono})
    }
    async PaymentMethodGetAll(req, res) {
        // const {IdClients} = req.query;
        try{
            const PaymentMethodData = await PaymentMethod.findAll()
        return res.json({PaymentMethodData})
        }
        catch(e){
            console.log(e)
            return res.status(500).json({ error: 'возникла ошибка' });
        }
        // return res.json({Receptiono})
    }
    async PaymentMethodGetOne(req, res) {
        const {id} = req.query;
        try{
            const PaymentMethodData = await PaymentMethod.findOne({
                where:{
                    Id:id
                }
            })
        return res.json({PaymentMethodData})
        }
        catch(e){
            console.log(e)
            return res.status(500).json({ error: 'возникла ошибка' });
        }
        // return res.json({Receptiono})
    }
    async PaymentStateGetAll(req, res) {
        try{
            const PaymentStateData = await PaymentState.findAll()
        return res.json({PaymentStateData})
        }
        catch(e){
            console.log(e)
            return res.status(500).json({ error: 'возникла ошибка' });
        }
    }
    async PaymentStateGetOne(req, res) {
        const {id} = req.query;
        try{
            const PaymentStateData = await PaymentState.findOne({
                where:{
                    Id:id
                }
            })
        return res.json({PaymentStateData})
        }
        catch(e){
            console.log(e)
            return res.status(500).json({ error: 'возникла ошибка' });
        }
    }
    //-----------------------------------
    async PurchaseClientsGetAll(req, res) {
        const {idClients} = req.query;
        console.log(req.query);
        try{
            const PurchaseData = await Purchase.findAll({              
                where: {
                    IdClients: parseInt(idClients)
                },
                include: [
                    {
                        model: ReceivingMethod,
                        attributes: ['Name']
                    },
                    {
                        model: ReceivingState,
                        attributes: ['Name']
                    },
                    {
                        model: PaymentMethod,
                        attributes: ['Name']
                    },
                    {
                        model: PaymentState,
                        attributes: ['Name']
                    },
                    {
                        model: Goods,
                        attributes: ['IdGoods'],
                        include: [
                            {
                                model: PhotoGoods,
                                where: {
                                    Cover: true
                                },
                                attributes: ['Photo']
                            }
                            // , {
                            //     model: Owners,
                            //     where:{
                            //         IdClient: parseInt(idClients)
                            //     },
                            //     attributes: ['Paid']
                            // }
                        ]
                    }
                ]
            });

            const groupedData = {};
            PurchaseData.forEach(purchase => {
            const key = `${purchase.IdPurchase}_${purchase.IdConsultants}_${purchase.IdClients}_${purchase.DatePurchase}_${purchase.IdPaymentMethod}_${purchase.IdPaymentState}_${purchase.IdReceivingMethod}_${purchase.IdReceivingState}_${purchase.ReceivingLocation}_${purchase.DeliveryPrice}_${purchase.Index}`;
            if (!groupedData[key]) {
                groupedData[key] = {
                    IdPurchase: purchase.IdPurchase,
                    IdConsultants: purchase.IdConsultants,
                    IdClients: purchase.IdClients,
                    DatePurchase: purchase.DatePurchase,
                    IdPaymentMethod: purchase.IdPaymentMethod,
                    IdPaymentState: purchase.IdPaymentState,
                    IdReceivingMethod: purchase.IdReceivingMethod,
                    IdReceivingState: purchase.IdReceivingState,
                    ReceivingLocation: purchase.ReceivingLocation,
                    DeliveryPrice: purchase.DeliveryPrice,
                    Index: purchase.Index,
                    receivingmethod: purchase.receivingmethod,
                    receivingstate: purchase.receivingstate,
                    paymentmethod: purchase.paymentmethod,
                    paymentstate: purchase.paymentstate,
                    data: [],
                    price:[]
                };
            }
            console.log(purchase)
            groupedData[key].data.push(purchase.good);
            groupedData[key].price.push(purchase.Price);
        });

        // Преобразование объекта groupedData в массив
        const groupedArray = Object.values(groupedData);

        return res.json({ groupedArray });
            
            // return res.json({groupedPurchaseData})
        }
        catch(e){
            console.log(e)
            return res.status(500).json({ error: 'возникла ошибка!!!' });
        }
    }
    async PurchaseGetAll(req, res) {
        const {limit, page} = req.query;
        console.log(req.query);
        try{
            let page1 = page||1;
            let limit1 = limit||50;
            let offset = page1 * limit1 - limit1;
            const amount = await Purchase.count();
            const PurchaseData = await Purchase.findAll({ 
                offset: offset,
                limit: limit1,
                include: [
                    {
                        model: ReceivingMethod,
                        attributes: ['Name']
                    },
                    {
                        model: ReceivingState,
                        attributes: ['Name']
                    },
                    {
                        model: PaymentMethod,
                        attributes: ['Name']
                    },
                    {
                        model: PaymentState,
                        attributes: ['Name']
                    },
                    {
                        model: Goods,
                        attributes: ['IdGoods']
                        ,
                        include: [
                            {
                                model: OtherGoods,
                                attributes: ['Name'], 
                                required: false
                            },
                            {
                                model: BookList,
                                attributes: ['Name'], 
                                required: false
                            }, 
                            {
                                model: Owners,
                                where:{
                                    Paid: false
                                },
                                include:[{
                                    model: Clients,
                                    attributes:['Name', 'Mail']
                                }]
                            }
                        ]
                    }
                ]
            });

            const groupedData = {};
            PurchaseData.forEach(purchase => {
            const key = `${purchase.IdPurchase}_${purchase.IdConsultants}_${purchase.IdClients}_${purchase.DatePurchase}_${purchase.IdPaymentMethod}_${purchase.IdPaymentState}_${purchase.IdReceivingMethod}_${purchase.IdReceivingState}_${purchase.ReceivingLocation}_${purchase.DeliveryPrice}_${purchase.Index}`;
            if (!groupedData[key]) {
                groupedData[key] = {
                    IdPurchase: purchase.IdPurchase,
                    IdConsultants: purchase.IdConsultants,
                    IdClients: purchase.IdClients,
                    DatePurchase: purchase.DatePurchase,
                    IdPaymentMethod: purchase.IdPaymentMethod,
                    IdPaymentState: purchase.IdPaymentState,
                    IdReceivingMethod: purchase.IdReceivingMethod,
                    IdReceivingState: purchase.IdReceivingState,
                    ReceivingLocation: purchase.ReceivingLocation,
                    DeliveryPrice: purchase.DeliveryPrice,
                    Index: purchase.Index,
                    receivingmethod: purchase.receivingmethod,
                    receivingstate: purchase.receivingstate,
                    paymentmethod: purchase.paymentmethod,
                    paymentstate: purchase.paymentstate,
                    TransferOwner: purchase.TransferOwner,
                    data: [],
                    price:[]
                };
            }
            console.log(purchase)
            if(purchase.good.othergood!==null){
                groupedData[key].data.push({IdGoods: purchase.good.IdGoods, Prise:purchase.Price, Name:purchase.good.othergood.Name, Owner: purchase.good.owners, Amount: purchase.Amount});
            }
            else{
                groupedData[key].data.push({IdGoods: purchase.good.IdGoods, Prise:purchase.Price, Name:purchase.good.booklist.Name, Owner: purchase.good.owners, Amount: purchase.Amount});
            }
            // groupedData[key].price.push(purchase.Price);
        });

        // Преобразование объекта groupedData в массив
        const groupedArray = Object.values(groupedData);

        return res.json({ groupedArray });
            
            // return res.json({groupedPurchaseData})
        }
        catch(e){
            console.log(e)
            return res.status(500).json({ error: 'возникла ошибка!!!' });
        }
    }
    async PaymentStateGetOne(req, res) {
        const {id} = req.query;
        console.log(req.query);
        try{
            const PaymentStateData = await PaymentState.findOne({
                where:{
                    Id:id
                },
                
            })
        return res.json({PaymentStateData})
        }
        catch(e){
            console.log(e)
            return res.status(500).json({ error: 'возникла ошибка' });
        }
    }
    async PurchaseClientsAdd(req, res) {
        try{
            const {IdClients, DatePurchase, IdPaymentMethod, IdReceivingMethod, ReceivingLocation, Index} = req.body;
            console.log(req.body);

            if(IdReceivingMethod.length==0){
                return res.status(500).json({ error: 'выберите способ получения' });
            }

            const shoppingCart = await ShoppingCart.findAll({
                where: {
                    IdClients: IdClients
                },
                include:[{
                    model:Goods,
                    attributes: ['Price'],
                    include: [
                        {
                            model: GoodsLocations,
                            // include: [
                            //     {
                            //         model: Locations,
                            //         attributes: ['Name']
                            //     }
                            // ]
                        }
                    ]
                }],
                attributes: ['IdGoods']

            });
            console.log(shoppingCart)
            var PurchaseData = {
                    IdClients: IdClients,                    
                    // IdGoods: record.IdGoods,
                    DatePurchase:new Date(DatePurchase),
                    IdPaymentMethod:parseInt(IdPaymentMethod.value),
                    IdReceivingMethod:parseInt(IdReceivingMethod.value),
                }
            if(IdReceivingMethod.value== 0){
                if(ReceivingLocation==''|| Index==''){
                    return res.status(500).json({ error: 'необходимо указать данные для доставки' });
                }
                PurchaseData.IdReceivingState= 2;
                PurchaseData.IdPaymentMethod= 0;
                PurchaseData.IdPaymentState= 3;
                PurchaseData.ReceivingLocation= ReceivingLocation;
                PurchaseData.Index= Index;

            }
            if(IdReceivingMethod.value== 1){
                if(IdPaymentMethod.length==0){
                    return res.status(500).json({ error: 'необходимо указать способ оплаты' });
                }
                PurchaseData.IdPaymentMethod= parseInt(IdPaymentMethod.value);
                if(IdPaymentMethod.value == 0){
                    PurchaseData.IdPaymentState= 2;
                }
                else{
                    PurchaseData.IdPaymentState= 1;
                }
            }
            if(IdReceivingMethod.value== 2){
                if(ReceivingLocation==''){
                    return res.status(500).json({ error: 'необходимо указать данные для доставки' });
                }
                PurchaseData.IdReceivingState= 2;
                PurchaseData.IdPaymentMethod= 0;
                PurchaseData.IdPaymentState= 3;
                PurchaseData.ReceivingLocation= ReceivingLocation;
            }
            
            for (const record of shoppingCart) {
                PurchaseData.IdGoods= record.IdGoods;
                PurchaseData.Price= record.good.Price;
                if(IdReceivingMethod.value== 1){
                    if(record.good.goodslocations.Idlocations==1){
                        PurchaseData.IdReceivingState= 3;
                    }
                    else{
                        PurchaseData.IdReceivingState= 0;
                    }

                }
                console.log(PurchaseData)
                await Purchase.create(PurchaseData);
            }

            return res.json({ message: 'покупка оформлена'})
        }
        catch(e){
            console.log(e)
            return res.status(500).json({ error: 'возникла непредвиденная ошибка' });
        }
        
    }
    async PurchaseAdd(req, res) {
        try{
            const {IdClients, DatePurchase, IdPaymentMethod,IdPaymentState,IdReceivingState, IdReceivingMethod, ReceivingLocation, Index,Price, goods, DeliveryPrice} = req.body;
            console.log(req.body);

            if(IdReceivingMethod.length==0){
                return res.status(500).json({ error: 'выберите способ получения' });
            }

            console.log(shoppingCart)
            var PurchaseData = {
                    IdClients: IdClients,                    
                    // IdGoods: record.IdGoods,
                    DatePurchase:new Date(DatePurchase),
                    IdPaymentMethod:parseInt(IdPaymentMethod.value),
                    IdReceivingMethod:parseInt(IdReceivingMethod.value),
                }
            if(IdReceivingMethod.value== 0){
                if(ReceivingLocation==''|| Index==''){
                    return res.status(500).json({ error: 'необходимо указать данные для доставки' });
                }
                PurchaseData.IdReceivingState= 2;
                PurchaseData.IdPaymentMethod= 0;
                PurchaseData.IdPaymentState= 3;
                PurchaseData.ReceivingLocation= ReceivingLocation;
                PurchaseData.Index= Index;

            }
            if(IdReceivingMethod.value== 1){
                if(IdPaymentMethod.length==0){
                    return res.status(500).json({ error: 'необходимо указать способ оплаты' });
                }
                PurchaseData.IdPaymentMethod= parseInt(IdPaymentMethod.value);
                if(IdPaymentMethod.value == 0){
                    PurchaseData.IdPaymentState= 2;
                }
                else{
                    PurchaseData.IdPaymentState= 1;
                }
            }
            if(IdReceivingMethod.value== 2){
                if(ReceivingLocation==''){
                    return res.status(500).json({ error: 'необходимо указать данные для доставки' });
                }
                PurchaseData.IdReceivingState= 2;
                PurchaseData.IdPaymentMethod= 0;
                PurchaseData.IdPaymentState= 3;
                PurchaseData.ReceivingLocation= ReceivingLocation;
            }
            
            for (const record of goods) {
                PurchaseData.IdGoods= record.IdGoods;
                PurchaseData.Price= record.good.Price;
                if(IdReceivingMethod.value== 1){
                    if(record.good.goodslocations.Idlocations==1){
                        PurchaseData.IdReceivingState= 3;
                    }
                    else{
                        PurchaseData.IdReceivingState= 0;
                    }

                }
                console.log(PurchaseData)
                await Purchase.create(PurchaseData);
            }

            return res.json({ message: 'покупка оформлена'})
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
    //      
    
}

            
module.exports = new PurchaseConrtollers()