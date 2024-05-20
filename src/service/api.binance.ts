import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL_API } from 'src/constants/url';
import { IKline } from 'src/interfaces/interface.kline';

export const binanceApi = createApi({
  reducerPath: 'binanceApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL_API }),
  endpoints: (builder) => ({
    getKlines: builder.query<IKline[][], { symbol: string; interval: string; startTime?: number; endTime?: number }>({
      query: ({ symbol, interval, startTime, endTime }) => ({
        url: '/api/v3/klines',
        method: 'GET',
        params: { symbol, interval, startTime, endTime },
      }),
    }),
    getBook: builder.query<any, { symbol: string; limit: number }>({
      query: ({ symbol, limit }) => ({
        url: '/api/v3/depth',
        method: 'GET',
        params: { symbol, limit },
      }),
    }),
  }),
});

export const { useGetKlinesQuery, useGetBookQuery } = binanceApi;
