import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  sort: {
    type: 'desc',
    value: 'price',
  },
  symbol: 'BTCUSDT',
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateSort(state, action: PayloadAction<{ type: 'asc' | 'desc'; value: string }>) {
      const { type, value } = action.payload;
      state.sort = { type, value };
    },
    updateSymbol(state, action: PayloadAction<string>) {
      state.symbol = action.payload;
    },
  },
});

export const { updateSort, updateSymbol } = cryptoSlice.actions;
export default cryptoSlice.reducer;
