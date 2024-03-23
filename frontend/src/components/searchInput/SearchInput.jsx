import style from './SearchInput.module.css';
import {FaMagnifyingGlass } from "react-icons/fa6";

const SearchInput = () => {
    return(
<div className={style.searchDiv}>
    <input type="text"></input>
    <button><FaMagnifyingGlass/></button>
</div>
    )
}
export default SearchInput