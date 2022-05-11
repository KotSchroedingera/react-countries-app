import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Container from '../components/Container';
import styledComponents from 'styled-components';
import Button from '../elements/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getBorderCountriesNamesAsync, getCountryInfoAsync } from '../store/countriesSlice';
import { Link } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'; 


const Wrapper = styledComponents.div`
  display: grid;
  grid-template-areas: 
    'c c'
    'f i';
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin: 3rem 0;
  @media (max-width: 1024px) {
    gap: 1rem;
  }
  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
  }
`;
const Controls = styledComponents.div`
  grid-area: c;
`;
const FlagWrapper = styledComponents.div`
  grid-area: f;  
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const InfoWrapper = styledComponents.div`
  grid-area: i;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: space-evenly;
`;
const StatsWrapper = styledComponents.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
`;
const Img = styledComponents.img`
  display: block;
  width: 100%;
`;
const Title = styledComponents.h1`
  grid-column: 1 / 3;
`;
const BorderCountries = styledComponents.div`
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
const Ul = styledComponents.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`; 
const Li = styledComponents.li`
  font-size: var(--fs-large);
`;
const B = styledComponents.b`
  font-weight: var(--fw-medium);
`;


export default function CountryPage() {
  const { name } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const country = useSelector(state => state.countries.entities[name]);
  const loadingCountry = useSelector(state => state.countries.loadingCountry); 
  const loadingBorders = useSelector(state => state.countries.loadingBorderCountries);
  

  useEffect(() => {
    dispatch(getCountryInfoAsync(name));
  }, [name]);

  useEffect(() => {
    if (!country) return;
    dispatch(getBorderCountriesNamesAsync({
      borders: country.borders, 
      name: country.name.common
    }));
  }, [loadingCountry]);

  const getNativeNames = (obj) => {
    const result = [];
    for (const key in obj) {
      result.push(obj[key].common);
    }
    return result.join(', ');
  };

  const getCurrencies = (obj) => {
    const result = [];
    for (const key in obj) {
      result.push(obj[key].name);
    }
    return result.join(', ');
  }; 

  const getLanguages = (obj) => {
    const result = []; 
    for (const key in obj) {
      result.push(obj[key]);
    }
    return result.join(', ');
  }; 


  return (
    <Container>
      <Wrapper>
        <Controls>
          <Button
            onClick={() => navigate(-1)}>
              <IoArrowBack />
              Back
          </Button>
        </Controls>
        { loadingCountry === 'loading' && `Loading information about ${name}...`}
        { loadingCountry === 'failed' && 'Loading failed.' }
        { country && 
        <>
          <FlagWrapper>
            <Img 
              src={country.flags.svg}
              alt={country.name.common} />
          </FlagWrapper>
          <InfoWrapper>
            <StatsWrapper>
              <Title>
                {country.name.common}
              </Title>
              <Ul>
                <Li>
                  <B>Native name: </B>{getNativeNames(country.name.nativeName)}
                </Li>
                <Li>
                  <B>Population: </B>{country.population.toLocaleString()}
                </Li>
                <Li>
                  <B>Region: </B>{country.region}
                </Li>
                <Li>
                  <B>Sub region: </B>{country.subregion}
                </Li>
                <Li>
                  <B>Capital: </B>{country.capital[0]}
                </Li>
              </Ul>
              <Ul>
                <Li>
                  <B>Top level domain: </B>{country.tld[0]}
                </Li>
                <Li>
                  <B>Currencies: </B>{getCurrencies(country.currencies)}
                </Li>
                <Li>
                  <B>Languages: </B>{getLanguages(country.languages)}
                </Li>
              </Ul>
            </StatsWrapper>
            <BorderCountries>
              { loadingBorders === 'loading' && 'Loading borders...' }
              { loadingBorders === 'failed' && 'Failed loaing borders.' }
              { loadingBorders === 'success' &&
                <>
                  <B>Border countries: </B>
                  {country.borderCountriesNames.length
                    ? country.borderCountriesNames
                      .map(elem => 
                        <Button key={elem}>
                          <Link to={`/country/${elem}`}>{elem}</Link>
                        </Button>)
                    : 'no border countries'}
                </>
              }
            </BorderCountries>
          </InfoWrapper>
        </>
        }     
      </Wrapper>
    </Container>
  )
}
