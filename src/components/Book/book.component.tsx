import Decimal from 'decimal.js-light';

import ArrowUp from 'src/assets/icons/arrow-up.svg?react';
import ArrowDown from 'src/assets/icons/arrow-down.svg?react';

import { useBook } from './book.hook';
import { Book } from './index';
import { COLOR_ORDER } from './book.utils';

export function BookComponent() {
  const { midPrice, midPriceType, orderBook } = useBook();

  return (
    <div className="min-w-sm sm:max-w-md flex-1 bg-zinc-900 rounded-lg text-sm shadow-md border border-zinc-800">
      <Book.Header symbol="BTC" />

      <div className="pb-4 flex flex-col">
        <Book.Orders orders={orderBook.asks} type="asks" />

        <span className="flex items-center flex-1 w-full text-left pl-4 my-4 text-lg font-bold ">
          <div className={`${midPriceType === 'bid' ? 'text-green-400' : 'text-red-400'}`}>
            {midPrice.toDecimalPlaces(2, Decimal.ROUND_DOWN).toNumber().toFixed(2)}
          </div>

          <div className="text-sm">
            {midPriceType === 'bid' ? (
              <ArrowUp width={18} color={COLOR_ORDER['bids']} />
            ) : (
              <ArrowDown width={18} color={COLOR_ORDER['asks']} />
            )}
          </div>
        </span>

        <Book.Orders orders={orderBook.bids} type="bids" />
      </div>
    </div>
  );
}
