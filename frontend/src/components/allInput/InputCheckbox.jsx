import style from './AllInput.module.css';
// import {FaMagnifyingGlass } from "react-icons/fa6";

const InputCheckbox = (props) => {
    const { className, val, setVal, text, id, ...inputProps } = props;
    var onChange = (event) => {
        setVal(event.target.value);
    }
    return(
    <>
    {/* <input className={style.InputCheck} type="Checkbox" name="name"/> */}
    {/* <label lassName={style.InputCheck}>
        <input type="checkbox"/>
        <div class="InputCheck_checkmark"></div>
    </label> */}
    <div>
        <input className={className} value = {val}type="checkbox" id="cb1" onChange={ e=>onChange(e)}/> <label for="cb1"></label>
    </div>
    </>
    )
}
export default InputCheckbox