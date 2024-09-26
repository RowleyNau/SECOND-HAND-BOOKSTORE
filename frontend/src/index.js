import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ReceptionofbooksStore from './store/ReceptionofbooksStore';

import UserStore from './store/UserStore';
import BookParamStore from './store/BookParamStore';
export const Context = createContext(null)
// console.log(process.env.REACT_APP_API_URL)
// require('dotenv').config();
// const express = require('express')
// const PORT=process.env.PORT || 5000
// const sequelize = require('./db')
// const apps = express()
// const start = async () => {
//   try{
//     await sequelize.authenticate()
//     await sequelize.sync()

    
//   } catch (e){
//     console.log(e)
//   }
// }
// start()
// import reportWebVitals from './reportWebVitals';
// apps.listen(PORT, () => console.log("ok"))


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Context.Provider value={{
      user: new UserStore(),
      Receptionofbooks: new ReceptionofbooksStore(),
      BookParam: new BookParamStore()
      }}>
          <App />
    </Context.Provider>

  /* </React.StrictMode> */
);





// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
