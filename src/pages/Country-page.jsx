import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from '../components/Container';
import { getCountryURL } from '../api.config';


export default function CountryPage() {
  const { name } = useParams();
  const [country, setCountry] = useState([]);
  
  useEffect(() => {
    axios.get(getCountryURL(name))
      .then(resp => setCountry(resp.data[0]));
  }, []);

  if (!country) return;

  return (
    <Container>
      {/* <Wrapper>
        <ImgWrapper>
          <Img/>
        </ImgWrapper>
        <Info>
          <Title></Title>
          <Data>
            <Main></Main>
            <Additional></Additional>
          </Data>
          <Borders></Borders>
        </Info>
      </Wrapper> */}
    </Container>
  )
}
