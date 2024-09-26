import './Pages.css';
import React,{ useContext,useEffect, useState } from 'react';
// import {FaMagnifyingGlass } from "react-icons/fa6";
// import  {  useState } from 'react';
import { Context } from '../index';
const ProfileCon = (props) => {
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
            user.isCon? 
            <a  className="Goto" href='/Home'>перейти в магазин</a>
            :
            <></>
        }
        <a className="ExitMenu">выйти</a>
    </div>
    </>
    )
}
export default ProfileCon