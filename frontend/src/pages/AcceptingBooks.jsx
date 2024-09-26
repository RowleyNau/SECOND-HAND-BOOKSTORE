import './Pages1.css';
// import {FaMagnifyingGlass } from "react-icons/fa6";
// import CardProduct from '../components/cardProduct/CardProduct';
import PageTitle from '../components/pageTitle/PageTitle';
// import FunctionButton from '../components/allButtons/functionButton/FunctionButton';
import ActionButton from '../components/allButtons/actionButton/ActionButton';
// import InputNum from '../components/allInput/InputNum';
import InputPhoto from '../components/allInput/InputPhoto';
import InputStr from '../components/allInput/InputStr';

import InputCheckbox from '../components/allInput/InputCheckbox';
// import InputStrMini from '../components/allInput/InputStrMini';
// import LikeButton from '../components/allButtons/likeButton/LikeButton';
import React, { useContext, useState } from 'react';
import moment from 'moment'
import Modal from '../components/modalWindow/Modal';
import Navbar from '../components/navbar/Navbar';
// import sent from '../components/ModalMessage/sent'

const AcceptingBooks = () => {
    const [Phone, setPhone]=useState([])
    const [IdClients, setIdClients]=useState(19)
    const [Comment, setComment]=useState()
    const [TransportAssistance, setTransportAssistance]=useState(false)
    const [RequestDate, setRequestDate]=useState(moment().format('YYYY-MM-DD'))

    const [modalActive, setModalActive]=useState(false)
    
    const [sent, setsent]=useState(false)

    const [ErrorINP, setErrorINP]=useState(true)

    const add = () => {
        console.log(Phone, Comment, TransportAssistance)
        if (Phone.length>0){ 
            setsent(true)
            setModalActive(true)
            setErrorINP(true)
        }
        else{
            setErrorINP(false)
        }
        }
    return(
    <>
    <Navbar/>
    <div className="mainUnit">
        <PageTitle textTitle="запрос на прием товара"/>
        <p className="titleText">информация о книгах</p> 
        <div className="questionnaireContent">                
            {/* <div><p className="basicText">Количество книг</p></div>
            <div><InputNum val = {} setVal = {}/></div> */}
            <div><p className="basicText">помощь в перевозке</p></div>
            <div><InputCheckbox val = {TransportAssistance} setVal = {setTransportAssistance}/></div>
            <div className="RequiredInp"><p className="basicText">фото</p></div>
            <div><InputPhoto val = {Phone} setVal = {setPhone} severalPhotos = {true}/></div>
            <div><p className="basicText">комментарий</p></div>
            <div><InputStr val = {Comment} setVal = {setComment}/></div>
        </div>
        <div><p>красным выделены поля, обязательные для заполнения</p></div>
        {ErrorINP?<React.Fragment><br/></React.Fragment>:<p className = "RequiredMes">необходимо добавить фото</p>}
        {sent?<ActionButton text="Изменить" Click={()=>setModalActive(true)}/> :<ActionButton text="Отправить" Click={add}/>}
        

    <Modal active={modalActive} setActive={setModalActive}>
          <p >заявка отправлена</p>       
    </Modal>
    </div>
    </>
    )
}
export default AcceptingBooks