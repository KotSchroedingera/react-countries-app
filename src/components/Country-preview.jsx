import React from 'react'; 
import { Link } from 'react-router-dom';
import styledComponents from 'styled-components';


const Wrapper = styledComponents(Link)`
  box-shadow: var(--box-shadow);
  border-radius: var(--radius);
  overflow: hidden;
  cursor: pointer;
  color: inherit;
  text-decoration: none;
`;

const ImgWrapper = styledComponents.div`
  height: 150px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media(max-width: 767px) {
    height: 200px;
  }

  @media(max-width: 550px) {
    height: 300px;
  }
`;

const Img = styledComponents.img`
  flex-grow: 1;
  object-fit: cover;
`;

const Info = styledComponents.div`
  padding: 1rem;
  p {
    margin-bottom: 0.3rem;
  }
  b {
    font-weight: var(--fw-medium); 
  }
`;

const Title = styledComponents.h2`
  margin-top: 0.3rem;
  margin-bottom: 0.8rem;
`;


export default function Countryreview(props) {
  const { name, population, region, capital, flag } = props.data;

  return (
    <Wrapper to={`/country/${name}`}>
      <ImgWrapper>
        <Img src={flag} alt={name}/>
      </ImgWrapper>
      <Info>
        <Title>{name}</Title>
        <p><b>Population:</b> {population.toLocaleString()}</p>
        <p><b>Region:</b> {region}</p>
        <p><b>Capital:</b> {capital}</p>
      </Info>
    </Wrapper>
  )
}
