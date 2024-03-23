import React from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
// import { colourOptions } from '../data';

const InputSelectMultiple = (props) => {
    const { selectedValue, setSelectedValue, text, val, id, ...inputProps } = props;
    const options = {val}
    const handleSelectChange = (selectedOption) => {
      setSelectedValue(selectedOption);
    };  
    const animatedComponents = makeAnimated();
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      defaultValue={[val[4]]}
      isMulti
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
  );
}
export default InputSelectMultiple