import Logo from 'src/assets/logo.png';
import { useAppSelector } from 'src/hooks/useRedux';

export function Header() {
  const SYMBOL = useAppSelector((state) => state.crypto.symbol);

  return (
    <div className="flex items-center py-2 mb-3 bg-zinc-900 border-b-2 border-zinc-800">
      <div className="flex items-center justify-between w-full max-w-[1500px] 2xl:mx-auto px-6">
        <div className="flex items-center">
          <img src={Logo} alt="Logotipo do site" width={50} />

          <h1 className="bg-gradient-to-r from-indigo-300 to-teal-300 bg-clip-text text-lg font-bold text-transparent">
            Project Crypto
          </h1>
        </div>

        <span className="bg-gradient-to-r from-indigo-300 to-teal-300 bg-clip-text text-lg font-bold text-transparent">
          {SYMBOL}
        </span>
      </div>
    </div>
  );
}
