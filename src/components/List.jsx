import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styledComponents from 'styled-components';
import { allCountriesURL } from '../api.config'
import Countryreview from './Country-preview';
import Controls from '../components/Controls';


const Wrapper = styledComponents.div`

`;

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
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get(allCountriesURL)
      .then(resp => setCountries(resp.data))
      .catch(err => console.log(err));
  }, []);
 
  return (
    <Wrapper>
      <Controls />
      <Countries>
      { !countries.length
        ? 'Loading countries...'
        : countries.map(elem => <Countryreview key={elem.name.common} data={elem} />) }
      </Countries>
    </Wrapper>
  )
}
