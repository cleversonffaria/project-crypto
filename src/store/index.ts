import { configureStore } from '@reduxjs/toolkit';
import { binanceApi } from 'src/service/api.binance';
import cryptoSlice from 'src/store/slices/slice.crypto';

export const store = configureStore({
  reducer: {
    [binanceApi.reducerPath]: binanceApi.reducer,
    crypto: cryptoSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(binanceApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
