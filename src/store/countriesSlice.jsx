import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { allCountriesURL, searchCountryByCodeURL, searchCountryURL } from "../api.config";
import { createEntityAdapter } from "@reduxjs/toolkit";


export const getCountriesAsync = createAsyncThunk(
  'countries/getAllCountries', 
  async () => {
    const response = await axios.get(allCountriesURL);
    const data = await response.data;
    return data;
  }, 
  {
    condition: ( title, { getState }) => {
      if (getState().countries.loadingCountries === 'success') return false; 
    }
  }
);

export const getCountryInfoAsync = createAsyncThunk(
  'countries/getCountryInfo', 
  async (title) => {
    const response = await axios.get(searchCountryURL(title)); 
    const data = response.data[0];
    data.borderCountriesNames = [];
    return data;
  }, 
  {
    condition: (title, { getState }) => {
      if (getState().countries.entities[title]) return false;
    }
  }
); 

export const getBorderCountriesNamesAsync = createAsyncThunk(
  'countries/getBorderCountriesNames', 
  async ({ borders, name }) => {
    console.log(borders, name);
    const result = await Promise.all(borders.map(async elem => {
      const response = await axios.get(searchCountryByCodeURL(elem)); 
      return response.data.name.common;
    }));
    return { name, result };
  }, 
)

const countriesAdapter = createEntityAdapter();

export const countriesSlice = createSlice({
  name: 'countries', 
  initialState: countriesAdapter.getInitialState({ 
    loadingCountries: 'idle', 
    loadingCountry: 'idle',
    loadingBorderCountries: 'idle',
    error: null }), 
  reducers: {
    // reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCountriesAsync.fulfilled, (state, action) => {
        state.entities.list = action.payload;
        state.loadingCountries = 'success';
        state.error = [];
      })
      .addCase(getCountriesAsync.pending, (state) => {
        state.loadingCountries = 'loading';
      })
      .addCase(getCountriesAsync.rejected, (state, action) => {
        state.loadingCountries = 'failed';
        state.error = action.error;
      })

      .addCase(getCountryInfoAsync.fulfilled, (state, action) => {
        state.entities[action.payload.name.common] = action.payload;
        state.loadingCountry = 'success'; 
        state.error = [];
      })
      .addCase(getCountryInfoAsync.pending, (state) => {
        state.loadingCountry = 'loading'; 
      })
      .addCase(getCountryInfoAsync.rejected, (state, action) => {
        state.loadingCountry = 'failed'; 
        state.error = action.error;
      })

      .addCase(getBorderCountriesNamesAsync.fulfilled, (state, action) => {
        state.entities[action.payload.name].borderCountriesNames = action.payload.result;
        state.loadingBorderCountries = 'success';
      })
      .addCase(getBorderCountriesNamesAsync.pending, (state) => {
        state.loadingBorderCountries = 'loading'; 
      })
      .addCase(getBorderCountriesNamesAsync.rejected, (state, action) => {
        state.loadingBorderCountries = 'failed'; 
        state.error = action.error;
      })
    }
});

export const { addCountriesToList } = countriesSlice.actions;

export default countriesSlice.reducer;