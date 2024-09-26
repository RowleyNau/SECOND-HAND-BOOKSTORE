import './../Pages1.css';
import Navbar from '../../components/navbar/Navbar';
import { GenreGetAll, CategoriesGetAll, AgerestrictionGetAll, AuthorsGetAll, BindingtypeGetAll} from '../../http/parametersApi';
// import { useEffect, useState } from 'react';
import Profile from '../Profile';
import PageTitle from '../../components/pageTitle/PageTitle';
import InputSelectMultiple from '../../components/allInput/InputSelectMultiple';
import InputSelect from '../../components/allInput/InputSelect';
import InputStr from '../../components/allInput/InputStr';
import ActionButton from '../../components/allButtons/actionButton/ActionButton';
import Modal from '../../components/modalWindow/Modal';
import AcceptingBooks from '../AcceptingBooks';
import InputCheckbox from '../../components/allInput/InputCheckbox';
import React, { useEffect,useContext, useState } from 'react';
import InputPhoto from '../../components/allInput/InputPhoto';
import moment from 'moment';
import {FaCheckCircle } from "react-icons/fa";
import { AcceptingBooksAdd } from '../../http/acceptingBooksApi';
const AcceptingBooksP = (props) => {
    const [Photo, setPhoto]=useState([])
    const [IdClients, setIdClients]=useState(19)
    const [Comment, setComment]=useState('')
    const [TransportAssistance, setTransportAssistance]=useState(false)
    const [RequestDate, setRequestDate]=useState(moment().format('YYYY-MM-DD'))

    const [modalActive, setModalActive]=useState(false)
    
    const [MesAdd, setMesAdd]=useState(false)

    const [ErrorINP, setErrorINP]=useState(false)

    const add = async() => {
        console.log(Comment, TransportAssistance, RequestDate, Photo)
        // var now = new Date();
        try{
            var data = await AcceptingBooksAdd(Comment, TransportAssistance, RequestDate, Photo);
            console.log(data);
            setErrorINP('заявка успешно отправлена');
            setMesAdd(true);
            console.log(ErrorINP)
        }
        catch(e){
            console.log(e)
            setMesAdd(false);
            setErrorINP(e.response.data.message);
        }
        
        }
    useEffect (()=>{
        // selectData();
        
    },[])
    return(
    <>
    {/* <div className={style.mainUnitMarg}> */}
    <Navbar/>
        <div className="mainUnit">
            <PageTitle textTitle="профиль"/>
            

            <div className="ProfileSections">
                <Profile ProfeleMenu='2'/>
                <div className="SelectionParams">
                <p className="titleText">информация о книгах</p> 
                    <label>
                        <p className="basicText">помощь в перевозке</p>
                        <InputCheckbox val = {TransportAssistance} setVal = {setTransportAssistance}/>
                    </label>
                    <label>
                        <p className="basicText RequiredInp">фото</p>
                        <InputPhoto val = {Photo} setVal = {setPhoto} severalPhotos = {true}/>
                    </label>
                    <label>
                        <p className="basicText">комментарий</p>
                        <InputStr val = {Comment} setVal = {setComment}/>
                    </label>
                    {
                        ErrorINP?
                        <p className='RequiredMes'>{ErrorINP}</p>
                        :
                        <></>
                    }
                    <p>красным выделены поля, обязательные для заполнения</p>
                    <div className="SelectionBut">
                        {
                            MesAdd? 
                            <a href='/Profile/ListAcceptingBooks'>
                                <ActionButton text="перейти к списку заявок" />
                            </a>
                            :
                            <ActionButton text="Отправить" Click={add}/>
                        }
                        
                    </div>
                    
                </div>
                
            </div>
            
        </div>

    </>
    )
}
export default AcceptingBooksP