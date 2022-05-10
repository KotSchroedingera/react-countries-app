import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Container from '../components/Container';
import styledComponents from 'styled-components';
import Button from '../elements/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getBorderCountriesNamesAsync, getCountryInfoAsync } from '../store/countriesSlice';
import { Link } from 'react-router-dom';

const ButtonWrapper = styledComponents.div``;
const Info = styledComponents.div``;
const Flag = styledComponents.div``;
const Img = styledComponents.img``;
const Title = styledComponents.h1``;
const InfoMain = styledComponents.div``;
const InfoAdditional = styledComponents.div``;
const BorderCountries = styledComponents.div``;
const Ul = styledComponents.ul``; 
const Li = styledComponents.li``;
const B = styledComponents.b``;


export default function CountryPage() {
  const { name } = useParams();

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
      <ButtonWrapper>
        <Button>Go back</Button>
      </ButtonWrapper>
      { loadingCountry === 'loading' && `Loading information about ${name}...`}
      { loadingCountry === 'failed' && 'Loading failed.' }
      { country && 
        <Info>
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
                    ? country.borderCountriesNames.map(elem => <Li key={elem}><Link to={`/country/${elem}`}>{elem}</Link></Li>) 
                    : 'no border countries'}
                </Ul> 
              </>
            }
          </BorderCountries>
        </Info>
      }     
    </Container>
  )
}
