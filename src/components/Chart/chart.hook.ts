import { useCallback, useEffect, useRef } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';

import { colors, priceData } from './chart.utils';

export const useChart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);

  const handleChart = useCallback(() => {
    if (!chartContainerRef.current) return;

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

    candleSeries.setData(priceData);
    chartRef.current = chart;
  }, [chartContainerRef]);

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
  }, []);

  return { chartContainerRef };
};
