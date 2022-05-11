import React from 'react';
import styledComponents from 'styled-components';


const ContainerEl = styledComponents.div`
  margin: 0 auto; 
  max-width: 1200px;
  display: grid;
  padding: 0 3rem;
  width: 100%;

  @media(max-width: 767px) {
    padding: 0 1rem;
  }
`;


export default function Container({ children, ...props }) {
  return (
    <ContainerEl {...props}>
      {children}
    </ContainerEl>
  )
}
