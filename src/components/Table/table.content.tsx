import { IMAGE_CRYPTO, NAME_CRYPTO } from './table.utils';

import { useTableContent } from './table.header.hook';

export const TableContent = () => {
  const { sortCryptoData, cryptoSort, handleCrypto } = useTableContent();

  return (
    <tbody>
      {sortCryptoData[cryptoSort.value].map((item) => {
        const symbol = item.symbol.replace('USDT', '');
        const variation = +item.priceChangePercent.replace('%', '');
        const variationColor = variation < 0 ? 'text-red-400' : 'text-green-400';

        return (
          <tr
            key={item.symbol}
            className="cursor-pointer border-b border-neutral-800 last:border-none hover:bg-zinc-800"
            onClick={() => handleCrypto(item)}
          >
            <th scope="row" className="flex items-center gap-2 whitespace-nowrap px-6 py-4 font-medium">
              <img
                src={IMAGE_CRYPTO[symbol]}
                className="w-7 rounded-full"
                alt={`Ícone da cripto moeda ${NAME_CRYPTO[symbol]}`}
              />
              <span>{symbol}</span>
              <span className="text-gray-400">{NAME_CRYPTO[symbol]}</span>
            </th>
            <td className="px-6 py-4 text-right">{item.price}</td>
            <td className={`px-6 py-4 font-bold text-right ${variationColor}`}>{item.priceChangePercent}</td>
          </tr>
        );
      })}
    </tbody>
  );
};
