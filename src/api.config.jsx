const base_url = 'https://restcountries.com/v3.1/'; 

export const allCountriesURL = base_url + '/all?fields=name,capital,population,region,flags';

export const getCountryURL = (title) => base_url + '/name/' + title + '?fullText=true';