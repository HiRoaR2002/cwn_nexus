import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const response = await axios.get(
    `https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&q=cryptocurrency`
  );

  return response.data.results.map((article: any) => ({
    title: article.title ?? "No Title",
    link: article.link ?? "#",
    description: article.description ?? "No description available",
    source_name: article.source_name ?? "Unknown Source",
  }));
});

// Define the structure of a news article
interface NewsArticle {
  title: string;
  link: string;
  description?: string; // Optional fields
  source_name?: string;
}

interface NewsState {
  articles: NewsArticle[];
  loading: boolean;
}

// Initial state with correct types
const initialState: NewsState = {
  articles: [],
  loading: false,
};

// Now TypeScript knows "news.articles" is an array of NewsArticle objects
const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchNews.fulfilled,
      (state, action: PayloadAction<NewsArticle[]>) => {
        state.articles = action.payload;
      }
    );
  },
});

export default newsSlice.reducer;
