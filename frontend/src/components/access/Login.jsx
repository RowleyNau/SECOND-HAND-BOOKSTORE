import './Access.css';
import React, { useContext, useState } from 'react';
// import {FaMagnifyingGlass } from "react-icons/fa6";
import PageTitle from '../pageTitle/PageTitle';
import InputStrMini from '../allInput/InputStrMini';
import ActionButton from '../allButtons/actionButton/ActionButton'
import { login, registration } from '../../http/userApi';
import { Context } from '../../index.js';
import '../../index.css'

// import useContext from 'react';
// import { Context } from '.';
// import {user} from './my.js'
import UserStore from '../../store/UserStore.js';

const Login = (props) => {
    const { Mactive, setMActive, id, ...inputProps } = props;
    const [Active, setActive]=useState(true)
    const {user} = useContext(Context)

    const [Phone, setPhone]=useState('')
    const [Mail, setMail]=useState('')
    const [Password, setPassword]=useState('')
    const [LastName, setLastName]=useState('')
    const [Name, setName]=useState('')
    const [MiddleName, setMiddleName]=useState('')

    // const [PhoneINP, setPhoneINP]=useState(true)
    // const [MailINP, setMailINP]=useState(true)
    // const [PasswordINP, setPasswordINP]=useState(true)
    // const [LastNameINP, setLastNameINP]=useState(true)
    // const [NameINP, setNameINP]=useState(true)
    // const [MiddleNameINP, setMiddleNameINP]=useState(true)

    const [ErrorINP, setErrorINP]=useState(false)

    const click= async ()=>{
        try
        {let data ;
        var TEL = new RegExp("(\\+?\\d[- .]*){7,13}");
        var MAIL = new RegExp("[^@]+@[^@]+\\.[a-zA-Z]{2,6}");
        var PASS = new RegExp("^[a-zA-Z0-9]{3,20}$");
        var FIO = new RegExp("^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$");
        if (Active){
            data = await login(Phone, Mail, Password)
        } else{

            var inpTel = document.getElementsByClassName("inpTel")[0].value;
            var inpMail = document.getElementsByClassName("inpMail")[0].value;
            var inpPass = document.getElementsByClassName("inpPass")[0].value;
            var inpName = document.getElementsByClassName("inpFIO")[1].value;
            console.log(inpTel, inpMail, inpPass)
            if(TEL.test(inpTel) && (inpMail==''||MAIL.test(inpMail)) && PASS.test(inpPass) && (inpName==''||FIO.test(inpName))){
                 
                console.log(LastName, Name,  MiddleName, Phone, Mail, Password)
                data = await registration(LastName, Name,  MiddleName, Phone, Mail, Password)
                console.log(data) 
            }
            else {
                setErrorINP("Ошибка!")
                return
            }


          
        }
        user.setUser(user)
        user.setIsAuth(true)
        // console.log('asdffdsgdfgfdsgfdsfgdsfgdsgdfg')
        setMActive(false)   
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
{  Active ?  
    <>
<PageTitle textTitle="Авторизация"/>
    {/* <form> */}
    <div className='content'>
        <div><p>Телефон или </p></div>
        <div><p>e-mail</p></div>
        <div><InputStrMini type="tel" className = "inpTel" value={Phone} onClick={e =>  setPhone(e.target.value)} setCompanyName = {setPhone}/></div>
        <div><InputStrMini type="email"  className = "inpMail" value={Mail} onClick={e => setMail(e.target.value)} setCompanyName = {setMail} /></div>
        <div><p>Пароль</p></div><div> </div>
        <div><InputStrMini type="password" className = "inpPass" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" value={Password} onClick={e =>  setPassword(e.target.value)} setCompanyName = {setPassword}/></div>
    </div>
    <div className='buttonSection'>        
        <ActionButton text="Войти" Click={click}/>
        {ErrorINP?<p className = "messageError">{ErrorINP}</p>:<React.Fragment><br/></React.Fragment>}
        <a onClick={() => setActive(false)}>Не зарегистрированы?</a>
    </div>
    {/* </form> */}
    </>

    :

    <>
    <PageTitle textTitle="Регистрация"/>
    {/* <form> */}
    <div className='content'>
        <div><p>Фамилия</p> {}</div>
        <div><InputStrMini type="text" className = "inpFIO" pattern="[А-Яа-я]*?\s[А-Яа-я]*?\s[А-Яа-я]*" value={LastName} onClick={e =>  setLastName(e.target.value)} setCompanyName = {setLastName}/></div>
        <div><p>Имя &#9734;</p></div>
        <div><InputStrMini type="text" className = "inpFIO" pattern="[А-Яа-я]*?\s[А-Яа-я]*?\s[А-Яа-я]*" value={Name} onClick={e =>  setName(e.target.value)} setCompanyName = {setName}/></div>
        <div><p>Отчество</p></div>
        <div><InputStrMini type="text" className = "inpFIO" pattern="[А-Яа-я]*?\s[А-Яа-я]*?\s[А-Яа-я]*" value={MiddleName} onClick={e =>  setPhone(e.target.value)} setCompanyName = {setMiddleName}/></div>
        <div><p>Номер телефона</p></div>
        <div data-tooltip="Необходимл заполнить, если не введен e-mail"><InputStrMini type="tel" className = "inpTel" pattern="(\+?\d[- .]*){7,13}" value={Phone} onClick={e =>  setPhone(e.target.value)} setCompanyName = {setPhone}/></div>
        <div><p>e-mail</p></div>
        <div data-tooltip="Необходимл заполнить, если не введен номер телефона"><InputStrMini  type="email" className = "inpMail" pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}" value={Mail} onClick={e => setMail(e.target.value)} setCompanyName = {setMail}/></div>
        <div data-tooltip="Пороль должен состоять из 6 символов и как минимум из одной цифры и одной латинской буквы"><p>Пароль &#9734;</p></div>
        <div data-tooltip="Пороль должен состоять из 6 символов и как минимум из одной цифры и одной латинской буквы"><InputStrMini type="password" className = "inpPass" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" value={Password} onClick={e =>  setPassword(e.target.value)} setCompanyName = {setPassword}/></div>
        
    </div>
    {/* </form> */}
    <div className='buttonSection'>  
    <div><p>Поля со &#9734; обязательны для заполния</p></div>      
        <ActionButton text="Войти" Click={click}/>
        {ErrorINP?<p className = "messageError">{ErrorINP}</p>:<React.Fragment><br/></React.Fragment>}
        {/* <React.Fragment><br/></React.Fragment> */}
        <a onClick={() => setActive(true)}>Зарегистрированы?</a>
    </div>
    </>
    }
    </>

    )
}
export default Login