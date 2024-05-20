import { useEffect, useState } from 'react';

import { ListCrypto } from './table.types';

import { useAppSelector } from 'src/hooks/useRedux';
import { BASE_URL_SOCKET } from 'src/constants/url';

export const useTableContent = () => {
  const [cryptoData, setCryptoData] = useState<{ [symbol: string]: ListCrypto }>({});
  const cryptoSort = useAppSelector((state) => state.crypto.sort);

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

  const formatPrice = (price: number) => {
    const fractionDigits = price.toString().split('.')[1]?.length;
    const defaultFractionDigits = 2;
    const minimumFractionDigits = fractionDigits > 1 ? fractionDigits : defaultFractionDigits;

    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits }).format(price);
  };

  const handleCrypto = (item: ListCrypto) => {
    console.log(item);
  };

  useEffect(() => {
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

    return () => {
      ws.close();
    };
  }, []);

  return { sortCryptoData, cryptoSort, handleCrypto };
};
