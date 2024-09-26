import '../../Pages.css';
import './ModalWinUsers.css';
import { useEffect, useState } from 'react';
import ActionButton from '../../../components/allButtons/actionButton/ActionButton.jsx';
import { registration } from '../../../http/userApi.js';
import InputStrMini from '../../../components/allInput/InputStrMini.jsx';
import InputCheckbox from '../../../components/allInput/InputCheckbox.jsx';
import React from "react";  

import {observer} from "mobx-react-lite";
const UsersAddStr = observer( (props) => {
    const { idBook, id, Mactive, setMActive, ...inputProps } = props;

    const [Active, setActive]=useState(true)
    // const {user} = useContext(Context)

    const [Phone, setPhone]=useState('')
    const [Mail, setMail]=useState('')
    const [Password, setPassword]=useState('')
    const [LastName, setLastName]=useState('')
    const [Name, setName]=useState('')
    const [MiddleName, setMiddleName]=useState('')
    const [Agreement, setAgreement]=useState('')

    const [ErrorINP, setErrorINP]=useState(false)


    const click= async ()=>{
        try
        {let data ;
        var MAIL = new RegExp("[^@]+@[^@]+\\.[a-zA-Z]{2,6}");
        var PASS = new RegExp("^[a-zA-Z0-9]{3,20}$");

        console.log(Name, Mail, Password)
        data = await registration(Name, Mail, Password)
        console.log(data)           

        setErrorINP("пользователь успешно зарегистрирован")      
    }
        catch (e){
            console.log(e)
            // alert(e.response.data.message)
            setErrorINP(e.response.data.message)
            // setMActive()
        }
        
    }

    return(
    <>
    <div className="Main">
        
    {/* <PageTitle textTitle="регистрация"/> */}
    {/* <form> */}
    <div className='content'>
        <div><p>имя</p></div>
        <div><InputStrMini type="text" className = "inpFIO" pattern="[А-Яа-я]*?\s[А-Яа-я]*?\s[А-Яа-я]*" value={Name} onClick={e =>  setName(e.target.value)} setCompanyName = {setName}/></div>
        <div><p>e-mail</p></div>
        <div><InputStrMini  type="email" className = "inpMail" pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}" value={Mail} onClick={e => setMail(e.target.value)} setCompanyName = {setMail}/></div>
        <div data-tooltip="Пороль должен состоять из 6 символов и как минимум из одной цифры и одной латинской буквы"><p>пароль</p></div>
        <div data-tooltip="Пороль должен состоять из 6 символов и как минимум из одной цифры и одной латинской буквы"><InputStrMini type="password" className = "inpPass" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" value={Password} onClick={e =>  setPassword(e.target.value)} setCompanyName = {setPassword}/></div>
        
    </div>
    {/* </form> */}
    <div className='buttonSection'>  
    {/* <div><p>Красным выделены поля, обязательные для заполнения</p></div>       */}
    <div className='CheckReg'>
        <p>Я даю согласие на обработку персональных данных</p>
        <InputCheckbox val = {Agreement} setVal = {setAgreement}/>
    </div> 
    {ErrorINP?<p className = "RequiredMes">{ErrorINP}</p>:<React.Fragment><br/></React.Fragment>}
        <ActionButton text="Войти" Click={click}/>
        
    </div>
    </div>

    </>
    )
})
export default UsersAddStr