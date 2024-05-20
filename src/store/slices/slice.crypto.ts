import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  sort: {
    type: 'asc',
    value: 'price',
  },
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateSort(state, action: PayloadAction<{ type: 'asc' | 'desc'; value: string }>) {
      const { type, value } = action.payload;
      state.sort = { type, value };
    },
  },
});

export const { updateSort } = cryptoSlice.actions;
export default cryptoSlice.reducer;
