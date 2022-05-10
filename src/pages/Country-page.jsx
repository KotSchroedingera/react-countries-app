import React, { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
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
    'c c c'
    'f t t'
    'f i1 i2'
    'f b b';
  grid-template-columns: 50% 21% 21%;
  grid-template-rows: min-content max-content min-content max-content;
  justify-content: space-between; 
`;
const Controls = styledComponents.div`
  grid-area: c;
`;
const Flag = styledComponents.div`
  grid-area: f;  
`;
const Img = styledComponents.img`
  display: block;
  width: 100%;
`;
const Title = styledComponents.h1`
  grid-area: t;
  display: flex;
`;
const InfoMain = styledComponents.div`
  grid-area: i1;
`;
const InfoAdditional = styledComponents.div`
  grid-area: i2;
`;
const BorderCountries = styledComponents.div`
  grid-area: b;
  font-size: var(--fs-large);
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  b {
    margin-right: 1rem;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
  }
  button {
    padding: 0.5rem 1rem;
    margin-right: 0.5rem;
  }
  li:last-child button {
    margin-right: 0;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;
const Ul = styledComponents.ul`
  list-style-type: none;
  li:last-child {
    margin-bottom: 0
  };
`; 
const Li = styledComponents.li`
  font-size: var(--fs-large);
  margin-bottom: 0.7rem;
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
            style={{margin: '3rem 0'}}
            onClick={() => navigate(-1)}>
              <IoArrowBack />
              Back
          </Button>
        </Controls>
        { loadingCountry === 'loading' && `Loading information about ${name}...`}
        { loadingCountry === 'failed' && 'Loading failed.' }
        { country && 
        <>
          <Flag>
            <Img 
              src={country.flags.svg}
              alt={country.name.common} />
          </Flag>
          <Title>
            {country.name.common}
          </Title>
          <InfoMain>
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
          </InfoMain>
          <InfoAdditional>
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
          </InfoAdditional>
          <BorderCountries>
            { loadingBorders === 'loading' && 'Loading borders...' }
            { loadingBorders === 'failed' && 'Failed loaing borders.' }
            { loadingBorders === 'success' &&
              <>
                <B>Border countries: </B>
                <Ul>
                  {country.borderCountriesNames.length
                    ? country.borderCountriesNames
                      .map(elem => 
                        <Li key={elem}>
                          <Button>
                            <Link to={`/country/${elem}`}>{elem}</Link>
                          </Button>
                        </Li>) 
                    : 'no border countries'}
                </Ul> 
              </>
            }
          </BorderCountries>
        </>
        }     
      </Wrapper>
    </Container>
  )
}
