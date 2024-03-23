import style from './Search.css';
import {FaMagnifyingGlass } from "react-icons/fa6";

const Search = () => {
    return(
      <>
       <div class="search-container">
          <input type="text" placeholder="поиск..." name="search"></input>
          <button><FaMagnifyingGlass/></button>
      </div>
      </>
    )
}
export default Search