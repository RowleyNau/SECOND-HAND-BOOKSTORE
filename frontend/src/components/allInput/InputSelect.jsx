import style from './AllInput.module.css';
import Select from 'react-select'

const InputSelect = (props) => {
    const { selectedValue, setSelectedValue, text, val, id, ...inputProps } = props;
    const options = {val}
    const handleSelectChange = (selectedOption) => {
      setSelectedValue(selectedOption);
    };
    return(
    <>
    <Select 
    className={style.InputSelect} 
    defaultValue={val[0]}
    options={val}
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
    </>
    )
}
export default InputSelect