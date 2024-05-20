import { useChart } from './chart.hook';

export function ChartComponent() {
  const { isLoading, chartContainerRef } = useChart();

  if (isLoading)
    return (
      <div className="flex flex-1 items-center min-h-80 justify-center overflow-hidden border border-zinc-800 rounded-lg">
        <div className="border-zinc-800 h-10 w-10 animate-spin rounded-full border-8 border-t-teal-500" />
      </div>
    );

  return (
    <div
      ref={chartContainerRef}
      className="flex flex-1 min-h-80 justify-center overflow-hidden border border-zinc-800 rounded-lg"
    />
  );
}
