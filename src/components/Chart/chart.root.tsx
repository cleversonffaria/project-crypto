import { useEffect, useRef } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { priceData } from "./chart.utils";

export function ChartRoot() {
  const chartContainerRef = useRef(null);

  const handleChart = () => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: {
          color: "#18181b",
        },
        textColor: "#ffffffe5",
      },
      grid: {
        vertLines: {
          color: "#27272a",
        },
        horzLines: {
          color: "#27272a",
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      timeScale: {
        borderColor: "#27272a",
      },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: "#0CCB81",
      downColor: "#F64670",
      borderDownColor: "#F64670",
      borderUpColor: "#0CCB81",
      wickDownColor: "#F64670",
      wickUpColor: "#0CCB81",
    });

    candleSeries.setData(priceData);
  };

  useEffect(() => {
    handleChart();
  }, []);

  return (
    <div className="flex flex-1 justify-center overflow-hidden border border-zinc-800 rounded-lg">
      <div ref={chartContainerRef} className="flex-1 rounded-sm" />
    </div>
  );
}
