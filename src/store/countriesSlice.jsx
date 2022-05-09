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
  initialState: countriesAdapter.initialState(initialState), 
  reducers: {
    // addCountriesToList: (state, action) => {
    //   state.list = action.payload.list;
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(getCountriesAsync.fulfilled, (state, action) => {
      state.list = action.payload.list;
    })
  }
});

export const { addCountriesToList } = countriesSlice.actions;

export default countriesSlice.reducer;