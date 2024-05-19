import ArrowsSort from 'src/assets/icons/arrows-sort.svg?react';
import IconBtc from 'src/assets/icons/btc.png';
import IconDoge from 'src/assets/icons/doge.png';
import IconEth from 'src/assets/icons/eth.png';
import IconSol from 'src/assets/icons/sol.png';

export function TableRoot() {
  return (
    <div className="overflow-x-auto whitespace-nowrap rounded-lg border border-zinc-800 bg-zinc-900 shadow-md">
      <table className="w-full text-left text-sm text-gray-200 rtl:text-right">
        <thead className="select-none text-xs uppercase text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              <a href="#">
                <div className="flex items-center gap-1">
                  <span>Nome</span>
                  <ArrowsSort width={13} />
                </div>
              </a>
            </th>
            <th scope="col" className="px-6 py-3">
              <a href="#">
                <div className="flex items-center justify-end gap-1">
                  <span>Preço</span>
                  <ArrowsSort width={13} />
                </div>
              </a>
            </th>
            <th scope="col" className="px-6 py-3">
              <a href="#">
                <div className="flex items-center justify-end gap-1">
                  <span>Mudança</span>
                  <ArrowsSort width={13} />
                </div>
              </a>
            </th>
            <th scope="col" className="px-6 py-3">
              <a href="#">
                <div className="flex items-center justify-end gap-1">
                  <span>Volume 24h</span>
                  <ArrowsSort width={13} />
                </div>
              </a>
            </th>
            <th scope="col" className="px-6 py-3">
              <a href="#">
                <div className="flex items-center justify-end gap-1">
                  <span>Capitalização de mercado</span>
                  <ArrowsSort width={13} />
                </div>
              </a>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="cursor-pointer border-b border-neutral-800 last:border-none hover:bg-zinc-800">
            <th
              scope="row"
              className="flex items-center gap-2 whitespace-nowrap px-6 py-4 font-medium"
            >
              <img
                src={IconBtc}
                className="w-7 rounded-full"
                alt="Ícone do bitcoin"
              />
              <span>BTC</span>
              <span className="text-gray-400">Bitcoin</span>
            </th>
            <td className="px-6 py-4 text-right">$66,931.25</td>
            <td className="px-6 py-4 text-right">+0.40%</td>
            <td className="px-6 py-4 text-right">$16,85B</td>
            <td className="px-6 py-4 text-right">
              <a href="#" className="font-medium hover:underline">
                $1.318,63B
              </a>
            </td>
          </tr>
          <tr className="cursor-pointer border-b border-neutral-800 last:border-none hover:bg-zinc-800">
            <th
              scope="row"
              className="flex items-center gap-2 whitespace-nowrap px-6 py-4 font-medium"
            >
              <img
                src={IconEth}
                className="w-7 rounded-full"
                alt="Ícone do bitcoin"
              />
              <span>ETH</span>
              <span className="text-gray-400">Ethereum</span>
            </th>
            <td className="px-6 py-4 text-right">$66,931.25</td>
            <td className="px-6 py-4 text-right">+0.40%</td>
            <td className="px-6 py-4 text-right">$16,85B</td>
            <td className="px-6 py-4 text-right">
              <a href="#" className="font-medium hover:underline">
                $1.318,63B
              </a>
            </td>
          </tr>
          <tr className="cursor-pointer border-b border-neutral-800 last:border-none hover:bg-zinc-800">
            <th
              scope="row"
              className="flex items-center gap-2 whitespace-nowrap px-6 py-4 font-medium"
            >
              <img
                src={IconSol}
                className="w-7 rounded-full"
                alt="Ícone do bitcoin"
              />
              <span>SOL</span>
              <span className="text-gray-400">Solana</span>
            </th>
            <td className="px-6 py-4 text-right">$66,931.25</td>
            <td className="px-6 py-4 text-right">+0.40%</td>
            <td className="px-6 py-4 text-right">$16,85B</td>
            <td className="px-6 py-4 text-right">
              <a href="#" className="font-medium hover:underline">
                $1.318,63B
              </a>
            </td>
          </tr>
          <tr className="cursor-pointer border-b border-neutral-800 last:border-none hover:bg-zinc-800">
            <th
              scope="row"
              className="flex items-center gap-2 whitespace-nowrap px-6 py-4 font-medium"
            >
              <img
                src={IconDoge}
                className="w-7 rounded-full"
                alt="Ícone do bitcoin"
              />
              <span>DOGE</span>
              <span className="text-gray-400">Dogecoin</span>
            </th>
            <td className="px-6 py-4 text-right">$66,931.25</td>
            <td className="px-6 py-4 text-right">+0.40%</td>
            <td className="px-6 py-4 text-right">$16,85B</td>
            <td className="px-6 py-4 text-right">
              <a href="#" className="font-medium hover:underline">
                $1.318,63B
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
