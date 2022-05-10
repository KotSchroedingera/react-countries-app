import React from 'react'
import styledComponents from 'styled-components'

const ButtonEl = styledComponents.button`
  font-family: var(--ffamily);
  font-size: var(--fsz-medium);
  padding: 0.5rem 2rem;
  border-radius: var(--radius);
  color: inherit;
  background-color: inherit;
  box-shadow: var(--box-shadow);
  border: none;
  cursor: pointer;
  font-weight: var(--fw-medium);
  display: flex;
  align-items: center;

  svg {
    width: 1rem;
    height: auto;
    position: relative;
    top: -1px;
    left: -3px;
  }
`;

export default function Button({children, ...props}) {
  return (
    <ButtonEl
      {...props} >
      {children}
    </ButtonEl>
  )
}
