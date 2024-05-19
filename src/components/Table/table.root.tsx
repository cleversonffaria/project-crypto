export const TableRoot: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="overflow-x-auto whitespace-nowrap rounded-lg border border-zinc-800 bg-zinc-900 shadow-md">
      <table className="w-full text-left text-sm text-gray-200 rtl:text-right">
        {children}
      </table>
    </div>
  );
};
