import './Access.css';
// import {FaMagnifyingGlass } from "react-icons/fa6";
import PageTitle from '../pageTitle/PageTitle';
import InputStrMini from '../allInput/InputStrMini';
import ActionButton from '../allButtons/actionButton/ActionButton'

const SignIn = (props) => {
    // const { text, id, ...inputProps } = props;
    return(
    <>
    <PageTitle textTitle="Регистрация"/>
    <div className='content'>
        <div><p>Фамилия</p></div>
        <div><InputStrMini/></div>
        <div><p>Имя</p></div>
        <div><InputStrMini/></div>
        <div><p>Отчество</p></div>
        <div><InputStrMini/></div>
        <div><p>Номер телефона</p></div>
        <div><InputStrMini/></div>
        <div><p>e-mail</p></div>
        <div><InputStrMini/></div>
        <div><p>Пароль</p></div>
        <div><InputStrMini/></div>
    </div>
    

    <div className='button'>        
        <ActionButton text="Войти"/>
        <a>Зарегистрированы?</a>
    </div>
    </>
    )
}
export default SignIn