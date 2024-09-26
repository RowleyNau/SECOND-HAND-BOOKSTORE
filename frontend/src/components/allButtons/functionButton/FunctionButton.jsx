import style from './FunctionButton.module.css';
// import {FaMagnifyingGlass } from "react-icons/fa6";

const FunctionButton = (props) => {
    const { Click, text, id, ...inputProps } = props;
    return(
    <>
    <button className={style.ButtonF} onClick={Click}>
        <p>{text}</p>        
    </button>
    </>
    )
}
export default FunctionButton