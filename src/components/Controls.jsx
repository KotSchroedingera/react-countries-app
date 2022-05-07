import React from 'react'; 
import styledComponents from 'styled-components';
import Input from '../elements/Input';
import Select from 'react-select';
import { IoSearchOutline } from "react-icons/io5";


const Wrapper = styledComponents.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2rem 0;
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
`;


const options = [
  { value: 'all', label: 'All' },
  { value: 'africa', label: 'Africa' },
  { value: 'americas', label: 'Americas' },
  { value: 'asia', label: 'Asia' },
  { value: 'europe', label: 'Europe' }, 
  { value: 'oceania', label: 'Oceania' },  
]

const SelectEl = styledComponents(Select).attrs({
  styles: {
    control: (provided, state) => ({
      ...provided, 
      width: '200px', 
      border: 0, 
      boxShadow: 'var(--box-shadow)', 
      borderRadius: state.menuIsOpen
        ? 'var(--radius) var(--radius) 0 0'
        : 'var(--radius)', 
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
    }), 
    option: (provided, state) => ({
      ...provided,
    })
  }
})``;

export default function Controls() {
  return (
    <Wrapper>
      <Search>
        <IoSearchOutline />
        <Input
          style={{ paddingLeft: '2.6rem' }}
          placeholder='Search for a country...'
          type='search' />
      </Search>
      <SelectEl
        menuIsOpen
        isSearchable={false}
        defaultValue={options[0]}
        options={options} />
    </Wrapper>
  )
}
