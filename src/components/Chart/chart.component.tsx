import { useEffect, useRef } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { priceData } from "./chart.utils";

export function ChartComponent() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);

  const handleChart = () => {
    if (!chartContainerRef.current) return;

    const colors = {
      background: "#18181b",
      text: "#ffffffe5",
      neutral: "#27272a",
      green: "#0CCB81",
      red: "#F64670",
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: colors.background },
        textColor: colors.text,
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
  };

  useEffect(() => {
    handleChart();

    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        const width = chartContainerRef.current.clientWidth;
        const height = chartContainerRef.current.clientHeight;
        chartRef.current.resize(width, height);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (chartContainerRef.current) resizeObserver.observe(document.body);

    window.addEventListener("resize", handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={chartContainerRef}
      className="flex flex-1 justify-center overflow-hidden border border-zinc-800 rounded-lg"
    />
  );
}
