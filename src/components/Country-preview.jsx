import React from 'react'; 
import styledComponents from 'styled-components';


const Wrapper = styledComponents.article`
  box-shadow: var(--box-shadow);
  border-radius: var(--radius);
  overflow: hidden;
`;

const ImgWrapper = styledComponents.div`
  height: 150px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Img = styledComponents.img`
  flex-grow: 1;
  object-fit: cover;
`;

const Info = styledComponents.div`
  padding: 1rem;
`;


export default function Countryreview(props) {
  const { name, population, region, capital, flag } = props.data;

  return (
    <Wrapper>
      <ImgWrapper>
        <Img src={flag} alt={name}/>
      </ImgWrapper>
      <Info>
        <h2>{name}</h2>
        <p>Population: {population}</p>
        <p>Region: {region}</p>
        <p>Capital: {capital}</p>
      </Info>
    </Wrapper>
  )
}
