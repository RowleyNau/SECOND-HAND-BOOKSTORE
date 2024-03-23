import style from './AllInput.module.css';
import React, { useState } from 'react';
// import {FaMagnifyingGlass } from "react-icons/fa6";

const InputDate = (props) => {
    const { className, name, max, val, myChange, setVal, id, ...inputProps } = props;
    var onChange = (event) => {
        setVal(event.target.value);
    }
    // const handleSelectChange = (event) => {
    //     // 
    //     setVal(event=>onChange(event));
    //     e=>onChange(e)
    //   };
    // const [valueDate, setvalueDate]=useState({val});
    return(
    <>
    <input className={`${style.InputDate} ${className}`} type="date" name="name" max={max} value={val} onChange={ e=>onChange(e)}/>
    </>
    )
}
export default InputDate