import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

if (!API_KEY) {
  throw new Error(
    "Weather API key is missing. Please set NEXT_PUBLIC_WEATHER_API_KEY in your .env file."
  );
}

interface WeatherData {
  main?: { temp: number };
  weather?: { description: string }[];
}

interface WeatherState {
  data: Record<string, WeatherData>;
  loading: boolean;
}

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city: string) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    return { city, data: response.data as WeatherData };
  }
);

const initialState: WeatherState = {
  data: {},
  loading: false,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data[action.payload.city] = action.payload.data; // ✅ Type-safe
      })
      .addCase(fetchWeather.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default weatherSlice.reducer;
