import React, { useEffect, useState } from 'react'
import styledComponents from 'styled-components';
import CountryPreview from './Country-preview';
import Controls from '../components/Controls';
import { useDispatch, useSelector } from 'react-redux';
import { getCountriesAsync } from '../store/countriesSlice';

const Wrapper = styledComponents.div``;

const Countries = styledComponents.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;

  @media(max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media(max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media(max-width: 550px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;


export default function List() {
  const countries = useSelector(state => state.countries.entities.list) || [];
  const loading = useSelector(state => state.countries.loadingCountries); 
  const [searchQuery, setSearchQuery] = useState('');
  const [region, setRegion] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountriesAsync());
  }, [dispatch]);

  const getSearchString = (evt) => {
    setSearchQuery(evt.target.value);
  };

  const getRegion = (value) => {
    setRegion(value);
  };
 
  return (
    <Wrapper>
      <Controls
        getSearchString={getSearchString}
        getRegion={getRegion} />
      <Countries>
      { loading === 'loading' && 'Loading countries...' }
      { loading === 'failed' && 'Loading failed.' }
      { loading === 'success' &&
        countries
          .filter(elem => elem.name.common.toLowerCase().includes(searchQuery.toLowerCase()))
          .filter(elem => {
            if (region === 'all') return true;        
            return elem.region.toLowerCase() === region;
          })
          .map(elem => <CountryPreview key={elem.name.common} data={elem} />) }
      </Countries>
    </Wrapper>
  )
}
