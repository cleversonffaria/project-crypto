import ViteLogo from "src/assets/react.svg?react";
import { Book } from "src/components/Book";
import { Chart } from "src/components/Chart";
import { Table } from "src/components/Table";

function App() {
  return (
    <section className="flex flex-col min-h-screen mx-5 my-5">
      <ViteLogo />

      <Table.Root />

      <div className="flex flex-1 gap-2">
        <Chart.Root />

        <Book.Root />
      </div>
    </section>
  );
}

export default App;
