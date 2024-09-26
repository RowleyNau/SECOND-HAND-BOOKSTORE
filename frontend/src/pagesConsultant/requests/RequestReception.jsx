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
import InputCheckbox from "../../components/allInput/InputCheckbox.jsx";
import InputPhoto from "../../components/allInput/InputPhoto.jsx";
import { AcceptingBooksGetAll, AcceptingBooksGetOne } from "../../http/acceptingBooksApi.js";
import {FaCheckCircle, FaTimesCircle, FaExclamation} from "react-icons/fa";
import { PhotoGet } from "../../http/parametersApi.js";
import { ResponseToRequestToAcceptBookAdd } from "../../http/acceptingBooksApi.js";
const RequestReception = observer((props) => {
    const { heightCon, setheightCon,...inputProps } = props;
    // console.log(heightCon)
    function updateInnerDivHeight() {
        var element = document.getElementById('myDiv3');
        element.style.height = heightCon + 'px';
        // console.log(element.style.height)
    }
    const [Phone, setPhone]=useState([])
    const [IdClients, setIdClients]=useState(19)
    const [Comment, setComment]=useState()
    const [Response, setResponse]=useState(false)
    const [ErrorINP, setErrorINP]=useState(false)

    const [modalActive, setModalActive]=useState(false)
    
    const [sent, setsent]=useState(false)

    function myFun() {
        // var element = document.getElementById('myDiv');
        // var rect = element.getBoundingClientRect();
        // var yPosition = rect.top;
        // var newHeight = window.innerHeight - yPosition-80;
        // element.style.height = newHeight + 'px';
    }
    useEffect (()=>{
        updateInnerDivHeight();
        
    },[heightCon])

    const [SearchInput, setSearchInput]=useState('');
    const data = [
        {IdGoods:122, Name:'Название книги'}, {IdGoods:122, Name:'Название книги'}, {IdGoods:122, Name:'Название книги'}
        // Добавьте больше строк по мере необходимости
      ];

    const add = async() => {
        try{
            const data = await ResponseToRequestToAcceptBookAdd(Response, OneAcceptingBooks.IdReceptionOfGoods);
            setErrorINP('ответ успешно отправлен');
        }catch(e){
            console.log(e)
            setErrorINP(e.response.data.message);
        }
    }

    const [ListAcceptingBooks, setListAcceptingBooks]=useState([])
    const [OneAcceptingBooks, setOneAcceptingBooks]=useState(false)
    const [Photo, setPhoto]=useState('');

    const requestInfOneAdd = async(id) => {
        const data = await AcceptingBooksGetOne(id);
        // console.log(data)
        const a = [];
        // for (const one of data.Receptiono) {
        //     // console.log(one.data);
        //     var b = [];
            for (const onephoto of data.Receptiono.photobooksforreceptions) {
                // if(onephoto.photoGoods.length!=0){
                    let dataP = await PhotoGet('static/images/accepting/' + onephoto.IdReceptionOfBooks + '/' + onephoto.Photo);
                    a.push({Photo:dataP});
                    // console.log(a)
                // }
            }
                
        // }
        // setPhoto(a); 
        setPhoto(a);
        setOneAcceptingBooks(data.Receptiono);
    }


    const requestInfAdd = async() => {
        const data = await AcceptingBooksGetAll();
        // console.log(data)
        setListAcceptingBooks(data.Receptiono);
    }

        
    useEffect (()=>{
        requestInfAdd();
        
    },[])

    return (
      <>
       {/* <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta> */}
      <div className="ConsultationWindow" id="myDiv3">
        <div className="ConsultationWindowClientChoiceAll">
            <Search ClickBut = {()=>{myFun()}} value={SearchInput} onClick={e =>  setSearchInput(e.target.value)} setValue = {setSearchInput}/>
            <div className="ConsultationWindowClientChoice overflowAuto">
            {
                ListAcceptingBooks?ListAcceptingBooks.map((one) => {
                    return (
                <div onClick={()=>requestInfOneAdd(one.IdReceptionOfGoods)} className="ConsultationWindowDialog">
                    <p>{one.client.Name}</p>
                    <div><FaExclamation/></div>
                    <p>{one.RequestDate.split('T')[0]}</p>
                </div>
                
                    )})
                :
                <></>
            }
           
        </div>
        </div>  
            <div className="ConsultationWindowSelection overflowAuto">
        {
            OneAcceptingBooks?
            <>
            {/* {console.log(OneAcceptingBooks)} */}
                <p>{OneAcceptingBooks.client.Name} <br/>от {OneAcceptingBooks.RequestDate.split('T')[0]}</p>
                <div className="OneAccepting">
                <div className="SelectionParams ">
                    <p className="titleText">информация о книгах</p> 
                        <label>
                            <p className="basicText">помощь в перевозке: </p>
                            {
                                OneAcceptingBooks.TransportAssistance?
                                <p>да</p>:<p>нет</p>
                            }
                            
                            
                        </label>
                        <label>
                            <p className="basicText">фото</p>
                            <div className="SelectionParamsPhoto">
                                {
                                    Photo?Photo.map((one) => {
                                        // {console.log(one)}
                                        return (
                                            <>
                                            <img src={one.Photo}/>
                                            <img src={one.Photo}/>
                                            <img src={one.Photo}/>
                                            </>
                                        )})

                                    :
                                    <></>
                                }
                            </div>
                        </label>
                        <label >
                            <p className="basicText">комментарий</p>
                            {
                                OneAcceptingBooks.Comment!==''?
                                <p>{OneAcceptingBooks.Comment}</p>:<p>нет</p>
                            }
                        </label>
                        <p className="titleText">ответ</p>
                        <label>
                            <p className="basicText RequiredInp">принять книгу:</p>
                            <InputCheckbox val = {Response} setVal = {setResponse}/>
                        </label>
                        {/* <p className='RequiredMes'>необходимо заполнить хотя бы одно поле</p> */}
                        {/* <p>красным выделены поля, обязательные для заполнения</p> */}
                        {
                            ErrorINP?
                            <p className='RequiredMes'>{ErrorINP}</p>
                            :
                            <></>
                        }
                        <div className="SelectionBut">
                            {sent?<ActionButton text="Изменить" Click={()=>setModalActive(true)}/> :<ActionButton text="Отправить" Click={()=>add()}/>}
                        </div>
                        
                    </div>
                </div>
           
            </>
            :
            <></>
        }       
         </div>       
        <div className="ConsultationWindowInfo">
            { OneAcceptingBooks?
            <>
            <ActionButton text='консультация'/>
            <ActionButton text='запросы на подбор'/>
            <ActionButton text='запросы на прием'/>
            <ActionButton text='покупки'/>
            </>
            :
            <></>}
            
            {/* <button>запросы на прием</button>
            <button>покупки</button> */}
        </div>
      </div>
      </>  
    );
  });
export default RequestReception