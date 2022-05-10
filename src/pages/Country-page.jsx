import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from '../components/Container';
import { searchCountryByCodeURL, searchCountryURL } from '../api.config';
import styledComponents from 'styled-components';
import Button from '../elements/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getCountryInfoAsync } from '../store/countriesSlice';


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
  const [country, setCountry] = useState(null);
  // const [borderCountries, setBorderCountries] = useState([]);

  const dispatch = useDispatch();
  const detailedCountries = useSelector(state => state.countries.entities.detailed);

  if (!detailedCountries[name]) dispatch(getCountryInfoAsync(name));
  
  useEffect(() => {
    
    // axios.get(searchCountryURL(name))
    //   .then(resp => {
    //     setCountry(resp.data[0]); 
    //     return resp.data[0].borders;
    //   })
    //   .then(borders => {
    //     console.log(borders);
    //     const result = [];
    //     borders.forEach(async elem => {
    //       const resp = await axios.get(searchCountryByCodeURL(elem));
    //       const data = await resp.data.name.common;
    //       result.push(await data);
    //       setBorderCountries([...result]);
    //     });
    //   })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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


  if (!country) return;

  return (
    <Container>
      <ButtonWrapper>
        <Button>Go back</Button>
      </ButtonWrapper>
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
          <B>Border countries: </B>
          {/* <Ul>
            {borderCountries.length
              ? borderCountries.map(elem => <Li key={elem}>{elem}</Li>) 
              : 'no border countries'}
          </Ul> */}
        </BorderCountries>
      </Info>
    </Container>
  )
}
