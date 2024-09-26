import './ActionButton.css';
// import {FaMagnifyingGlass } from "react-icons/fa6";

const ActionButton = (props) => {
    const { Click, dataTooltip, text, id, ...inputProps } = props;
    return(
    <>
    <button className="ButtonF" onClick={Click} data-tooltip={dataTooltip}>
        <p>{text}</p>        
    </button>
    </>
    )
}
export default ActionButton