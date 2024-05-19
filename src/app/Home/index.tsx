import { Book } from 'src/components/Book';
import { Chart } from 'src/components/Chart';
import { Table } from 'src/components/Table';
import { Footer } from 'src/layout/Footer';
import { Header } from 'src/layout/Header';

import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux';
import { updatePrice } from 'src/store/slices/slice.cripto';

export default function Home() {
  const prices = useAppSelector(({ crypto }) => crypto.prices);
  const dispatch = useAppDispatch();

  console.log(prices);

  const handleClick = () => {
    dispatch(updatePrice({ symbol: 'BTC', lastPrice: 1000, percentChange: 0.1 }));
  };

  return (
    <main className="min-h-screen flex flex-col justify-between">
      <Header />

      <button onClick={handleClick}>Update BTC</button>

      <section className="flex flex-1 flex-col mb-5 gap-2 w-full max-w-[1500px] 2xl:mx-auto px-4">
        <Table.Root>
          <Table.Header />
          <Table.Content />
        </Table.Root>

        <div className="flex flex-col-reverse sm:flex-row flex-1 gap-2">
          <Chart.Component />
          <Book.Component />
        </div>
      </section>

      <Footer />
    </main>
  );
}
