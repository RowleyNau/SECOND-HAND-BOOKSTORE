// import React from 'react';
import React, { useContext, useState } from 'react';
import SearchInput from '../searchInput/SearchInput.jsx';
import style from './Navbar.module.css';
import Logo from '../../assets/logo.png';
import Modal from '../modalWindow/Modal.jsx';
import Login from '../access/Login.jsx';
import SignIn from '../access/SignIn.jsx';
import {FaBookReader,FaHandHoldingHeart,FaHeart, FaRegHeart} from "react-icons/fa";
import {FaLinesLeaning, FaUserLarge, FaRegCalendar, FaMessage, FaCartShopping,  FaCalendar, FaBook, FaBox } from "react-icons/fa6";
// import {} from "react-icons/fa";
import { Context } from '../../index.js';
import ClientChat from '../chat/ClientChat.jsx';
// import Login from '../modalWindowEntrance/Login';
const Navbar = () => {
    const {user} = useContext(Context);
    const [modalActive, setModalActive]=useState(false)

    return(<>
    
    {user.isAuth ? 
        <ClientChat/>
        :
        <></>
    }

        <header className={style.header}>
            <div className='container'>
                <div className={style.box}  id = "header">
                    <div className={style.location}>
                        <div className={style.contact}>
                            <div className={style.city}>
                                <p>ул. Карла Либкнехта, 72, г. Иркутск</p>
                            </div>
                            <div className={style.phone}>
                                <a href=''>т. +7 (964) 118-26-55</a>
                            </div>
                        </div>
                        
                        <div className={style.delivery}>
                            <a href=''>доставка</a>
                        </div>
                    </div>
                    <div className={style.MenuPart2}>
                        <div className={style.Search}>
                            <SearchInput />
                        </div>
                        <div className={style.logo_img}>
                            <a href='/Home'><img src={Logo} className={style.img}/></a>
                        </div>
                        {/* className={style.menu} */}
                        <div >
                            <ul>
                                <li>
                                    <a href=''><FaHeart className={style.menuIcons}/> </a>
                                </li>
                                <li>
                                {user.isAuth ? 
                                    <a href='/Profile/ListPurchase'><FaCartShopping className={style.menuIcons}/> </a>
                                    :
                                    <a onClick={() => setModalActive(true)}><FaCartShopping className={style.menuIcons}/> </a>
                                    }
                                </li>
                                <li>
                                    {user.isAuth ? 
                                    <a  href="/Profile/PersonalData"><FaUserLarge className={style.menuIcons}/> </a>
                                    :
                                    <a onClick={() => setModalActive(true)}><FaUserLarge className={style.menuIcons}/> </a>
                                    }
                                    
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={style.menu}>
                        <ul>
                            <li className={style.gds}>
                                <a ><FaBook  className={style.menuIcons}/> каталог</a>
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
                                    <a href='/Profile/AcceptingBooks'>отправить запрос</a>
                                    <a href="#">информация</a>
                                </div>
                            </li>
                            <li>
                                <a href=''><FaBookReader className={style.menuIcons}/> подбор книг</a>
                            </li>
                            {/* <li>
                                <a href=''><FaCalendar className={style.menuIcons}/> мероприятия</a>
                            </li> */}
                            {/* <li>
                                <SearchInput />
                                
                            </li> */}
                        </ul>
                    </div>
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <Login Mactive={modalActive}  setMActive={setModalActive}/>
                 {/* <SignIn/> */}
            </Modal>
        </header>
        </>
    )
}
export default Navbar