import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const response = await axios.get(`https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&q=cryptocurrency`);
  return response.data.results;
});

const newsSlice = createSlice({
  name: 'news',
  initialState: { articles: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => { state.loading = true; })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state) => { state.loading = false; });
  },
});

export default newsSlice.reducer;
