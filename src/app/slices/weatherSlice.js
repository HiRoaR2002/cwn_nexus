import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;


export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (city) => {
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
  return { city, data: response.data };
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState: { data: {}, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => { state.loading = true; })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data[action.payload.city] = action.payload.data;
      })
      .addCase(fetchWeather.rejected, (state) => { state.loading = false; });
  },
});

export default weatherSlice.reducer;
