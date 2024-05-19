export const BookHeader = ({ symbol }: { symbol: string }) => {
  return (
    <div className="flex text-zinc-400 gap-3 px-4 pt-4">
      <span className="flex-1 overflow-hidden text-ellipsis text-left">
        Preço(USDT)
      </span>
      <span className="flex-1 overflow-hidden text-ellipsis text-right">
        Quantia({symbol})
      </span>
      <span className="flex-1 overflow-hidden text-ellipsis text-right">
        Total
      </span>
    </div>
  );
};
