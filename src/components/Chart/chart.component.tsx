import { useChart } from './chart.hook';

export function ChartComponent() {
  const { chartContainerRef } = useChart();

  return (
    <div
      ref={chartContainerRef}
      className="flex flex-1 min-h-80 justify-center overflow-hidden border border-zinc-800 rounded-lg"
    />
  );
}
