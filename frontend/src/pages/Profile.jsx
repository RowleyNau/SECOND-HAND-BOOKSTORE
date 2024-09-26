import './Pages1.css';
import React,{ useContext,useEffect, useState } from 'react';
// import {FaMagnifyingGlass } from "react-icons/fa6";
// import  {  useState } from 'react';
import { Context } from '../index';
const Profile = (props) => {
    const { ProfeleMenu, ...inputProps } = props;
    const [StateProfeleMenu, setStateProfeleMenu] = useState();
    useEffect (()=>{
        setStateProfeleMenu(ProfeleMenu);       
    },[])
    const {user} = useContext(Context)
    return(
    <>
    <div className="ProfileMenu">
        {
            !StateProfeleMenu||StateProfeleMenu=='0'? 
            <a href='/Profile/PersonalData' className="SelectMenu">личные данные</a>
            :
            <a href='/Profile/PersonalData'>личные данные</a>
        }
        {
            StateProfeleMenu=='1'? 
            <a href='/Profile/PurchaseHistory' className="SelectMenu">история покупок</a>
            :
            <a href='/Profile/PurchaseHistory' >история покупок</a>
        }
        {
            StateProfeleMenu=='2'? 
            <a href='/Profile/ListAcceptingBooks' className="SelectMenu">прием книг</a>
            :
            <a href='/Profile/ListAcceptingBooks'>прием книг</a>
        }
        {
            StateProfeleMenu=='3'? 
            <a href='/Profile/ListSelectionBooks' className="SelectMenu">подбор книг</a>
            :
            <a href='/Profile/ListSelectionBooks'>подбор книг</a>
        }
        {
            StateProfeleMenu=='4'? 
            <a href='' className="SelectMenu">избранное</a>
            :
            <a href=''>избранное</a>
        }
        {
            StateProfeleMenu=='5'? 
            <a  href='/Profile/ListPurchase' className="SelectMenu">карзина</a>
            :
            <a  href='/Profile/ListPurchase'>карзина</a>
        }
        {
            user.isCon? 
            <a  href='/control/Books' className="Goto">перейти в управление</a>
            :
            <></>
        }
        <a  className="ExitMenu">выйти</a>
    </div>
    </>
    )
}
export default Profile