import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { io } from 'socket.io-client';

export const fetchCrypto = createAsyncThunk('crypto/fetchCrypto', async () => {
  const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano&vs_currencies=usd&include_market_cap=true&include_24hr_change=true');
  return response.data;
});

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: { data: {}, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCrypto.pending, (state) => { state.loading = true; })
      .addCase(fetchCrypto.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCrypto.rejected, (state) => { state.loading = false; });
  },
});
export const startCryptoWebSocket = (dispatch) => {
  if (typeof window !== 'undefined') {  // Ensure this runs only on client-side
    const socket = io('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,cardano');

    socket.on('message', (data) => {
      dispatch(updateCryptoPrices(JSON.parse(data)));
    });

    return () => socket.close();  // Cleanup on unmount
  }
};

export default cryptoSlice.reducer;
