import ViteLogo from "src/assets/react.svg?react";
import { Book } from "src/components/Book";
import { Chart } from "src/components/Chart";
import { Table } from "src/components/Table";

function App() {
  return (
    <>
      <ViteLogo />

      <Table.Root />

      <div className="flex">
        <Chart.Root />
        <Book.Root />
      </div>
    </>
  );
}

export default App;
