import { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux';
import { BASE_URL_SOCKET } from 'src/constants/url';
import { debounce, formatPrice } from 'src/utils/helpers';
import { useGetTickerQuery } from 'src/service/api.binance';
import { ListCrypto } from './table.types';
import { updateSymbol } from 'src/store/slices/slice.crypto';

const SYMBOLS = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'DOGEUSDT'];

export const useTableContent = () => {
  const { data: initialTickerData, error, isLoading } = useGetTickerQuery(SYMBOLS);
  const [cryptoData, setCryptoData] = useState<{ [symbol: string]: ListCrypto }>({});
  const cryptoSort = useAppSelector((state) => state.crypto.sort);
  const dispatch = useAppDispatch();

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectIntervalRef = useRef<number>(1000);

  useEffect(() => {
    if (initialTickerData) {
      const initialData = initialTickerData.reduce((acc: { [symbol: string]: ListCrypto }, item: any) => {
        acc[item.symbol] = {
          symbol: item.symbol,
          price: formatPrice(parseFloat(item.lastPrice)),
          priceChangePercent: parseFloat(item.priceChangePercent).toFixed(2) + '%',
        };
        return acc;
      }, {});

      setCryptoData(initialData);
    }
  }, [initialTickerData]);

  const sortCryptoDataByPriceChangePercent = Object.values(cryptoData).sort((a, b) => {
    const changeA = parseFloat(a.priceChangePercent.replace('%', ''));
    const changeB = parseFloat(b.priceChangePercent.replace('%', ''));
    return cryptoSort.type === 'asc' ? changeA - changeB : changeB - changeA;
  });

  const sortCryptoDataByPrice = Object.values(cryptoData).sort((a, b) => {
    const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, ''));
    const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ''));
    return cryptoSort.type === 'asc' ? priceA - priceB : priceB - priceA;
  });

  const sortCryptoDataBySymbol = Object.values(cryptoData).sort((a, b) =>
    cryptoSort.type === 'asc' ? a.symbol.localeCompare(b.symbol) : b.symbol.localeCompare(a.symbol)
  );

  const sortCryptoData: { [key: string]: ListCrypto[] } = {
    price: sortCryptoDataByPrice,
    percentage: sortCryptoDataByPriceChangePercent,
    name: sortCryptoDataBySymbol,
  };

  const debouncedCrypto = debounce((item) => {
    dispatch(updateSymbol(item.symbol));
  }, 200);

  const handleCrypto = (item: ListCrypto) => {
    debouncedCrypto(item);
  };

  const connectWebSocket = () => {
    const ws = new WebSocket(
      `${BASE_URL_SOCKET}/stream?streams=btcusdt@ticker/ethusdt@ticker/solusdt@ticker/dogeusdt@ticker`
    );

    ws.onmessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      const data = message.data;

      setCryptoData((prevState) => ({
        ...prevState,
        [data.s]: {
          symbol: data.s,
          price: formatPrice(parseFloat(data.c)),
          priceChangePercent: parseFloat(data.P).toFixed(2) + '%',
        },
      }));
    };

    ws.onclose = () => {
      reconnectIntervalRef.current = Math.min(reconnectIntervalRef.current * 2, 30000);
      setTimeout(() => connectWebSocket(), reconnectIntervalRef.current);
    };

    ws.onerror = (error: Event) => {
      console.error('WebSocket error:', error);
      ws.close();
    };

    wsRef.current = ws;
  };

  useEffect(() => {
    if (!isLoading && !error && initialTickerData) {
      connectWebSocket();
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [initialTickerData, isLoading, error]);

  return { sortCryptoData, cryptoSort, handleCrypto };
};
