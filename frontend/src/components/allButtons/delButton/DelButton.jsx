import style from './DelButton.module.css';
import {FaTrashAlt} from "react-icons/fa";

const DelButton = (props) => {
    const { text, id, ...inputProps } = props;
    return(
    <>
    <button className={style.ButtonDel}>
        <FaTrashAlt className={style.ButtonIcon}/>      
    </button>
    </>
    )
}
export default DelButton