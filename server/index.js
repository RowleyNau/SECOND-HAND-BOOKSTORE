
require('dotenv').config();
const express = require('express')
const PORT=process.env.PORT || 5000
const sequelize = require('./db')
const models = require('./models/models') 
const app = express()
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
const bodyParser = require("body-parser");

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path. resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
app.use(errorHandler)


// app.get('/',(req, res)=>{
//   res.status(200).json({ message:"hello!"})
// })

const start = async () => {
  try{
    await sequelize.authenticate()
    await sequelize.sync()

    app.listen(PORT ,()=>{
      console.log("started ", PORT);
    }); 

  } catch (e){
    console.log(e)
  }
}
start()
// import reportWebVitals from './reportWebVitals';


// app.get('/api',(req, res)=>{
//   res.json({
//     message:"hello!"
//   })
// })

