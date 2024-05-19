export function BookRoot() {
  const book = Array.from({ length: 10 });

  function calculatePercentageBar({ total }: { total: number }) {
    console.log(total);
    const percentage = Math.random() * 100;
    return `${percentage}%`;
  }

  return (
    <div className="max-w-lg min-w-sm flex-1 bg-zinc-900 rounded-lg text-sm shadow-md border border-zinc-800">
      <div className="flex text-zinc-400 gap-3 px-4 pt-4">
        <span className="flex-1 overflow-hidden text-ellipsis text-left">
          Preço(USDT)
        </span>
        <span className="flex-1 overflow-hidden text-ellipsis text-right">
          Quantia(1000SAT)
        </span>
        <span className="flex-1 overflow-hidden text-ellipsis text-right">
          Total
        </span>
      </div>
      <div className="pb-4 flex flex-col">
        <div className="mt-2 flex flex-col">
          {book.map((_, index) => {
            const percentageBar = calculatePercentageBar({ total: index });

            return (
              <div
                key={index}
                className="flex flex-row relative flex-1 overflow-hidden cursor-pointer hover:bg-zinc-800"
              >
                <div className="order-row flex gap-3 px-4 flex-1 z-10">
                  <span className="text-[#F64670] text-left flex-1">
                    0.0002955
                  </span>
                  <span className="text-right flex-1">126,417</span>
                  <span className="text-right flex-1">37.356</span>
                </div>
                <div
                  className={`bg-[#F64670] opacity-20 right-0 absolute z-0 h-full`}
                  style={{ width: percentageBar }}
                />
              </div>
            );
          })}
        </div>

        <span className="flex-1 w-full text-left pl-4 my-4 text-lg">
          0.0002930
        </span>

        <div className="flex flex-col">
          {book.map((_, index) => {
            const percentageBar = calculatePercentageBar({ total: index });

            return (
              <div
                key={index}
                className="flex flex-row relative flex-1 overflow-hidden cursor-pointer hover:bg-zinc-800"
              >
                <div className="order-row flex gap-3 px-4 flex-1 z-10">
                  <span className="text-[#0ECB81] text-left flex-1">
                    0.0002955
                  </span>
                  <span className="text-right flex-1">126,417</span>
                  <span className="text-right flex-1">37.356</span>
                </div>
                <div
                  className={`bg-[#0ECB81] opacity-20 right-0 absolute z-0 h-full`}
                  style={{ width: percentageBar }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
