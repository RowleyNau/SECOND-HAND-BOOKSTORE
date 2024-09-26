import style from './AllInput.module.css';
// import {FaMagnifyingGlass } from "react-icons/fa6";

const InputNum = (props) => {
    const {val, setVal, text, id, min,max, ...inputProps } = props;
    var onChange = (event) => {
        setVal(event.target.value);
    }
    return(
    <>
    <input className={style.InputNum} 
                value={val} 
                type="number" 
                min={min} 
                max={max} 
                onChange={ e=>onChange(e)}/>
    </>
    )
}
export default InputNum