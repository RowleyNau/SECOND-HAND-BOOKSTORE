import style from './CloseButton.module.css';
import {BiSolidCameraPlus } from "react-icons/bi";
import {IoClose } from "react-icons/io5";
import React, { useState } from 'react';

const CloseButton = (props) => {
    const { Click, id, ...inputProps } = props;

    return(
    <>
    <button className={style.ButClose} onClick={Click} ><IoClose/></button>
    </>
    )
}
export default CloseButton

