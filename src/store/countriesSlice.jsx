import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { allCountriesURL } from "../api.config";
import { createEntityAdapter } from "@reduxjs/toolkit";


const initialState = {
  list: [],
};

export const getCountriesAsync = createAsyncThunk(
  'countries/getAllCountries', 
  async () => {
    const response = await axios.get(allCountriesURL);
    const data = await response.data;
    return data;
  }
);

const countriesAdapter = createEntityAdapter();


export const countriesSlice = createSlice({
  name: 'countries', 
  initialState: countriesAdapter.getInitialState({ loading: false, error: null }), 
  reducers: {
    // reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCountriesAsync.fulfilled, (state, action) => {
        state.entities.list = action.payload;
        state.loading = 'success';
        state.error = [];
      })
      .addCase(getCountriesAsync.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(getCountriesAsync.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error;
      })
    }
});

export const { addCountriesToList } = countriesSlice.actions;

export default countriesSlice.reducer;