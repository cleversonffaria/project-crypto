import { useState } from 'react';
import ArrowsSort from 'src/assets/icons/arrows-sort.svg?react';

import { useAppDispatch } from 'src/hooks/useRedux';
import { updateSort } from 'src/store/slices/slice.crypto';

export const TableHeader = () => {
  const [sortType, setSortType] = useState<'asc' | 'desc'>('asc');

  const headerColumns = [
    { name: 'Nome', value: 'name', sort: true },
    { name: 'Preço', value: 'price', sort: true },
    { name: 'Mudança', value: 'percentage', sort: true },
  ];

  const dispatch = useAppDispatch();

  const handleSort = ({ value, sort }: { name: string; value: string; sort: boolean }) => {
    if (!sort) return;
    dispatch(updateSort({ type: sortType, value }));
    setSortType(sortType === 'asc' ? 'desc' : 'asc');
  };

  return (
    <thead className="select-none text-xs uppercase text-gray-400">
      <tr>
        {headerColumns.map((column) => (
          <th key={column.name} scope="col" className="px-6 py-3 group" onClick={() => handleSort(column)}>
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
