import React from 'react'
import styledComponents from 'styled-components'

const ButtonEl = styledComponents.button``;

export default function Button({children, ...props}) {
  return (
    <ButtonEl
      {...props} >
      {children}
    </ButtonEl>
  )
}
