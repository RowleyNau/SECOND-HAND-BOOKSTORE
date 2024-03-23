import style from './AllInput.module.css';
// import {FaMagnifyingGlass } from "react-icons/fa6";

const InputStr = (props) => {
    const { val, setVal, text, id, ...inputProps } = props;
    var onChange = (event) => {
        setVal(event.target.value);
    }
    return(
    <>
    <textarea className={style.InputStr} name="name" value={val} onChange={ e=>onChange(e)}/>
    </>
    )
}
export default InputStr