import Logo from 'src/assets/logo.png';

export function Header() {
  return (
    <div className="flex items-center justify-between py-2 mb-3 bg-zinc-900 border-b-2 border-zinc-800">
      <div className="flex items-center w-full max-w-[1500px] 2xl:mx-auto mx-5">
        <img src={Logo} alt="Logotipo do site" width={50} />

        <h1 className="bg-gradient-to-r from-indigo-300 to-teal-300 bg-clip-text text-lg font-bold text-transparent">
          Project Cripto
        </h1>
      </div>
    </div>
  );
}
