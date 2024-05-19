import ArrowsSort from 'src/assets/icons/arrows-sort.svg?react';

export const TableHeader = () => {
  const headerColumns = [
    { name: 'Nome', sort: false },
    { name: 'Preço', sort: true },
    { name: 'Mudança', sort: true },
    { name: 'Volume 24h', sort: true },
    { name: 'Capitalização de mercado', sort: true },
  ];

  return (
    <thead className="select-none text-xs uppercase text-gray-400">
      <tr>
        {headerColumns.map((column) => (
          <th key={column.name} scope="col" className="px-6 py-3 group">
            <div className="flex items-center justify-end gap-1 group-first:justify-start cursor-pointer">
              <span>{column.name}</span>
              {column.sort && <ArrowsSort width={13} />}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};
