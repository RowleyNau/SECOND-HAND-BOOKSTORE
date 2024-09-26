const ApiError = require('../error/ApiError')
const { Sequelize, DataTypes, Op, fn, col, literal  } = require('sequelize');
// const io = socketIo(server);
// import { sql } from '@sequelize/core';

const fs = require('fs');
const jwt = require('jsonwebtoken')
// const { Op } = require('sequelize');

const {Messages, Chats , Purchase, Consultants, Clients, Goods} = require('../models/models')

class MessagesController {
  async createChat(req, res) {
    console.log('!!!!!!!!')
    // const { clientId } = req.body;
    // try {
    //   let chat = await Chats.findOne({ where: { IdClients: clientId } });
    //   if (!chat) {
    //     chat = await Chats.create({ IdClients: clientId });
    //   }
    //   res.status(200).json(chat);
    // } catch (error) {
    //   console.error('Ошибка при создании чата:', error);
    //   res.status(500).json({ error: 'Ошибка при создании чата' });
    // }
    const {id} = req.body;
    
        const messagesCount = await Chats.count({where:{IdClients:id}})
        if(messagesCount==0){
          const messages = await Messages.create({IdClients:id})
          return res.json({messages})
        }
        return res.json({message:'ок!'})
  }

  async getMessages(req, res) {
    const { chatId } = req.params;
    console.log('!!!!!!!!')
    try {
      const messages = await Messages.findAll({ where: { IdChats: chatId } });
      res.status(200).json({ messages });
    } catch (error) {
      console.error('Ошибка при получении сообщений:', error);
      res.status(500).json({ error: 'Ошибка при получении сообщений' });
    }
  }









  async getClientsMessages(req, res) {
    const { chatId } = req.query;
    console.log('!!!!!!!!')
    try {
      const messages = await Messages.findAll({ where: { IdChats: chatId } });
      res.status(200).json({ messages });
    } catch (error) {
      console.error('Ошибка при получении сообщений:', error);
      res.status(500).json({ error: 'Ошибка при получении сообщений' });
    }
  }
  async AddMessages(req, res) {
    const { idClients, idConsultants, message, rule, dateCreated } = req.body;
    console.log('!!!!!!!!')
    try {
      var data = {
        IdChats: idClients,
        // IdConsultants: ,
        // IdGoods: ,
        FromClient: rule,
        Checked: false,
        TextMessages: message,
        DateCreated:dateCreated
      }
      if(!rule){
        data.IdConsultants= idConsultants
      }
      const messages = await Messages.create(data);
      res.status(200).json({ messages });
    } catch (error) {
      console.error('Ошибка при получении сообщений:', error);
      res.status(500).json({ error: 'Ошибка при получении сообщений' });
    }
  }
  async getAllClientsMessages(req, res) {
    const { chatId } = req.query;
    console.log('!!!!!!!!')
    try {
      const messages = await Chats.findAll({
        include:[{
          model:Clients,
          attributes:['Name', 'Mail']
        }]
      });
      res.status(200).json({ messages });
    } catch (error) {
      console.error('Ошибка при получении сообщений:', error);
      res.status(500).json({ error: 'Ошибка при получении сообщений' });
    }
  }
}

module.exports = new MessagesController();