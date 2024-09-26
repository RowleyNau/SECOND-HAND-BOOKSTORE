import React from "react"; 
import NavbarCon from "../../components/navbarConsultant/NavbarCon.jsx";
import {observer} from "mobx-react-lite"; 
import { useEffect, useState } from 'react';
import '../Pages.css';
import PageTitle from '../../components/pageTitle/PageTitle';
import ActionButton from '../../components/allButtons/actionButton/ActionButton';
import FunctionButton from "../../components/allButtons/functionButton/FunctionButton.jsx";
import Search from '../../components/searchInput2/Search';
import Modal from '../../components/modalWindow/Modal';
import BooksAddStr from './ModalWinBooks/BooksAdd';
import BookInfo from './ModalWinBooks/BookInfo';
import { BookGetAll, BookDel, BookGet, BookSearchGetAll } from '../../http/bookManagementApi.js';   
import {FaRegEye ,FaTrashAlt, FaAngleLeft, FaAngleRight, FaCheckCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
const Books = observer(() => {
      
    const [modalBookInfo, setModalBookInfo]=useState(false);
    const [modalBookAdd, setModalBookAdd]=useState(false);
    const [modalBookDel, setModalBookDel]=useState(false);
    const [IdBookDel, setIdBookDel]=useState(false);
    const [modalFilter, setmodalFilter]=useState(false);
    const [BookInfoId, setBookInfoId]=useState(false);
    const [books, setBooks]=useState([]);//
    const [booksCount, setBooksCount]=useState([]);
    const [booksPage, setBooksPage]=useState(1);
    const [SearchStatus, setSearchStatus]=useState(false);
    const [SearchInput, setSearchInput]=useState('');
    const BookShow = async(Search)=>{
        let data;
        console.log(Search, SearchInput)
        if  (Search & SearchInput!=''){
            setSearchStatus(true);
            data = await BookSearchGetAll(50, booksPage, SearchInput);
        }
        else {
            setSearchStatus(false);
            data = await BookGetAll(50, booksPage);
            console.log(data)
        }
        setBooks(data.good)
        setBooksCount(data.amount);
    };
    const BookDelFun = async(book)=>{        
        let data;
        // setModalBookDel(true)
        // setIdBookDel(book);
        // console.log(book);
    try{
        data = await BookDel(book);
        BookShow(false);
        console.log(data.error)
        setIdBookDel(false)
    }
    catch (e){
        console.log(e)
        // alert(e.response.data.message)
        console.log(e.response.data.message)
        // setMActive()
    }
    };
    const СhoiceBookDel = async(book)=>{        
        // let data;
        setModalBookDel(true)
        setIdBookDel(book);
        console.log(book);
        // data = await BookDel(book);
        // BookShow();
    };
    const BookInfoFun = async(book)=>{
        let data;
        data = await BookGet(book);
        setBookInfoId(await BookGet(book));
        setModalBookInfo(true);
    };
    const PageBut = () => {
        const buttons = [];
        if (booksPage>1){
            buttons.push(<button  className='ButPageNoSel' onClick={() => PageNew(booksPage-1)}><FaAngleLeft/></button>);
        }
        for (let i = 1; i < booksCount + 1; i += 49) {
            console.log(i);
            if(booksPage==Math.floor(i / 50) + 1){
                buttons.push(<button key={i} className='ButPageSel' onClick={() => PageNew(Math.floor(i / 50) + 1)}>{Math.floor(i / 50) + 1}</button>);
            }
            else{
                buttons.push(<button key={i} className='ButPageNoSel' onClick={() => PageNew(Math.floor(i / 50) + 1)}>{Math.floor(i / 50) + 1}</button>);
            }
        }
        if (booksCount>booksPage*50){
            buttons.push(<button  className='ButPageNoSel' onClick={() => PageNew(booksPage+1)}><FaAngleRight/></button>);
        }
        console.log(booksPage);
        return buttons;
    };
    
    const PageNew = (num)=>{
        setBooksPage(num);
        let data;
        data = BookShow(false);
    };
    useEffect (()=>{
        BookShow(false);
        
    },[])

    useEffect (()=>{
        BookShow(false);
        
    },[modalBookInfo, modalBookAdd])
    return(
    <>
    <NavbarCon/> 
    <div className="mainUnit">
        <PageTitle textTitle="учёт книг"/>
        <div className='controlBut'>
            <ActionButton text='добавить' Click={()=>setModalBookAdd(true)}/>
            {/* <FunctionButton text='фильтр'/> */}
            <div className='ButPage'>
                {
                    PageBut()
                }
            </div>
        </div>
        
        <div className="outerTab">
            <table class="table">
                    <tr className='SearchTable'>
                        {
                            SearchStatus? 
                        <>
                        <th colspan="5"><Search ClickBut = {()=>{BookShow(true)}} value={SearchInput} onClick={e =>  setSearchInput(e.target.value)} setValue = {setSearchInput}/></th>
                        <th colspan="1"><button className='SearchCross' onClick={()=>{BookShow(false)}}><RxCross2/></button></th>
                        </>
                            :
                        <th colspan="6"><Search ClickBut = {()=>{BookShow(true)}} value={SearchInput} onClick={e =>  setSearchInput(e.target.value)} setValue = {setSearchInput}/></th>
                        }
                    </tr>
                    <tr>
                        <th>id</th>
                        <th>Название</th>
                        <th>Автор</th>
                        {/* <th>Положение</th> */}
                        <th>Состояние</th>
                        <th>Цена</th>
                        <th></th>
                    </tr>
                <tbody>
                    {
                        books ? (
                            books.map((book) => {
                                return (
                                    <tr key={book.good.IdGoods}>
                                        <td className='num'>{book.good.IdGoods}</td>
                                        <td>{book ? book.Name : 'Нет данных'}</td>
                                        <td>
                                        
                                        {
                                        book && book.bookauthors ? 
                                        book.bookauthors.map((bA) => {
                                            return (
                                                <p key={bA.IdBookAuthors}>{bA.author.Name}</p>
                                            );       
                                        })
                                        :
                                        <p>Нет данных</p>
                                        }
                                        </td>
                                        {/* <td>{book.good.location ? book.good.location.Name : 'Нет данных'}</td> */}
                                        <td>{book.good.availability ? book.good.availability.Name : 'Нет данных'}</td>
                                        <td className='num'>{book.good.Price} руб.</td>
                                        <td className='event'>
                                            <nav>
                                                <button title="подробнее"  onClick={() => BookInfoFun(book.good.IdGoods)}><FaRegEye/></button>                                                
                                                <button onClick={() => {СhoiceBookDel(book.good.IdGoods)}} ><FaTrashAlt/></button>
                                            </nav>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="7">Нет данных для отображения</td>
                            </tr>
                        )
                    } 
                </tbody>
            </table>
        </div>
    </div>


    { modalBookAdd?
        <Modal active={modalBookAdd} setActive={setModalBookAdd}>
            <BooksAddStr active={modalBookInfo} setActive={setModalBookInfo}/>
        </Modal>
        :
        <></>
    }    
    { modalBookInfo?
        <Modal active={modalBookInfo} setActive={setModalBookInfo}>
            <BookInfo IdGoodInfo={BookInfoId}/> 
        </Modal>
        :
        <></>
    }   
      
    { modalBookDel?
        <Modal active={modalBookDel} setActive={setModalBookDel}>
            {/* <BookInfo IdGoodInfo={BookInfoId}/>  */}
            {
                IdBookDel?
                <div className='modalBookDel'>
                   
                    <div>
                        <p>Вы уверены, что хотите удалить данные книге?</p>
                    </div>
                    <div className='modalBookDelQ'>
                        <ActionButton text='да' Click={()=>BookDelFun(IdBookDel)}/>
                        <FunctionButton text='нет' Click={()=>setModalBookDel(false)}/>
                    </div>
                </div>  
                :
                <div className='modalBookDel'>
                    <div>
                        <p>Данные книги удалены</p>
                    </div>
                    <div>
                        <p  className='modalBookDelTrue'><FaCheckCircle /></p>
                    </div>
                </div>  
            }
        </Modal>
        :
        <></>
    }  
    </>
    )
})
export default Books