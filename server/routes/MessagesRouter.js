const Router = require('express')
const router = new Router()
const MessagesController = require('../controllers/messagesControllers')

// authMiddleware, 
// router.get('/registration',)
// router.get('/chats/:chatId/messages', MessagesControllers.getAllMessages);
// router.post('/messages', MessagesControllers.addMessage);
router.post('/createChat', MessagesController.createChat);
router.get('/getMessages/:chatId', MessagesController.getMessages);


router.get('/getClientsMessages', MessagesController.getClientsMessages);
router.get('/getAllClientsMessages', MessagesController.getAllClientsMessages);
router.post('/AddMessages', MessagesController.AddMessages);
// router.de

module.exports= router