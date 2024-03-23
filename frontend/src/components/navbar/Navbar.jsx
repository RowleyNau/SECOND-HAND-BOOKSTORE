// import React from 'react';
import React, { useContext, useState } from 'react';
import SearchInput from '../searchInput/SearchInput.jsx';
import style from './Navbar.module.css';
import Logo from '../../assets/logo.png';
import Modal from '../modalWindow/Modal.jsx';
import Login from '../access/Login.jsx';
import SignIn from '../access/SignIn.jsx';
import {FaBookReader,FaHandHoldingHeart} from "react-icons/fa";
import {FaLinesLeaning, FaUserLarge, FaRegCalendar, FaMessage, FaCartShopping,  FaCalendar, FaBook, FaBox } from "react-icons/fa6";
import { Context } from '../../index.js';
// import Login from '../modalWindowEntrance/Login';
const Navbar = () => {
    const {user} = useContext(Context);
    const [modalActive, setModalActive]=useState(false)

    return(
        <header className={style.header}>
            <div className='container'>
                <div className={style.box}>
                    <div className={style.location}>
                        <ul>
                            <li>
                                <p id='city'>г.Иркутск</p>
                            </li>
                            <li>
                                <a id='delivery' href=''>доставка</a>
                            </li>
                        </ul>
                    </div>
                    <div className={style.logo_img}>
                        <a><img src={Logo} className={style.img} alt='/'/></a>
                    </div>
                    <div className={style.menu}>
                        <ul>
                            <li className={style.gds}>
                                <a ><FaBook  className={style.menuIcons}/> товары</a>
                                <div className={style.dropdown} >
                                    <a href="#">книги</a>
                                    <a href="#">другое</a>
                                </div>
                            </li>
                            {/* <li>
                                <a href='/AcceptingBooks'><FaHandHoldingHeart className={style.menuIcons}/> Прием книг</a>
                            </li> */}
                            <li className={style.gds}>
                                <a ><FaBox className={style.menuIcons}/> прием книг</a>
                                <div className={style.dropdown} >
                                    <a href='/AcceptingBooks'>отправить запрос</a>
                                    <a href="#">информация</a>
                                </div>
                            </li>
                            <li>
                                <a href=''><FaCalendar className={style.menuIcons}/> события</a>
                            </li>
                            <li>
                                <a href=''><FaBookReader className={style.menuIcons}/> подобрать книгу</a>
                            </li>
                            <li>
                                <a href=''><FaCartShopping className={style.menuIcons}/> корзина</a>
                            </li>
                            <li>
                                {user.isAuth ? 
                                <a ><FaUserLarge className={style.menuIcons}/> профиль</a>
                                :
                                <a onClick={() => setModalActive(true)}><FaUserLarge className={style.menuIcons}/> войти</a>
                                }
                                
                            </li>
                            <li>
                                <SearchInput />
                                
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <Login Mactive={modalActive}  setMActive={setModalActive}/>
                 {/* <SignIn/> */}
            </Modal>
        </header>
    )
}
export default Navbar