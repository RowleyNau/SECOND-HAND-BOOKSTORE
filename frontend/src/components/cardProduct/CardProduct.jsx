import style from './CardProduct.module.css';
// import {FaMagnifyingGlass } from "react-icons/fa6";

const CardProduct = () => {
    return(
    <>
    <div className={style.mainCP}>
        <a>
            <img className={style.imgCP}></img>
            <p className={style.priceCP}>999</p>
            <p className={style.nameCP}>Имя продукта</p>
        </a>
        
    </div>
    </>
    )
}
export default CardProduct