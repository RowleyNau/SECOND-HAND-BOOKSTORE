import style from './AllInput.module.css';
// import {FaMagnifyingGlass } from "react-icons/fa6";

const InputStrMini = (props) => {
    const { setCompanyName, className, value, pattern, onClick, type, id, ...inputProps } = props;
    return(
        // pattern="2-[0-9]{3}-[0-9]{3}" 
    <>
    <input 
    type = {type} 
    className={`${style.InputStr} ${style.InputStrMini} ${className}`} 
    name="name" 
    value={value} 
    pattern = {pattern}
    onClick={onClick} 
    onChange={e => setCompanyName(e.target.value)}
    />
    </>
    )
}
export default InputStrMini