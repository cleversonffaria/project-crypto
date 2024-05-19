import ViteLogo from "src/assets/react.svg?react";
import { Book } from "src/components/Book";
import { Chart } from "src/components/Chart";
import { Table } from "src/components/Table";

function App() {
  return (
    <section className="flex flex-col gap-2 min-h-screen mx-5 my-5 max-w-[1500px] 2xl:mx-auto">
      <ViteLogo />

      <Table.Root />

      <div className="flex flex-col-reverse sm:flex-row flex-1 gap-2">
        <Chart.Component />
        <Book.Root />
      </div>
    </section>
  );
}

export default App;
