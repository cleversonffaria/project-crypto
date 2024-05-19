import { Book } from 'src/components/Book';
import { Chart } from 'src/components/Chart';
import { Table } from 'src/components/Table';
import { Footer } from 'src/layout/Footer';
import { Header } from 'src/layout/Header';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between">
      <Header />

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
