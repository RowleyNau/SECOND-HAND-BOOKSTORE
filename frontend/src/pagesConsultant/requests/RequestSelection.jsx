import "../Pages.css"
import './RequestsConsultant.css'
import React from "react"; 
import NavbarCon from "../../components/navbarConsultant/NavbarCon.jsx";
import {observer} from "mobx-react-lite"; 
import { useEffect, useState } from 'react';
import '../Pages.css';
import Search from "../../components/searchInput2/Search.jsx";
import { RxCross2 } from "react-icons/rx";
import { GoPaperAirplane, GoPaperclip  } from "react-icons/go";
import { PiLightningLight } from "react-icons/pi";
import ActionButton from "../../components/allButtons/actionButton/ActionButton.jsx";
import FunctionButton from "../../components/allButtons/functionButton/FunctionButton.jsx";
import {FaTrashAlt } from "react-icons/fa";
import InputStr from "../../components/allInput/InputStr.jsx";
import { IndividualSelectionGetAll, IndividualSelectionGetOne, ResultBySelectionOfGoodsAdd } from "../../http/individualSelectionApi.js";
import { FaAngleDown, FaPlus, FaExclamation} from "react-icons/fa";
import Modal from "../../components/modalWindow/Modal.jsx";
import { BookSearchGetAll } from "../../http/bookManagementApi.js";
const RequestSelection = observer((props) => {
    const { heightCon, setheightCon,...inputProps } = props;
    // console.log(heightCon)

    const [ListSelection, setListSelection]=useState('');
    const [InftSelection, setInftSelection]=useState(false);
    const [ModalActive, setModalActive]=useState(false);
    const [SearchBookModal, setSearchBookModal]=useState([]);    
    const [SearchInput, setSearchInput]=useState('');    
    const [SearchInput1, setSearchInput1]=useState('');     
    const [CommentInput, setCommentInput]=useState('');  
    const [AnswerBook, setAnswerBook]=useState([]);
    const [ErrorINP, setErrorINP]=useState(false)
    const BookShow = async()=>{
        let data;
        // console.log(SearchInput)
        if  (SearchInput!=''){
            // setSearchStatus(true);
            data = await BookSearchGetAll(50, 1, SearchInput);
            // console.log(data)
            setSearchBookModal(data)
        }
    };
    const AnswerBookAdd = async(id, name)=>{
        var a = [...AnswerBook]
        // console.log(AnswerBook)
        // {IdGoods:122, Name:'Название книги'}
        if (!a.some(C => C.IdGoods === id)){
            a.push({IdGoods:id, Name: name})
            setAnswerBook(a);
        }
    };
    const AnswerBookDel = async(id)=>{
        setAnswerBook(books => 
            books.filter(C => C.IdGoods !== id));
    
    };
    function updateInnerDivHeight() {
        var element = document.getElementById('myDiv2');
        element.style.height = heightCon + 'px';
        // console.log(element.style.height)
    }
    function myFun() {
        // var element = document.getElementById('myDiv');
        // var rect = element.getBoundingClientRect();
        // var yPosition = rect.top;
        // var newHeight = window.innerHeight - yPosition-80;
        // element.style.height = newHeight + 'px';
    }
    const IndividualSelection = async()=>{
       const data = await IndividualSelectionGetAll();
        console.log(data)
       setListSelection(data.Individual)
    };
    useEffect (()=>{
        updateInnerDivHeight();
        // const data = await IndividualSelectionGetAll();
        // console.log(data)
        
    },[heightCon])

    const IndividualRequestInf = async(id)=>{
       const data = await IndividualSelectionGetOne(id);
        // console.log(data)
        setInftSelection(data.Individual)
    };
    useEffect (()=>{
        IndividualSelection();
        
    },[])

    const add = async()=>{
        try{
            // console.log(InftSelection.IdIndividualSelectionOfBooks)
        const data = await ResultBySelectionOfGoodsAdd(AnswerBook, InftSelection.IdIndividualSelectionOfBooks, CommentInput)
        setErrorINP('ответ успешно отправлен');
        }catch(e){
            console.log(e)
            setErrorINP(e.response.data.message);
        }
       
    };




      const [showText, setShowText] = useState(false);

      const handleClick = () => {
        setShowText(!showText);
      };
      
    return (
      <>
       {/* <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta> */}
      <div className="ConsultationWindow"  id="myDiv2">
        <div>
            <Search ClickBut = {()=>{myFun()}} value={SearchInput1} onClick={e =>  setSearchInput1(e.target.value)} setValue = {setSearchInput1}/>
            <div className="ConsultationWindowClientChoice overflowAuto">
                {
                    ListSelection?ListSelection.map((one) => {
                        return (
                            <>
                            <div onClick={()=>IndividualRequestInf(one.IdIndividualSelectionOfBooks)} className="ConsultationWindowDialog">
                                <p>{one.client.Name}</p>
                                <div><FaExclamation/></div>
                                <p>{one.RequestDate}</p>
                            </div>
                            </>
                        )})
                    :
                    <></>
                }
            
            </div>
        </div>         
        <div className="ConsultationWindowSelection overflowAuto">
            {
                InftSelection?
                <>
                <p>{InftSelection.client.Name}<br/>от {InftSelection.RequestDate}</p>
            <div className="RequestScroll">
                <div>
                    <div onClick={handleClick} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
                        <span>пожелания</span>
                        <span style={{ marginLeft: '8px', transform: showText ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                        <FaAngleDown/>
                        </span>
                    </div>
                    {showText && <div style={{ marginTop: '10px' }}>
                        <p>жанры: 
                            {InftSelection.genresforselections.length!==0? InftSelection.genresforselections.map((Ch) => {
                                return(' '+ Ch.genre.Name+' |')
                            })
                        :' нет'}
                        </p>
                        <p>авторы: 
                            {InftSelection.authorsforselections.length!==0? InftSelection.authorsforselections.map((Ch) => {
                                return(' '+Ch.author.Name+' '+Ch.author.LastName+' |')
                            })
                        :' нет'}
                        </p>
                        <p>категории:   
                            {InftSelection.categoriesforselections.length!==0? InftSelection.categoriesforselections.map((Ch) => {
                                return(' '+Ch.category.Name+' |')
                            })
                        :' нет'}
                        </p>
                        <p>комментарий: 
                            {InftSelection.Interests!==''?InftSelection.Interests:' нет'}

                        </p>
                        </div>}
                </div>
                <div className="ConsultationWindowSelectionAdd">
                    <p>рекомендуемые книги:</p>
                    <FunctionButton text='добавить' Click={()=>setModalActive(true)}/>
                </div>
                    {AnswerBook.length!==0?
                <div className="table-containerSelection">
                    <div className="tableSelection1">
                        {AnswerBook.map((row, rowIndex) => (
                            <>
                            <div className="cellSelection">
                                <p>{rowIndex+1}</p>
                            </div>
                            <div className="cellSelection">
                                <p>{row.Name}</p>
                            </div>
                            <div className="cellSelection">
                                <button onClick={()=>AnswerBookDel(row.IdGoods)}><FaTrashAlt/></button>
                            </div>
                            </>
                        ))}
                    </div>
                    
                </div>
                    :
                    <></>}
            </div>
            <div>
                <p>комментарий:</p>
                <InputStr  val={CommentInput} setVal={setCommentInput}/>
                {
                    ErrorINP?
                    <p className='RequiredMes'>{ErrorINP}</p>
                    :
                    <></>
                }
                <ActionButton text='отправить' Click={()=>add()}/>
            </div>
        
                </>
                :
                <></>
            }
        
        </div>       
        <div className="ConsultationWindowInfo">
            {
                InftSelection?
                <>
                <ActionButton text='консультация'/>
                <ActionButton text='запросы на подбор'/>
                <ActionButton text='запросы на прием'/>
                <ActionButton text='покупки'/>
                </>
                :
                <></>
            }
            
            {/* <button>запросы на прием</button>
            <button>покупки</button> */}
        </div>
      </div>

      <Modal active = {ModalActive} setActive={setModalActive}>
                <>
                <table class="table">
                    <tr className='SearchTable'>
                        {/* {
                            SearchStatus? 
                        <>
                        <th colspan="2"><Search ClickBut = {()=>{BookShow(true)}} value={SearchInput} onClick={e =>  setSearchInput(e.target.value)} setValue = {setSearchInput}/></th>
                        <th colspan="1"><button className='SearchCross' onClick={()=>{BookShow(false)}}><RxCross2/></button></th> 
                        </>
                            :*/}
                        <th colspan="3"><Search ClickBut = {()=>{BookShow(true)}} value={SearchInput} onClick={e =>  setSearchInput(e.target.value)} setValue = {setSearchInput}/></th>
                        {/* } */}
                    </tr>
                    <tr>
                        <th>Название</th>
                        <th>Автор</th>
                        <th></th>
                    </tr>
                <tbody>
                    {
                        SearchBookModal.length!==0 ?(
                            
                            SearchBookModal.good.map((book) => {
                                return (
                                    
                                    <tr key={book.IdGoods}>
                                        <td>{book ? book.booklist.Name : 'Нет данных'}</td>
                                        <td>
                                        
                                        {
                                        book && book.booklist.bookauthors ? 
                                        book.booklist.bookauthors.map((bA) => {
                                            return (
                                                <p key={bA.IdBookAuthors}>{bA.author.Name}</p>
                                            );       
                                        })
                                        :
                                        <p>Нет данных</p>
                                        }
                                        </td>
                                       
                                        <td className='event'>
                                            <nav>
                                                <button title="добавить"  onClick={() => AnswerBookAdd(book.IdGoods, book.booklist.Name)}><FaPlus/></button>                                                
                                               
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
            
                </>
      </Modal>
      </>  
    );
  });
export default RequestSelection