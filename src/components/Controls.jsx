import React from 'react'; 
import styledComponents from 'styled-components';
import Input from '../elements/Input';
import { IoSearchOutline } from "react-icons/io5";
import { useEffect } from 'react';
import MySelect from '../elements/Select';

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

const regions = [
  { value: 'all', label: 'All' },
  { value: 'africa', label: 'Africa' },
  { value: 'americas', label: 'Americas' },
  { value: 'asia', label: 'Asia' },
  { value: 'europe', label: 'Europe' }, 
  { value: 'oceania', label: 'Oceania' },  
];

export default function Controls(props) {
  const { getSearchString, getRegion } = props;

  useEffect(() => {
    getRegion('all');
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <MySelect  
        getRegion={getRegion}
        options={regions}
        />
    </Wrapper>
  )
}
