import style from './SettingsButton.module.css';
// import {FaMagnifyingGlass } from "react-icons/fa6";

const SettingsButton = (props) => {
    const { text, onClick, id, ...inputProps } = props;
    return(
    <>
    <button className={style.ButtonF} onClick={onClick}>
        <p>{text}</p>        
    </button>
    </>
    )
}
export default SettingsButton