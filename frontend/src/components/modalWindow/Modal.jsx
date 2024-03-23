import React from 'react';
import './Modal.css';
import CloseButton from '../allButtons/closeButton/CloseButton.jsx';

// import {FaMagnifyingGlass } from "react-icons/fa6";

const Modal = ({active, setActive, children}) => {
    // const { textTitle, id, ...inputProps } = props;className={style.formTitle}
    return(
    <>
    <div className={active ? "modal active": "modal"}>
      <div className={active ? "modal__content active" : "modal__content"}>
        <div className="CloseButton"><CloseButton Click={() => setActive(false)}/></div>
        
        {/* <p>!!!!!!!!!!!{active}</p> */}
        {children}
      </div>     
    </div>
    </>
    )
}
export default Modal