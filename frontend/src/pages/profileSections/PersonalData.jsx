import './../Pages1.css';
import Navbar from '../../components/navbar/Navbar';
import { GenreGetAll, CategoriesGetAll, AgerestrictionGetAll, AuthorsGetAll, BindingtypeGetAll} from '../../http/parametersApi';
import { useEffect, useState, useRef } from 'react';
import Profile from '../Profile';
import PageTitle from '../../components/pageTitle/PageTitle';
import InputSelectMultiple from '../../components/allInput/InputSelectMultiple';
import InputSelect from '../../components/allInput/InputSelect';
import InputStr from '../../components/allInput/InputStr';
import InputStrMini from '../../components/allInput/InputStrMini';
import ActionButton from '../../components/allButtons/actionButton/ActionButton';
import FunctionButton from '../../components/allButtons/functionButton/FunctionButton';
import Modal from '../../components/modalWindow/Modal';
import {FaCheckCircle } from "react-icons/fa";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { personalInfo } from '../../http/userApi';

const PersonalData = (props) => {
    const [modalActive, setModalActive]=useState(false);
    const [Receipt, setReceipt]=useState([]);
    const [Name, setName]=useState('');
    const [LastName, setLastName]=useState('');
    const [MiddleName, setMiddleName]=useState('');
    const [Mail, setMail]=useState('');
    const [Phone, setPhone]=useState('');
    // var swiper = new Swiper(".mySwiper", {
    //     watchSlidesProgress: true,
    //     slidesPerView: 3,
    //   });
    function addSelection(){
        // setModalActive(true);
        console.log(Receipt.value)
        console.log(Receipt.length)
    }
    const selectData = async()=>{
        // let data = await GenreGetAll();
        // setSelGenre(createDictionary1(data.genre)) 
    };

    const add = async() => {
        const data = await personalInfo();
        console.log(data.data);
        setName(data.data.Name);
        setLastName(data.data.LastName);
        setMiddleName(data.data.MiddleName);
        setMail(data.data.Mail);
        setPhone(data.data.Phone);
        }
    useEffect (()=>{
       add() 
        
    },[])

    
    return(
    <>
    {/* <div className={style.mainUnitMarg}> */}
    <Navbar/>
        <div className="mainUnit">
            <PageTitle textTitle="профиль"/>
            <div className="ProfileSections">
                <Profile ProfeleMenu='0'/>
                <div className="SelectionParams">
                    {/* <div className="PersonalDataInfo"> */}
                        <label>
                            <p className="RequiredInp">имя:</p>   
                            <InputStrMini type="text" className = "inpName" value={Name} onClick={e =>  setName(e.target.value)} setCompanyName = {setName}/>
                        </label>
                        <label>
                            <p>фамилия:</p>   
                            <InputStrMini type="text" className = "inpName" value={LastName} onClick={e =>  setLastName(e.target.value)} setCompanyName = {setLastName}/>
                        </label>
                        <label>
                            <p>отчество:</p>   
                            <InputStrMini type="text" className = "inpName" value={MiddleName} onClick={e =>  setMiddleName(e.target.value)} setCompanyName = {setMiddleName}/>
                        </label>
                        <label>
                            <p className="RequiredInp">e-mail:</p>   
                            <InputStrMini type="text" className = "inpName" value={Mail} onClick={e =>  setMail(e.target.value)} setCompanyName = {setMail}/>
                        </label>
                        <label>
                            <p>телефон:</p>   
                            <InputStrMini type="number" className = "inpName" pattern="/[^\d]/g, ''" value={Phone} onClick={e =>  setPhone(e.target.value)} setCompanyName = {setPhone}/>
                        </label>
                    {/* </div> */}
                          
                    <p>красным выделены поля, обязательные для заполнения</p> 
                    <div className="SelectionBut">
                        <ActionButton text="Изменить" Click={()=>add()}/> 
                        <FunctionButton text="Изменить пароль" Click={()=>add()}/> 
                    </div>      
                </div>
            </div>
        </div>
            
        {/* </div> */}

    </>
    )
}
export default PersonalData