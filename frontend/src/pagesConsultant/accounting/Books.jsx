import '../Pages.css';
import { useState } from 'react';
// import {FaMagnifyingGlass } from "react-icons/fa6";
import PageTitle from '../../components/pageTitle/PageTitle';
import ActionButton from '../../components/allButtons/actionButton/ActionButton';
import FunctionButton from '../../components/allButtons/functionButton/FunctionButton';
import Search from '../../components/searchInput2/Search';
import Modal from '../../components/modalWindow/Modal';
import BooksAdd from './ModalWinBooks/BooksAdd';
import React, { Component } from "react";     
import {FaRegEye ,FaTrashAlt} from "react-icons/fa";
const Analytics = () => {
    function sum() {
        var result = 0;
      
        for (var i = 0; i < arguments.length; i++) {
          result += arguments[i];
        }
      
        return result;
      }
      
    const [modalBookInfo, setModalBookInfo]=useState(false);
    const [modalBookAdd, setModalBookAdd]=useState(false);
    const [modalFilter, setmodalFilter]=useState(false);
    const [modalDel, setmodalDel]=useState(false);
    const books = [
        {
            id: 0,
            name: 'Немой свидетель',
            author: 'Агата Кристи',
            location: 'основной магазин',
            condition: 'в наличии',
            price: 300,
        },
        {
            id: 1,
            name: 'Океан в конце дороги',
            author: 'Нил Гейман',
            location: 'выкуплен',
            condition: 'выкуплен',
            price: 200,
        },
        {
            id: 2,
            name: 'Вы найдете это в библиотеке',
            author: 'Митико Аояма',
            location: 'склан на ***',
            condition: 'забронирован',
            price: 300,
        }
    ]

    return(
    <>
    <div className="mainUnit">
        <PageTitle textTitle="учёт книг"/>
        <div className='controlBut'>
            <ActionButton text='добавить' Click={()=>setModalBookAdd(true)}/>
            <FunctionButton text='фильтр'/>
        </div>

        <div className="outerTab">
            <table class="table">
                    <tr className='SearchTable'>
                        <th colspan="7"><Search/></th>
                    </tr>
                    <tr>
                        <th>id</th>
                        <th>Название</th>
                        <th>Автор</th>
                        <th>Положение</th>
                        <th>Состояние</th>
                        <th>Цена</th>
                        <th></th>
                    </tr>
                <tbody>
                    {
                        books.map((book) => {
                            return(
                                <tr>
                                    <td className='num'>{sum(1, book.id)}</td>
                                    <td>{book.name}</td>
                                    <td>{book.author}</td>
                                    <td>{book.location}</td>
                                    <td>{book.condition}</td>
                                    <td  className='num'>{book.price} руб.</td>
                                    <td className='event'>
                                    <nav>
                                    <button title="подробнее"><FaRegEye/></button>
                                    <button><FaTrashAlt/></button>
                                    </nav>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            {/* <div className='SearchTable'>
                <Search/>
            </div>
            <div className='TabMain'>
                <div className='Tabtitle'>
                    <div><p>id</p></div>
                    <div><p>Название</p></div>
                    <div><p>Автор</p></div>
                    <div><p>Положение</p></div>
                    <div><p>Состояние</p></div>
                    <div><p>Цена</p></div>
                    <div><p></p></div>
                </div>
                <div className='Tabtitle'>
                    <div><p>id</p></div>
                    <div><p>Название</p></div>
                    <div><p>Автор</p></div>
                    <div><p>Положение</p></div>
                    <div><p>Состояние</p></div>
                    <div><p>Цена</p></div>
                    <div className='event'>
                        <nav>
                        <button title="подробнее"><FaRegEye/></button>
                        <button><FaTrashAlt/></button>
                        </nav>
                    </div>
                </div>
            </div> */}



        </div>
    </div>
    <Modal active={modalBookAdd} setActive={setModalBookAdd}>
                
                 {/* <SignIn/> */}
                 <BooksAdd/>
    </Modal>
    </>
    )
}
export default Analytics