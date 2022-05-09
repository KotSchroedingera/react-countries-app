const base_url = 'https://restcountries.com/v3.1/'; 

export const allCountriesURL = `${base_url}all?fields=name,capital,population,region,flags`;

export const searchCountryURL = (title) => `${base_url}name/${title}?fullText=true&fields=name,flags,population,region,capital,subregion,borders,currencies,languages,tld`;

export const searchCountryByCodeURL = (code) => `${base_url}alpha/${code}?fields=name`;