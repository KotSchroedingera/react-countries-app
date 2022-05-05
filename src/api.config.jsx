const base_url = 'https://restcountries.com/v2'; 

export const allCountriesURL = base_url + '/all?fields=name,capital,population,region,flag';

export const getCountryURL = (title) => base_url + '/name/' + title;