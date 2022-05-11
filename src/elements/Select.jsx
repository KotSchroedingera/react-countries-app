import React from 'react'
import styledComponents from 'styled-components';
import Select from 'react-select';


const SelectEl = styledComponents(Select).attrs({
  styles: {
    control: (provided, state) => ({
      ...provided, 
      backgroundColor: 'var(--color-bg-input)',
      cursor: 'pointer',
      width: '200px', 
      border: 0, 
      boxShadow: 'var(--box-shadow)', 
      borderRadius: state.menuIsOpen
        ? 'var(--radius) var(--radius) 0 0'
        : 'var(--radius)', 
      '@media (max-width: 580px)': {
        width: '100%',
      }
    }), 
    singleValue: (provided) => ({
      ...provided,
      color: 'var(--color-text)',
    }),
    menu: (provided) => {
      return {
        ...provided, 
        margin: 0,
        boxShadow: 'var(--box-shadow)', 
        overflow: 'hidden',
        borderRadius: '0 0 var(--radius) var(--radius)',
      }
    },
    menuList: (provided) => ({
      ...provided, 
      padding: 0,
      color: 'var(--color-text)',
      backgroundColor: 'var(--color-bg-input)',
    }), 
    option: (provided) => ({
      ...provided, 
      cursor: 'pointer', 
    }), 
  },
})``;


export default function MySelect({getRegion, options, ...props}) {
  return (
    <SelectEl
      {...props}
      options={options}
      defaultValue={options[0]}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: 'lightgrey',
          primary: 'black',
        },
      })}      
      isSearchable={false}
      onChange={evt => getRegion(evt.value)} />
    )
}
