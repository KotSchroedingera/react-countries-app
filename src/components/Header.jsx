import React from 'react';
import { Link } from 'react-router-dom';
import styledComponents from 'styled-components';
import Container from './Container';
import ThemeToggler from './ThemeToggler';


const HeaderEl = styledComponents.header`
  height: 5rem;
  box-shadow: var(--box-shadow);
  display: flex;
  position: relative;
`;

const Wrapper = styledComponents.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styledComponents(Link)`
  color: inherit;
  text-decoration: none;
`;

export default function Header() {
  return (
    <HeaderEl>
      <Container>
        <Wrapper>
          <Title to='/'>
            <h1>
              Where is the world?
            </h1>
          </Title>
          <ThemeToggler />
        </Wrapper>
      </Container>
    </HeaderEl>
  )
}
