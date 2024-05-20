import { useCallback, useEffect, useRef } from 'react';
import { createChart, CrosshairMode, IChartApi, ISeriesApi, CandlestickData } from 'lightweight-charts';

import { colors } from './chart.utils';
import { useGetKlinesQuery } from 'src/service/api.binance';
import { BASE_URL_SOCKET } from 'src/constants/url';
import { useAppSelector } from 'src/hooks/useRedux';
import { timeToTz } from 'src/utils/helpers';

export const useChart = () => {
  const SYMBOL = useAppSelector((state) => state.crypto.symbol);

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const { data: listDataKlines, isLoading } = useGetKlinesQuery({ symbol: SYMBOL, interval: '1m' });

  const handleChart = useCallback(() => {
    if (!chartContainerRef.current) return;

    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
      candleSeriesRef.current = null;
    }

    if (!chartRef.current) {
      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { color: colors.background },
          textColor: colors.text,
        },
        rightPriceScale: {
          borderColor: colors.neutral,
          scaleMargins: { top: 0.3, bottom: 0.25 },
          entireTextOnly: true,
        },
        grid: {
          vertLines: { color: colors.neutral },
          horzLines: { color: colors.neutral },
        },
        crosshair: { mode: CrosshairMode.Normal },
        timeScale: {
          borderColor: colors.neutral,
          timeVisible: true,
          secondsVisible: false,
        },
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
          time: timeToTz({ originalTime: String(time), timeZone: 'UTC' }),
          open: parseFloat(String(open)),
          high: parseFloat(String(high)),
          low: parseFloat(String(low)),
          close: parseFloat(String(close)),
        };
      }) || [];

    if (candleSeriesRef.current) {
      candleSeriesRef.current.setData(klinesData);
      const latestData = klinesData[klinesData.length - 1];
      if (latestData) {
        chartRef.current.timeScale().scrollToPosition(0, true);
      }
    }
  }, [SYMBOL, listDataKlines]);

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
  }, [SYMBOL, handleChart, handleResize]);

  const connectWebSocket = () => {
    const ws = new WebSocket(`${BASE_URL_SOCKET}/ws/${SYMBOL.toLowerCase()}@kline_1m`);

    ws.onmessage = (event: MessageEvent) => {
      const lastJsonMessage = JSON.parse(event.data);

      const klinesData: CandlestickData<any> = {
        time: timeToTz({ originalTime: String(lastJsonMessage.k.t), timeZone: 'UTC' }),
        open: parseFloat(String(lastJsonMessage.k.o)),
        high: parseFloat(String(lastJsonMessage.k.h)),
        low: parseFloat(String(lastJsonMessage.k.l)),
        close: parseFloat(String(lastJsonMessage.k.c)),
      };

      if (candleSeriesRef.current) candleSeriesRef.current.update(klinesData);
    };

    ws.onerror = (error: Event) => {
      console.error('WebSocket error:', error);
      ws.close();
    };

    wsRef.current = ws;
  };

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
  }, [SYMBOL]);

  return { isLoading, chartContainerRef };
};
