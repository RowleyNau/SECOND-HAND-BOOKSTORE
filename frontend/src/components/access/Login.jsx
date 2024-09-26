import './Access.css';
import React, { useContext, useState } from 'react';
// import {FaMagnifyingGlass } from "react-icons/fa6";
import PageTitle from '../pageTitle/PageTitle';
import InputStrMini from '../allInput/InputStrMini';
import ActionButton from '../allButtons/actionButton/ActionButton'
import { login, registration } from '../../http/userApi';
import { Context } from '../../index.js';
import '../../index.css'
import InputCheckbox from '../allInput/InputCheckbox.jsx';

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
    const [Agreement, setAgreement]=useState('')

    // const [PhoneINP, setPhoneINP]=useState(true)
    // const [MailINP, setMailINP]=useState(true)
    // const [PasswordINP, setPasswordINP]=useState(true)
    // const [LastNameINP, setLastNameINP]=useState(true)
    // const [NameINP, setNameINP]=useState(true)
    // const [MiddleNameINP, setMiddleNameINP]=useState(true)

    const [ErrorINP, setErrorINP]=useState(false)
    // const [ErrorINP, setErrorINP]=useState('Вам был отправлен пароль на указанный почтовый адрес. Введите его')

    const click= async ()=>{
        try
        {let data ;
        // var TEL = new RegExp("(\\+?\\d[- .]*){7,13}");
        var MAIL = new RegExp("[^@]+@[^@]+\\.[a-zA-Z]{2,6}");
        var PASS = new RegExp("^[a-zA-Z0-9]{3,20}$");
        // var FIO = new RegExp("^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$");
        if (Active){
            data = await login(Mail, Password)
        } else{

            console.log(Mail, Password)
            // if(TEL.test(inpTel) && (inpMail==''||MAIL.test(inpMail)) && PASS.test(inpPass) && (inpName==''||FIO.test(inpName)))
            // if((Mail!==''||MAIL.test(Mail)) && PASS.test(Password) && Name!=='')
                // {
                 
                console.log(Name, Mail, Password)
                data = await registration(Name, Mail, Password)
                console.log(data) 
            // }
            // else {
            //     // console.log(inpName=='', FIO.test(inpName)) 
            //     setErrorINP("!")
            //     return
            // }


          
        }
        user.setUser(user)
        user.setIsAuth(true)
        user.setIsCon(data.Con);
        
        if (Mactive){setMActive(false)}   
        // document.location.reload();        
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
<PageTitle textTitle="авторизация"/>
    {/* <form> */}
    <div className='content'>
        <div><p>e-mail</p></div>
        <div><InputStrMini type="email"  className = "inpMail" value={Mail} onClick={e => setMail(e.target.value)} setCompanyName = {setMail} /></div>
        <div><p>пароль</p></div>
        <div><InputStrMini type="password" className = "inpPass" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" value={Password} onClick={e =>  setPassword(e.target.value)} setCompanyName = {setPassword}/></div>
    </div>
    <div className='buttonSection'>        
        {ErrorINP?<p className = "RequiredMes">{ErrorINP}</p>:<React.Fragment><br/></React.Fragment>}
        <ActionButton text="Войти" Click={click}/>        
        <a onClick={() => setActive(false)}>забыли пароль?</a>
        <a onClick={() => setActive(false)}>не зарегистрированы?</a>
    </div>
    {/* </form> */}
    </>

    :

    <>
    <PageTitle textTitle="регистрация"/>
    {/* <form> */}
    <div className='content'>
        <div><p>имя</p></div>
        <div><InputStrMini type="text" className = "inpFIO" pattern="[А-Яа-я]*?\s[А-Яа-я]*?\s[А-Яа-я]*" value={Name} onClick={e =>  setName(e.target.value)} setCompanyName = {setName}/></div>
        <div><p>e-mail</p></div>
        <div><InputStrMini  type="email" className = "inpMail" pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}" value={Mail} onClick={e => setMail(e.target.value)} setCompanyName = {setMail}/></div>
        {
            ErrorINP =='Вам на почту был отправлен пароль. Введите его в соответвующее поле'||ErrorINP =='введен неверный пароль'?
            <>
        <div data-tooltip="Пороль должен состоять из 6 символов и как минимум из одной цифры и одной латинской буквы">
            <p>пароль</p></div>
         <div data-tooltip="Пороль должен состоять из 6 символов и как минимум из одной цифры и одной латинской буквы"><InputStrMini type="password" className = "inpPass" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" value={Password} onClick={e =>  setPassword(e.target.value)} setCompanyName = {setPassword}/></div>
            </>
            :
            <></>
        }
        
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
        
        {/* <React.Fragment><br/></React.Fragment> */}
        <a onClick={() => setActive(true)}>зарегистрированы?</a>
    </div>
    </>
    }
    </>

    )
}
export default Login