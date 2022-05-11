import React from 'react'; 
import styledComponents from 'styled-components';
import Input from '../elements/Input';
import Select from 'react-select';
import { IoSearchOutline } from "react-icons/io5";
import { useEffect } from 'react';


const Wrapper = styledComponents.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2rem 0;

  @media(max-width: 580px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const Search = styledComponents.div`
  width: 300px;
  position: relative;
  svg {
    position: absolute;
    top: 0.6rem;
    left: 1rem;
    width: 1rem;
    height: 1rem;
  }
  @media(max-width: 580px) {
    width: 100%;
  }
`;


const options = [
  { value: 'all', label: 'All' },
  { value: 'africa', label: 'Africa' },
  { value: 'americas', label: 'Americas' },
  { value: 'asia', label: 'Asia' },
  { value: 'europe', label: 'Europe' }, 
  { value: 'oceania', label: 'Oceania' },  
];

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


export default function Controls(props) {
  const { getSearchString, getRegion } = props;

  useEffect(() => {
    getRegion('all');
  }, [])

  return (
    <Wrapper>
      <Search>
        <IoSearchOutline />
        <Input
          getInputValue={getSearchString}
          style={{ paddingLeft: '2.6rem' }}
          placeholder='Search for a country...'
          type='search' />
      </Search>
      <SelectEl
          defaultValue={options[0]}
          options={options} 
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary25: 'lightgrey',
              primary: 'black',
            },
          })}      
        onChange={(evt) => getRegion(evt.value)}
        isSearchable={false} />
    </Wrapper>
  )
}
