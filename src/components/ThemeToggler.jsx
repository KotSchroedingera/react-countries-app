import React, { useEffect } from 'react'
import { IoMoonOutline } from "react-icons/io5";
import { IoMoonSharp } from "react-icons/io5";
import styledComponents from 'styled-components';
import { useState } from 'react';


const Wrapper = styledComponents.div`
  display: flex;
  width: 100px;
  justify-content: space-between;
  cursor: pointer;
`;


export default function ThemeToggler() {

  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    theme === 'light'
      ? setTheme('dark')
      : setTheme('light')
  }

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <Wrapper 
      onClick={toggleTheme}>
      { theme === 'light'
        ? <IoMoonOutline />
        : <IoMoonSharp /> }
      <span>
        { theme[0].toUpperCase() + theme.slice(1) } theme
      </span>
    </Wrapper>
  )
}
