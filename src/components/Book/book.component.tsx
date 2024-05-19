import { Book } from './index';

export function BookComponent() {
  return (
    <div className="min-w-sm sm:max-w-md flex-1 bg-zinc-900 rounded-lg text-sm shadow-md border border-zinc-800">
      <Book.Header symbol="BTC"/>

      <div className="pb-4 flex flex-col">
        <Book.Orders color="sell" />

        <span className="flex-1 w-full text-left pl-4 my-4 text-lg">
          0.0002930
        </span>

        <Book.Orders color="buy" />
      </div>
    </div>
  );
}
