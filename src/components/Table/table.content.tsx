import IconBtc from 'src/assets/icons/btc.png';
import IconDoge from 'src/assets/icons/doge.png';
import IconEth from 'src/assets/icons/eth.png';
import IconSol from 'src/assets/icons/sol.png';

import { ListCripto } from './table.types';

export const TableContent = () => {
  const listCripto: ListCripto[] = [
    {
      id: 1,
      img: IconBtc,
      name: 'Bitcoin',
      symbol: 'BTC',
      price: '$66,931.25',
      percent: '+0.40%',
      marketCap: '$1.318,63B',
      volume: '$16,85B',
    },
    {
      id: 2,
      img: IconEth,
      name: 'Ethereum',
      symbol: 'ETH',
      price: '$66,931.25',
      percent: '+0.40%',
      marketCap: '$1.318,63B',
      volume: '$16,85B',
    },
    {
      id: 3,
      img: IconSol,
      name: 'Solana',
      symbol: 'SOL',
      price: '$66,931.25',
      percent: '+0.40%',
      marketCap: '$1.318,63B',
      volume: '$16,85B',
    },
    {
      id: 4,
      img: IconDoge,
      name: 'Dogecoin',
      symbol: 'DOGE',
      price: '$66,931.25',
      percent: '+0.40%',
      marketCap: '$1.318,63B',
      volume: '$16,85B',
    },
  ];

  const handleCripto = (item: ListCripto) => {
    console.log(item);
  };

  return (
    <tbody>
      {listCripto.map((item) => (
        <tr
          key={item.id}
          className="cursor-pointer border-b border-neutral-800 last:border-none hover:bg-zinc-800"
          onClick={() => handleCripto(item)}
        >
          <th
            scope="row"
            className="flex items-center gap-2 whitespace-nowrap px-6 py-4 font-medium"
          >
            <img
              src={item.img}
              className="w-7 rounded-full"
              alt={`Ícone da cripto moeda ${item.name}`}
            />
            <span>{item.symbol}</span>
            <span className="text-gray-400">{item.name}</span>
          </th>
          <td className="px-6 py-4 text-right">{item.price}</td>
          <td className="px-6 py-4 text-right">{item.percent}</td>
          <td className="px-6 py-4 text-right">{item.volume}</td>
          <td className="px-6 py-4 text-right">{item.marketCap}</td>
        </tr>
      ))}
    </tbody>
  );
};
