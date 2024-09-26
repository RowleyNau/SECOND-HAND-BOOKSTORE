
require('dotenv').config();
const express = require('express')
const http = require('http'); // Добавлено для работы с socket.io
const socketIo = require('socket.io'); // Добавлено для работы с socket.io
const PORT=process.env.PORT || 5000
const sequelize = require('./db')
const models = require('./models/models') 
const app = express()
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const path = require('path')
const bodyParser = require("body-parser");
const server = http.createServer(app); // Создание HTTP сервера для socket.io
const io = socketIo(server); // Инициализация socket.io


app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path. resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('join_chat', (chatId) => {
    socket.join(chatId);
    console.log(`Client joined chat ${chatId}`);
  });

  socket.on('send_message', async (messageData) => {
    try {
      const newMessage = await models.Messages.create(messageData);
      io.to(messageData.IdChats).emit('receive_message', newMessage);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
const start = async () => {
  try{
    await sequelize.authenticate()
    await sequelize.sync()

    // app.listen(PORT ,()=>{
    //   console.log("started ", PORT);
    // }); 
    server.listen(PORT ,()=>{
      console.log("started ", PORT);
    }); 


  } catch (e){
    console.log(e)
  }
}
start()
// Socket.io события


