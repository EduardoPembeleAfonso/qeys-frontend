"use client";
import Image from "next/image";
import { useAuth } from "../contexts/ContextProvider";
import { qeysLogo } from "../assets/images";
import { CalendarDaysIcon, InfoIcon, LayoutGrid, LogOutIcon, MapIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface AsideProps {
  isOpen: boolean;
  onMenuToggle: () => void;
}

export default function Aside({ isOpen, onMenuToggle }: AsideProps) {
  const { onLogout } = useAuth();
  const pathname = usePathname();
  const newPathname = pathname.replace("/", "").toString();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowButton((prev) => !prev);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <aside className={`fixed z-30 bg-primaryColor px-6 py-11 shadow-md transform transition-transform ${isOpen ? "translate-x-0 w-[40%] bg-opacity-80" : "-translate-x-full"
      } lg:translate-x-0 lg:w-[106px]`}>
      <div className={`w-[50px] h-[50px] ${ newPathname === "home" && "lg:mt-[0px]" }`}>
        <div className="hidden lg:block w-full h-full">
          <Image
            src={qeysLogo}
            alt="Logo"
            className="w-full h-full rounded-full"
          />
        </div>
        <div className="block lg:hidden w-full h-full">
          {showButton ? (
            <div
              className={`w-full h-full inset-0 flex items-center justify-center transition-all duration-500 ease-linear transform ${showButton ? "opacity-100 scale-100" : "opacity-0 scale-90"
                } bg-secondaryColor rounded-full`}
            >
              <button onClick={onMenuToggle} className="text-lg text-primaryColor hover:text-[#CBC5C5] font-MontserratSemiBold font-semibold">
                X
              </button>
            </div>
          ) : (
            <div
              className={` inset-0 w-full h-full flex items-center justify-center transition-all duration-500 ease-linear transform ${showButton ? "opacity-0 scale-90" : "opacity-100 scale-100"
                }`}
            >
              <Image
                src={qeysLogo}
                alt="Propriedade"
                className="w-full h-full rounded-full"
              />
            </div>
          )}
        </div>
      </div>
      <nav className="mt-[50px] mb-8 lg:mb-0 h-auto lg:mt-[70px] lg:h-[226px] flex flex-col gap-5 items-start lg:items-center">
        <Link href={"/home"} className={`transition duration-700 ease-in-out lg:w-[50px] lg:px-0 px-2 w-full h-[50px] rounded-lg flex items-center justify-around lg:justify-center ${newPathname === "home" ? "bg-secondaryColor" : "bg-transparent"}`}>
          <LayoutGrid color={`${ newPathname === "home" ? "#38BDF8" : "#ffffff" }`} className="w-[28px] h-[28px] lg:w-[34px] lg:h-[34px]" />
          <span className="text-secondaryColor text-base font-normal font-Montserrat block lg:hidden">Início</span>
        </Link>
        <Link href={"/map"} className={`transition duration-700 ease-in-out lg:w-[50px] lg:px-0 px-2 w-full h-[50px] rounded-lg hidden lg:flex items-center justify-around lg:justify-center ${newPathname === "map" ? "bg-secondaryColor" : "bg-transparent"}`}>
          <MapIcon color={`${ newPathname === "map" ? "#38BDF8" : "#ffffff" }`} className="w-[28px] h-[28px] lg:w-[34px] lg:h-[34px]" />
          <span className="text-secondaryColor text-base font-normal font-Montserrat block lg:hidden">Mapa</span>
        </Link>
        <Link href={"/scheduling"} className={`transition duration-700 ease-in-out mt-2 lg:mt-0 lg:w-[50px] lg:px-0 px-2 w-full h-[50px] rounded-lg flex items-center justify-around lg:justify-center ${newPathname === "scheduling" ? "bg-secondaryColor" : "bg-transparent"}`}>
          <CalendarDaysIcon color={`${ newPathname === "scheduling" ? "#38BDF8" : "#ffffff" }`} className="w-[28px] h-[28px] lg:w-[34px] lg:h-[34px]" />
          <span className="text-secondaryColor text-base font-normal font-Montserrat block lg:hidden">Agenda</span>
        </Link>
      </nav>
      <div className="h-[1px] lg:w-[50px] w-[100px] border-0 lg:mb-8 mb-5 bg-[#CBC5C5]"></div>
      <Link href={"/"} className={`lg:w-[50px] lg:px-0 px-2 w-full h-[50px] rounded-lg flex items-center justify-around lg:justify-center ${newPathname === "profile" ? "bg-white" : "bg-transparent"}`}>
        <InfoIcon color="#CBC5C5" className="w-[28px] h-[28px] lg:w-[34px] lg:h-[34px]" />
        <span className="text-secondaryColor text-base font-normal font-Montserrat block lg:hidden">Perfil</span>
      </Link>
      <div className="h-[1px] lg:w-[50px] w-[100px] border-0 lg:my-8 my-8 bg-[#CBC5C5]"></div>
      <button onClick={onLogout} className="lg:mt-8 mt-8 w-[50px] h-[50px] flex items-center justify-center text-white border border-white rounded-lg">
        <LogOutIcon color="#ffffff" className="w-[30px] h-[30px]" />
      </button>
    </aside>
  );
}
