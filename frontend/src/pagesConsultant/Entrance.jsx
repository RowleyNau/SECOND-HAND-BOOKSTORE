import './Pages.css';
import { useState } from 'react';
import moment from 'moment'
// import {FaMagnifyingGlass } from "react-icons/fa6";
import CardProduct from '../components/cardProduct/CardProduct';
import PageTitle from '../components/pageTitle/PageTitle';
import FunctionButton from '../components/allButtons/functionButton/FunctionButton';
import ActionButton from '../components/allButtons/actionButton/ActionButton';
import SettingsButton from '../components/allButtons/settingsButton/SettingsButton';
import InputNum from '../components/allInput/InputNum';
import InputSelect from '../components/allInput/InputSelect';
import InputDate from '../components/allInput/InputDate';

import InputPhoto from '../components/allInput/InputPhoto';
import InputStr from '../components/allInput/InputStr';

import InputCheckbox from '../components/allInput/InputCheckbox';
import InputStrMini from '../components/allInput/InputStrMini';
// import PureComponent from '../components/'
import React, { Component } from "react";
import Login from '../components/access/Login';
import Chart from "../components/chart/Example";
import {BooksList} from '../store/BookStore';       
// console.log({BooksList})
const Entrance = () => {

    return(
    <>
    <div className="EntModal">
      <div className="EntModal__content">
        {/* <div className="CloseButton"><CloseButton Click={() => setActive(false)}/></div> */}
        
        {/* <p>!!!!!!!!!!!{active}</p> */}
        {/* {children} */}
        <Login/>
      </div>     
    </div>
    </>
    )
}
export default Entrance