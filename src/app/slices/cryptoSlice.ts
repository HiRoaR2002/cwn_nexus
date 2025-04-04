import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { io } from "socket.io-client";
import type { NextApiRequest, NextApiResponse } from "next";

// Define state structure
interface CryptoState {
  data: Record<
    string,
    {
      usd: number;
      usd_market_cap?: number;
      usd_24h_change?: number;
    }
  >;
  loading: boolean;
}

// Initial state
const initialState: CryptoState = {
  data: {},
  loading: false,
};

// Fetch crypto prices from CoinGecko API
export const fetchCrypto = createAsyncThunk("crypto/fetchCrypto", async () => {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano&vs_currencies=usd&include_market_cap=true&include_24hr_change=true"
  );
  return response.data;
});

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    updateCryptoPrices: (
      state,
      action: PayloadAction<Record<string, number>>
    ) => {
      Object.keys(action.payload).forEach((coin) => {
        // Ensure the coin exists before updating
        if (!state.data[coin]) {
          state.data[coin] = { usd: 0 }; // Initialize missing coin entry
        }
        state.data[coin].usd = action.payload[coin]; // Update price
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCrypto.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCrypto.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCrypto.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { updateCryptoPrices } = cryptoSlice.actions;

// Start WebSocket connection for real-time crypto updates
export const startCryptoWebSocket = (dispatch: any) => {
  if (typeof window !== "undefined") {
    const socket = new WebSocket(
      "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,cardano"
    );

    socket.onmessage = (event) => {
      const data: Record<string, number> = JSON.parse(event.data);
      dispatch(updateCryptoPrices(data));
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    return () => socket.close(); // Cleanup on unmount
  }
};

export default cryptoSlice.reducer;
