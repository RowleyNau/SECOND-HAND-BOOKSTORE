// import React from 'react';
import React, { useState } from 'react';
import SearchInput from '../searchInput/SearchInput.jsx';
import style from './NavbarCon.module.css';
import Logo from '../../assets/logo.png';
import { myFunction } from './Scroll.js';
import {FaMoneyBill, FaFileAlt, FaCalculator} from "react-icons/fa";
import {FaLinesLeaning, FaUserLarge, FaChartSimple, FaMessage, FaCalendar, FaBook, FaBox} from "react-icons/fa6";
// import Login from '../modalWindowEntrance/Login';
const NavbarCon = () => {
    // const [modalActive, setModalActive]=useState(true)
    return(
        <header className={style.header} >
            <div className='container'>
                <div className={style.box} id = "header">
                    {/* <div className={style.location}>
                        <ul>
                            <li>
                                <p id='city'>г.Иркутск</p>
                            </li>
                            <li>
                                <a id='delivery' href=''>Доставка</a>
                            </li>
                        </ul>
                    </div> */}
                    <div className={style.logo_img}>
                    <a href='/Home'><img src={Logo} className={style.img}/></a>
                    </div>
                    <div className={style.menu}>
                        <ul>
                            <li className={style.gds}>
                                <a href='' ><FaFileAlt className={style.menuIcons}/> учёт</a>
                                <div className={style.dropdown} >
                                    <a href="/control/Users">пользователи</a>
                                    {/* <a href="#">мероприятия</a> */}
                                    <a href='/control/Books'>книги</a>
                                    <a href="/control/OtherGoods">иные товары</a>
                                    <a href="/control/Characteristics">характеристики</a>
                                </div>
                            </li>
                            <li className={style.gds}>
                                <a href=''><FaBox className={style.menuIcons}/> запросы</a>
                                <div className={style.dropdown} >
                                    <a href="#">запросы<br/>на прием книг</a>
                                    <a href="#">запросы<br/>на подбор книг</a>
                                    <a href="/control/RequestConsultation">запросы<br/>на консультацию</a>
                                </div>
                            </li>
                            <li>
                                <a  href='/control/Analytics'><FaChartSimple className={style.menuIcons}/> аналитика</a>
                            </li>
                            <li>
                                <a href='/control/Sales'><FaMoneyBill className={style.menuIcons}/> продажи</a>
                            </li>
                            <li>
                                <a href='/control/Profile/PersonalData'><FaUserLarge className={style.menuIcons}/> профиль</a>
                            </li>
                            {/* <li>
                                <SearchInput />
                                
                            </li> */}
                        </ul>
                    </div>
                </div>
            </div>
            {/* <Modal active={modalActive} setActive={setModalActive}>

                 <SignIn/>
            </Modal> */}
        </header>
    )
}
export default NavbarCon