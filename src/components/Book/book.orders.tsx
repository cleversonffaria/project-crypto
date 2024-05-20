import Decimal from 'decimal.js-light';
import { OrderBookProps } from './book.types';
import { COLOR_ORDER } from './book.utils';
import { formatPriceQuantity } from 'src/utils/helpers';

export const BookOrders = ({ orders, type }: OrderBookProps) => {
  return (
    <div className={`mt-2 flex ${type.match('asks') ? 'flex-col-reverse' : 'flex-col'}`}>
      {orders.map((book, index) => {
        const amount = new Decimal(book.price).mul(book.quantity).toNumber();
        const price = formatPriceQuantity(book.price);

        const quantity = new Decimal(book.quantity).toDecimalPlaces(5, Decimal.ROUND_DOWN).toFixed(5);

        return (
          <div key={index} className="flex flex-row relative flex-1 overflow-hidden cursor-pointer hover:bg-zinc-800">
            <div className="order-row flex gap-3 px-4 flex-1 z-10">
              <span className="text-left flex-1" style={{ color: COLOR_ORDER[type] }}>
                {price}
              </span>
              <span className="text-right flex-1">{quantity}</span>
              <span className="text-right flex-1">
                {new Intl.NumberFormat('en-US', { style: 'decimal', currency: 'USD' }).format(amount)}
              </span>
            </div>

            <div
              className={`opacity-20 right-0 absolute z-0 h-full`}
              style={{
                background: COLOR_ORDER[type],
                width: `${book.percentage?.toNumber()}%`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
