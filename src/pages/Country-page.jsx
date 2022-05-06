import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from '../components/Container';
import { getCountryURL } from '../api.config';


export default function CountryPage() {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  
  useEffect(() => {
    axios.get(getCountryURL(name))
      .then(resp => setCountry(resp.data[0]));
  }, []);

  if (!country) return;

  return (
    <Container>
      {country.name.common}
    </Container>
  )
}
