const ApiError = require('../error/ApiError')
const { Sequelize, DataTypes, Op } = require('sequelize');
const fs = require('fs');
const jwt = require('jsonwebtoken')
const {Genres, Authors, Categories, Publishers, Bindingtype, Agerestriction, Locations, Goodstates, Cities, Availability, Clients, BookList, Goods, CategoriesOtherGoods, OtherGoods, BookGenres, BookAuthors, BookCategories} = require('../models/models')

const nodemailer = require('nodemailer');

export const CategoriesOtherGoodsAdd = async(req, res) => {
    let testEmailAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testEmailAccount.user,
            pass: testEmailAccount.pass,
        },
    });

    let result = await transporter.sendMail({
        from: '"Node js" <nodejs@example.com>',
        to: 'user@example.com, user@example.com',
        subject: 'Message from Node js',
        text: 'This message was sent from Node js server.',
        html:
            'This <i>message</i> was sent from <strong>Node js</strong> server.',
    });
    console.log(result);
}
    // async CategoriesOtherGoodsGetAll(req, res) {
    //     const Categories = await CategoriesOtherGoods.findAll()
    //     return res.json({Categories})
    // }
   
    
            
module.exports = new parametersConrtollers()