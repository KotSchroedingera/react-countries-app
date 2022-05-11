import React from 'react';
import CountriesList from '../components/CountriesList';
import Container from '../components/Container';
import styledComponents from 'styled-components';


const Wrapper = styledComponents.main``;


export default function MainPage() {
  return (
    <Wrapper>
      <Container>
        <CountriesList />
      </Container>
    </Wrapper>
  )
}
