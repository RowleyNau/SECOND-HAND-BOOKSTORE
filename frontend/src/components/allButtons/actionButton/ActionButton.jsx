import './ActionButton.css';
// import {FaMagnifyingGlass } from "react-icons/fa6";

const ActionButton = (props) => {
    const { Click, text, id, ...inputProps } = props;
    return(
    <>
    <button className="ButtonF" onClick={Click}>
        <p>{text}</p>        
    </button>
    </>
    )
}
export default ActionButton