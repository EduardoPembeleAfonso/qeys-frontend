import { SearchIcon } from "lucide-react";
import { useAuth } from "../contexts/ContextProvider";
import Avatar from "./avatar";
import { Dispatch, SetStateAction } from "react";
import { Menu } from "lucide-react";

interface HeaderProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  onMenuToggle: () => void;
}

export default function Header({ search, setSearch, onMenuToggle }: HeaderProps) {
  const { authState } = useAuth();
  const admin = authState?.author;

  return (
    <header className="relative bg-primaryColor w-full h-20 lg:px-10 px-5 py-6 flex lg:justify-between items-center gap-5 md:gap-16 lg:gap-0 rounded-xl">
      <button
        className="lg:hidden text-white p-2"
        onClick={onMenuToggle}
      >
        <Menu size={28} />
      </button>

      <div className="flex items-center w-56 md:w-[372px] h-[50px] bg-secondaryColor gap-[5px] rounded-lg">
        <SearchIcon color="#D9D9D9" className="w-[24px] h-[24px] ml-5" />
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Pesquisar residencias"
          value={search}
          className="w-full h-full rounded-lg outline-none text-lg text-black px-5 font-normal font-Montserrat placeholder-[#D9D9D9]"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="lg:flex gap-16 items-center hidden">
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-end h-[40px]">
            <span className="text-secondaryColor text-xl font-bold font-MontserratBold">
              {admin?.name}
            </span>
            <span className="mt-[-8px] text-secondaryColor text-base font-normal font-Montserrat">
              {admin?.email}
            </span>
          </div>
          <div className="border border-[#D9D9D9] rounded-full">
            <Avatar
              fallback={admin?.name ?? ""}
              image={admin?.image}
              height="46px"
              width="46px"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
