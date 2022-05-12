import React from 'react'; 
import Button from '../elements/Button';
import { Link } from 'react-router-dom';
import styledComponents from 'styled-components';

const Wrapper = styledComponents.div`
  font-size: var(--fs-large);
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 0.5rem;
  align-items: baseline;
  ul {
    flex-wrap: wrap;
    flex-direction: row;
    gap: 0.3rem;
  }
  button {
    padding: 0.5rem;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default function BorderCountries({ country }) {
  return (
    <Wrapper>
      <b>Border countries: </b>
      {country.borderCountriesNames.length
        ? country.borderCountriesNames
          .map(elem => 
            <Button key={elem}>
              <Link to={`/country/${elem}`}>{elem}</Link>
            </Button>)
        : 'no border countries'}
    </Wrapper>
  )
}
