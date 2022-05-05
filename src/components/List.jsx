import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styledComponents from 'styled-components';
import { allCountriesURL } from '../api.config'
import Countryreview from './Country-preview';
import Controls from '../components/Controls';


const Wrapper = styledComponents.main`

`;

const Countries = styledComponents.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;
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
        ? 'No countries'
        : countries.map(elem => <Countryreview key={elem.name} data={elem} />) }
      </Countries>
    </Wrapper>
  )
}
