import React from 'react';
import styledComponents from 'styled-components';


const ContainerEl = styledComponents.div`
  margin: 0 auto; 
  max-width: 1200px;
  height: 100%;
  display: grid;
  padding: 0 3rem;

  @media(max-width: 767px) {
    padding: 0 1rem;
  }
`;


export default function Container({ children }) {
  return (
    <ContainerEl>
      {children}
    </ContainerEl>
  )
}
