import { BookOrdersProps } from './book.types';
import { COLOR_ORDER } from './book.utils';

export const BookOrders = ({ color }: BookOrdersProps) => {
  const listBook = [
    { price: 0.0002955, amount: 126417, total: 37.356 },
    { price: 0.0002954, amount: 126417, total: 37.356 },
    { price: 0.0002953, amount: 126417, total: 37.356 },
    { price: 0.0002952, amount: 126417, total: 37.356 },
    { price: 0.0002951, amount: 126417, total: 37.356 },
    { price: 0.000295, amount: 126417, total: 37.356 },
    { price: 0.0002949, amount: 126417, total: 37.356 },
    { price: 0.0002948, amount: 126417, total: 37.356 },
    { price: 0.0002947, amount: 126417, total: 37.356 },
    { price: 0.0002946, amount: 126417, total: 37.356 },
  ];

  function calculatePercentageBar({ total }: { total: number }) {
    const percentage = Math.random() * 100;
    return `${percentage}%`;
  }

  return (
    <div className="mt-2 flex flex-col">
      {listBook.map((book, index) => {
        const percentageBar = calculatePercentageBar({ total: index });

        return (
          <div
            key={index}
            className="flex flex-row relative flex-1 overflow-hidden cursor-pointer hover:bg-zinc-800"
          >
            <div className="order-row flex gap-3 px-4 flex-1 z-10">
              <span className={`text-[${COLOR_ORDER[color]}] text-left flex-1`}>
                {book.price}
              </span>
              <span className="text-right flex-1">{book.total}</span>
              <span className="text-right flex-1">{book.amount}</span>
            </div>
            <div
              className={`bg-[${COLOR_ORDER[color]}] opacity-20 right-0 absolute z-0 h-full`}
              style={{ width: percentageBar }}
            />
          </div>
        );
      })}
    </div>
  );
};
