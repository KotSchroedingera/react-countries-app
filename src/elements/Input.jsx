import React from 'react'
import styledComponents from 'styled-components';


const InputEl = styledComponents.input`
  height: 100%;
  width: 100%;
  box-shadow: var(--box-shadow);
  border-radius: var(--radius);
  outline: none;
  padding: 0.5rem 1rem;
  color: inherit;
  font-family: var(--ffamily);
  font-size: var(--fs-large);
  border: none;
`;


export default function Input(props) {

  return (
    <InputEl {...props} />
  )
}
