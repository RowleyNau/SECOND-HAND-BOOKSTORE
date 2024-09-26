import style from './CardProduct.module.css';
// import {FaMagnifyingGlass } from "react-icons/fa6";
import LikeButton from '../allButtons/likeButton/LikeButton';
import DelButton from '../allButtons/delButton/DelButton';
import ActionButton from '../allButtons/actionButton/ActionButton';
import { PhotoGet } from '../../http/parametersApi';
import { useEffect, useState } from 'react';
const CardProduct = (props) => {
    const { Name, Price, Photo, IdGoods, href, ...inputProps } = props;
    console.log(Name, Price, Photo, href);
    const [UsePhoto, setUsePhoto]=useState()
    const selectData = async()=>{
        if(Photo && Photo.length>0){
            const data = await PhotoGet('static/images/goods/' + IdGoods + '/' + Photo);
        // console.log(data)
        setUsePhoto(data);
        }
        
    };
    useEffect (()=>{
        selectData();
        
    },[])
    return(
    <>
    <div className={style.mainCP}>
       <a href={href}>
            <img src={UsePhoto}></img>
        </a>
         <p className={style.priceCP}>{Price} руб.</p>
        <p className={style.nameCP}>{Name}</p> 
        <div className={style.buttonCP}>
            <ActionButton text='в корзину'/>
            <LikeButton/>
        </div>
    </div>
    </>
    )
}
export default CardProduct