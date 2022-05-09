import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styledComponents from 'styled-components';
import { allCountriesURL } from '../api.config'
import CountryPreview from './Country-preview';
import Controls from '../components/Controls';
import { useDispatch, useSelector } from 'react-redux';
import { addCountriesToList, getCountriesAsync } from '../store/countriesSlice';

const Wrapper = styledComponents.div``;

const Countries = styledComponents.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;

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
  // const [countries, setCountries] = useState([]);
  const countries = useSelector(state => state.countries.list)
  const [searchQuery, setSearchQuery] = useState('');
  const [region, setRegion] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(allCountriesURL)
      .then(resp => {
        dispatch(getCountriesAsync({ list: resp.data }))
      })
      .catch(err => console.log(err));
  }, []);

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
      { !countries.length
        ? 'Loading countries...'
        : countries
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
