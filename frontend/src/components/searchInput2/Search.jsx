import './Search.css';
import {FaMagnifyingGlass } from "react-icons/fa6";
// import InputStrMini from '../allInput/InputStrMini';

const Search = (props) => {
  const {setValue, className, value, pattern, onClick, type, id,placeholder, ClickBut, ...inputProps } = props;

  // value={val} type="number" name="name" min={min} onChange={ e=>onChange(e)}
  // const {val, setVal, text, id, min,max, ...inputProps } = props;
  // var onChange = (event) => {
  //     setVal(event.target.value);
  // }
    return(
      <>
       <div class="search-container">
          {/* <input type="text" placeholder="поиск..." name="search" value={val} onChange={e => setVal(e.target.value)} onClick={onClick}> </input> */}
          <input 
          type = "text"
          name="name" 
          value={value} 
          pattern = {pattern}
          onClick={onClick} 
          onChange={e => {setValue(e.target.value)}}
          placeholder={placeholder}
          />
          <button onClick={ClickBut}><FaMagnifyingGlass/></button>
      </div>
      </>
    )
}
export default Search