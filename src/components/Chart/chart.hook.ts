import { useCallback, useEffect, useRef } from 'react';
import { createChart, CrosshairMode, IChartApi, ISeriesApi, CandlestickData } from 'lightweight-charts';

import { colors } from './chart.utils';
import { useGetKlinesQuery } from 'src/service/api.binance';
import { BASE_URL_SOCKET } from 'src/constants/url';

export const useChart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectIntervalRef = useRef<number>(1000);

  const { data: listDataKlines, isLoading } = useGetKlinesQuery({ symbol: 'BTCUSDT', interval: '1m' });

  const handleChart = useCallback(() => {
    if (!chartContainerRef.current) return;

    if (!chartRef.current) {
      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { color: colors.background },
          textColor: colors.text,
        },
        rightPriceScale: {
          borderColor: colors.neutral,
        },
        grid: {
          vertLines: { color: colors.neutral },
          horzLines: { color: colors.neutral },
        },
        crosshair: { mode: CrosshairMode.Normal },
        timeScale: { borderColor: colors.neutral },
      });

      const candleSeries = chart.addCandlestickSeries({
        upColor: colors.green,
        downColor: colors.red,
        borderDownColor: colors.red,
        borderUpColor: colors.green,
        wickDownColor: colors.red,
        wickUpColor: colors.green,
      });

      candleSeriesRef.current = candleSeries;
      chartRef.current = chart;
    }

    const klinesData: CandlestickData<any>[] =
      listDataKlines?.map((kline) => {
        const [time, open, high, low, close] = kline;

        return {
          time: +time / 1000,
          open: parseFloat(String(open)),
          high: parseFloat(String(high)),
          low: parseFloat(String(low)),
          close: parseFloat(String(close)),
        };
      }) || [];

    if (candleSeriesRef.current) candleSeriesRef.current.setData(klinesData);
  }, [listDataKlines]);

  const handleResize = useCallback(() => {
    if (chartRef.current && chartContainerRef.current) {
      const width = chartContainerRef.current.clientWidth;
      const height = chartContainerRef.current.clientHeight;
      chartRef.current.resize(width, height);
    }
  }, []);

  useEffect(() => {
    handleChart();

    const resizeObserver = new ResizeObserver(handleResize);
    if (chartContainerRef.current) resizeObserver.observe(document.body);

    window.addEventListener('resize', handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [handleChart, handleResize]);

  const connectWebSocket = () => {
    const ws = new WebSocket(`${BASE_URL_SOCKET}/ws/btcusdt@kline_1m`);

    ws.onmessage = (event: MessageEvent) => {
      const lastJsonMessage = JSON.parse(event.data);

      const klinesData: CandlestickData<any> = {
        time: lastJsonMessage.k.t / 1000,
        open: parseFloat(String(lastJsonMessage.k.o)),
        high: parseFloat(String(lastJsonMessage.k.h)),
        low: parseFloat(String(lastJsonMessage.k.l)),
        close: parseFloat(String(lastJsonMessage.k.c)),
      };

      if (candleSeriesRef.current) candleSeriesRef.current.update(klinesData);
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
    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return { isLoading, chartContainerRef };
};
