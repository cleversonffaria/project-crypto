import { Decimal } from 'decimal.js-light';
import { useCallback, useEffect, useRef, useState } from 'react';

import { BASE_URL_SOCKET } from 'src/constants/url';
import { useGetBookQuery } from 'src/service/api.binance';
import { useAppSelector } from 'src/hooks/useRedux';

import { Order, OrderBookState } from './book.types';

const LEVELS = 20;

export const useBook = () => {
  const SYMBOL = useAppSelector((state) => state.crypto.symbol);

  const { data: initialBookData, isLoading } = useGetBookQuery({ symbol: SYMBOL.toUpperCase(), limit: LEVELS });

  const [orderBook, setOrderBook] = useState<OrderBookState>({ bids: [], asks: [] });
  const [midPrice, setMidPrice] = useState(new Decimal(0));
  const [midPriceType, setMidPriceType] = useState<'bid' | 'ask' | 'none'>('none');

  const wsRef = useRef<WebSocket | null>(null);

  const calculatePercentages = (orders: Order[]) => {
    const totalQuantity = orders.reduce((total, order) => new Decimal(total).add(order.quantity).toNumber(), 0);

    return orders.map((order) => ({
      ...order,
      percentage: new Decimal(order.quantity).div(totalQuantity).mul(100).times(10),
    }));
  };

  const initializeOrderBook = (data: any) => {
    const bids = data.bids.map(([price, quantity]: [string, string]) => ({ price, quantity }));
    const asks = data.asks.map(([price, quantity]: [string, string]) => ({ price, quantity }));

    setOrderBook({
      bids: calculatePercentages(bids),
      asks: calculatePercentages(asks),
    });

    if (bids.length > 0 && asks.length > 0) {
      const highestBid = parseFloat(bids[0].price);
      const lowestAsk = new Decimal(asks[0].price);
      const midPriceCalc = new Decimal(highestBid).add(lowestAsk).div(2);

      setMidPrice(midPriceCalc);
      setMidPriceType(midPriceCalc.sub(highestBid).lessThan(lowestAsk.sub(midPriceCalc)) ? 'bid' : 'ask');
    }
  };

  const updateOrderBook = useCallback((prevOrders: Order[], updates: [string, string][], type: 'bids' | 'asks') => {
    const orders = [...prevOrders];
    updates.forEach(([price, quantity]) => {
      const index = orders.findIndex((order) => order.price === price);
      if (parseFloat(quantity) === 0) {
        if (index >= 0) orders.splice(index, 1);
      } else {
        if (index >= 0) {
          orders[index].quantity = quantity;
        } else {
          orders.push({ price, quantity });
        }
      }
    });

    orders.sort((a, b) =>
      type === 'bids' ? parseFloat(b.price) - parseFloat(a.price) : parseFloat(a.price) - parseFloat(b.price)
    );

    return calculatePercentages(orders).slice(0, LEVELS);
  }, []);

  const connectWebSocket = useCallback(() => {
    const ws = new WebSocket(`${BASE_URL_SOCKET}/ws/${SYMBOL.toLowerCase()}@depth`);

    ws.onmessage = (event) => {
      const { b, a } = JSON.parse(event.data);
      setOrderBook((prevOrderBook) => ({
        bids: updateOrderBook(prevOrderBook.bids, b, 'bids'),
        asks: updateOrderBook(prevOrderBook.asks, a, 'asks'),
      }));

      if (a.length > 0 && b.length > 0) {
        const highestBid = parseFloat(b[0][0]);
        const lowestAsk = new Decimal(parseFloat(a[0][0]));
        const midPriceCalc = new Decimal(highestBid).add(lowestAsk).div(2);

        setMidPrice(midPriceCalc);
        setMidPriceType(midPriceCalc.sub(highestBid).lessThanOrEqualTo(lowestAsk.sub(midPriceCalc)) ? 'bid' : 'ask');
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      ws.close();
    };

    wsRef.current = ws;
  }, [SYMBOL, updateOrderBook]);

  useEffect(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [SYMBOL, connectWebSocket]);

  useEffect(() => {
    if (initialBookData) initializeOrderBook(initialBookData);
  }, [initialBookData]);

  return {
    symbol: SYMBOL.replace('USDT', ''),
    isLoading,
    orderBook,
    midPrice,
    midPriceType,
  };
};
