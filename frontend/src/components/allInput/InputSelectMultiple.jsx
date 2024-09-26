import React from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

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
      value={selectedValue}
      placeholder={'поиск...'}
    styles={{
      placeholder: (base) => ({
        ...base,
        fontSize: '1em',
        color: '#6C6761',
        fontWeight: 400,
      }),
    }}
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