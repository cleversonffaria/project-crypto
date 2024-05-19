import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  prices: {
    BTC: { lastPrice: 0, percentChange: 0 },
    ETH: { lastPrice: 0, percentChange: 0 },
    SOL: { lastPrice: 0, percentChange: 0 },
    DOGE: { lastPrice: 0, percentChange: 0 },
  },
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updatePrice(
      state,
      action: PayloadAction<{ symbol: keyof typeof initialState.prices; lastPrice: number; percentChange: number }>
    ) {
      const { symbol, lastPrice, percentChange } = action.payload;
      state.prices[symbol] = { lastPrice, percentChange };
    },
  },
});

export const { updatePrice } = cryptoSlice.actions;
export default cryptoSlice.reducer;
