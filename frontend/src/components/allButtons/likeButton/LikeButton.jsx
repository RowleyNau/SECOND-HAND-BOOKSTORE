import style from './likeButton.module.css';
import {FaHeart, FaRegHeart} from "react-icons/fa";

const LikeButton = (props) => {
    const { text, id, ...inputProps } = props;
    return(
    <>
    <button className={style.ButtonL}>
        <FaRegHeart className={style.ButtonIcon}/>      
    </button>
    </>
    )
}
export default LikeButton