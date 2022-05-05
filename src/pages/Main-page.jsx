import React from 'react';
import List from '../components/List';
import Container from '../components/Container';
import styledComponents from 'styled-components';

const Wrapper = styledComponents.div`
  margin-top: 1rem;
`;


export default function MainPage() {
  return (
    <Wrapper>
      <Container>
        <List />
      </Container>
    </Wrapper>
  )
}