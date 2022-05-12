import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Container from '../components/Container';
import styledComponents from 'styled-components';
import Button from '../elements/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getBorderCountriesNamesAsync, getCountryInfoAsync } from '../store/countriesSlice';
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'; 
import BorderCountries from '../components/BorderCountries';
import { getElemsFromObj } from '../utils/utils';


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
const BorderCountriesWrapper = styledComponents.div``;
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  useEffect(() => {
    if (!country) return;
    dispatch(getBorderCountriesNamesAsync({
      borders: country.borders, 
      name: country.name.common
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingCountry]);

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
                  <B>Native name: </B>{getElemsFromObj(country.name.nativeName, 'common')}
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
                  <B>Currencies: </B>{getElemsFromObj(country.currencies, 'name')}
                </Li>
                <Li>
                  <B>Languages: </B>{getElemsFromObj(country.languages)}
                </Li>
              </Ul>
            </StatsWrapper>
            <BorderCountriesWrapper>
              { loadingBorders === 'loading' && 'Loading borders...' }
              { loadingBorders === 'failed' && 'Failed loaing borders.' }
              { loadingBorders === 'success' && 
                <BorderCountries country={country} /> }
            </BorderCountriesWrapper>
          </InfoWrapper>
        </>
        }     
      </Wrapper>
    </Container>
  )
}
