import style from './AllInput.module.css';
import Select from 'react-select'
import { RxCross2 } from "react-icons/rx";

const InputSelect = (props) => {
    const { selectedValue, setSelectedValue, text, val, id, ...inputProps } = props;
    const options = {val}
    const handleSelectChange = (selectedOption) => {
      setSelectedValue(selectedOption);
    };
    // console.log(selectedValue);
    return(
    <div className={style.SelectCompon}>
    <Select 
    className={style.InputSelect} 
    value={selectedValue}
    options={val}
    placeholder={'поиск...'}
    styles={{
      placeholder: (base) => ({
        ...base,
        fontSize: '1em',
        color: '#6C6761',
        fontWeight: 400,
      }),
    }}
    onChange={handleSelectChange}
    theme={(theme) => ({
      ...theme,
      border: '30px solid black',
      borderRadius: '5px',
      // padding: '5px',
      colors: {
        ...theme.colors,
        primary25: '#F0DEC8',
        primary: '#6C6761',
        neutral20: '#6C6761',
        neutral60: '#6C6761',
      },//6C6761
    })}
    />
    <div>
      <button className='SearchCross' onClick={()=> {setSelectedValue([])}}>
        <RxCross2/>
      </button>
    </div>
    
    </div>
    )
}
export default InputSelect