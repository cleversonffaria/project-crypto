import { Book } from 'src/components/Book';
import { Chart } from 'src/components/Chart';
import { Table } from 'src/components/Table';
import { Footer } from 'src/layout/Footer';
import { Header } from 'src/layout/Header';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="flex flex-col mb-5 gap-2  max-w-[1500px] 2xl:mx-auto mx-5">
        <Table.Root />

        <div className="flex flex-col-reverse sm:flex-row flex-1 gap-2">
          <Chart.Component />
          <Book.Root />
        </div>
      </section>

      <Footer />
    </main>
  );
}
