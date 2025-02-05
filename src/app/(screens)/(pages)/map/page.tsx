"use client"
import { getProperties } from "@/http/properties/getProperties";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BathIcon, DoorOpenIcon, HomeIcon, MapPinIcon, SearchIcon } from "lucide-react";
import IProperties from "@/utils/interface/properties.interfaces";
import Aside from "@/app/components/AsideClient";
import PropertiesMapSkeletonLoader from "@/app/components/PropertiesMapSkeletonLoader";

import dynamic from "next/dynamic";

const DynamicMapComponent = dynamic(() => import("@/app/components/Map/Map"), {
  ssr: false,
});


export default function Page() {
  const [search, setSearch] = useState<string>("")
  const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<string>("51.505, -0.09");
  const [title, setTitle] = useState<string>("Qeys");
  const [showFeedBack, setShowFeedBack] = useState<boolean>(false);
  const [isForSale, setIsForSale] = useState<boolean>(false);
  const [propertiesFilter, setPropertiesFilter] = useState<IProperties[]>([])



  const { data, isLoading } = useQuery({
    queryKey: ["getPropertiesMap"],
    queryFn: getProperties,
    staleTime: 1000 * 60,
  });

  const onMenuToggle = () => {
    setIsAsideOpen(!isAsideOpen)
  }

  useEffect(() => {
    if (search.trim() === '') {
      setPropertiesFilter([])
      setShowFeedBack(false)
    } else {
      if (data) {
        const dataFilters = data?.filter((item) =>
          item.address.toLowerCase().includes(search.toLowerCase())
          || item.title.toLowerCase().includes(search.toLowerCase())
          || item.description.toLowerCase().includes(search.toLowerCase())
        )
        setPropertiesFilter(dataFilters)
        setShowFeedBack(true)
      }


    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  return (
    <div className="flex justify-between h-full w-full">
      <Aside isOpen={isAsideOpen} onMenuToggle={onMenuToggle} />
      <main className="flex items-start w-[95%] h-full pl-4">
        <section className="ml-20 fixed">
          <DynamicMapComponent coordinates={coordinates} title={title} />
        </section>
        <section className="bg-primaryColor bg-opacity-10 w-[50%] h-[950px] ml-[600px] flex flex-col items-start px-4">
          <div className="w-full flex items-center justify-between mt-5">
            <div className="flex items-center w-[56] h-[40px] bg-secondaryColor gap-[2px] rounded-lg">
              <SearchIcon color="#000000" className="w-[24px] h-[24px] ml-5" />
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Pesquisar residencias"
                value={search}
                className="w-full h-full rounded-lg outline-none text-lg text-black px-2 font-normal font-Montserrat placeholder-[#D9D9D9]"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="w-[200px] mt-1 lg:mt-0 h-full bg-secondaryColor rounded-[5px] border border-textColor flex items-center justify-between px-2 py-1">
              <button onClick={() => setIsForSale(false)} className={`w-[80px] h-[35px] rounded-[5px] ${!isForSale ? 'bg-textColor text-secondaryColor' : 'bg-secondaryColor text-textColor'} transition-all duration-300 text-base font-bold font-Inter`}>
                Aluguel
              </button>
              <button onClick={() => setIsForSale(true)} className={`w-[80px] h-[35px] rounded-[5px] ${isForSale ? 'bg-textColor text-secondaryColor' : 'bg-secondaryColor text-textColor'} transition-all duration-300 text-base font-bold font-Inter`}>
                Comprar
              </button>
            </div>
          </div>
          {showFeedBack ? (
            <div className="flex items-center mt-[10px] gap-2 w-full h-5 transition-all ease-in-out duration-300">
              <span className="text-base text-cardTextPrimaryColor font-bold font-Inter">{propertiesFilter.length}</span>
              <span className="text-base text-borderColor font-bold font-Inter">Resindencias encotradas </span>
            </div>
          ) : (
            <div className="flex items-center gap-5 w-full h-5">
            </div>
          )}
          <div className="mt-5 w-full rounded-lg grid grid-cols-2">
            {
              isLoading ? (
                [...Array(2)].map((_, index) => (
                  <PropertiesMapSkeletonLoader key={index} />
                ))
              ) :
                showFeedBack ? (
                  propertiesFilter?.filter((i: IProperties) => i.isForSale === isForSale).map((item: IProperties) => (
                    <div key={item.id} onClick={() => { setCoordinates(item.coordinates); setTitle(item.title) }}>
                      <div className="cursor-pointer bg-white flex flex-col items-center justify-center w-[268px] h-[320px] border border-borderColor rounded-[5px]">
                        <div className="w-[230px] h-[150px] rounded-[5px]">
                          <img
                            src={item.photo}
                            alt={item.title}
                            className="rounded-md w-full h-full"
                          />
                        </div>
                        <div className="flex items-center justify-between w-[230px] mt-[26px]">
                          <div className="flex items-center gap-1">
                            <MapPinIcon color="#0364cc" className="w-[14px] h-[14px]" />
                            <span className="text-cardTextSecondaryColor text-sm font-normal font-Montserrat">{item.address}</span>
                          </div>
                          <div>
                            <span className="text-textColor text-sm font-bold font-MontserratBold">{item.price}</span>
                            <span className="text-cardTextSecondaryColor text-sm font-normal font-Montserrat">/mês</span>
                          </div>
                        </div>
                        <h3 className="mt-[6px] w-[230px] text-textColor text-base font-semibold font-MontserratSemiBold">{item.title.toUpperCase()}</h3>
                        <div className="w-[230px] flex flex-row items-center justify-between mt-3">
                          <div className="gap-3 flex flex-row items-center justify-between">
                            <DoorOpenIcon color="#0364cc" className="w-[16px]" />
                            <p className="text-sm text-cardTextSecondaryColor font-normal font-Montserrat" >{item.numberBedrooms} Quartos</p>
                          </div>
                          <div className="gap-3 flex flex-row items-center justify-between">
                            <HomeIcon color="#0364cc" className="w-[16px]" />
                            <p className="text-sm text-cardTextSecondaryColor font-normal font-Montserrat" >{item.areaProperty} m²</p>
                          </div>

                          <div className="gap-3 flex flex-row items-center justify-between">
                            <BathIcon color="#0364cc" className="w-[16px]" />
                            <p className="text-sm text-cardTextSecondaryColor font-normal font-Montserrat" >{item.numberBathrooms} WC</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  data?.filter((i: IProperties) => i.isForSale === isForSale).map((item: IProperties) => (
                    <div key={item.id} onClick={() => { setCoordinates(item.coordinates); setTitle(item.title) }}>
                      <div className="cursor-pointer bg-white flex flex-col items-center justify-center w-[268px] h-[320px] border border-borderColor rounded-[5px]">
                        <div className="w-[230px] h-[150px] rounded-[5px]">
                          <img
                            src={item.photo}
                            alt={item.title}
                            className="rounded-md w-full h-full"
                          />
                        </div>
                        <div className="flex items-center justify-between w-[230px] mt-[26px]">
                          <div className="flex items-center gap-1">
                            <MapPinIcon color="#0364cc" className="w-[14px] h-[14px]" />
                            <span className="text-cardTextSecondaryColor text-sm font-normal font-Montserrat">{item.address}</span>
                          </div>
                          <div>
                            <span className="text-textColor text-sm font-bold font-MontserratBold">{item.price}</span>
                            <span className="text-cardTextSecondaryColor text-sm font-normal font-Montserrat">/mês</span>
                          </div>
                        </div>
                        <h3 className="mt-[6px] w-[230px] text-textColor text-base font-semibold font-MontserratSemiBold">{item.title.toUpperCase()}</h3>
                        <div className="w-[230px] flex flex-row items-center justify-between mt-3">
                          <div className="gap-2 flex flex-row items-center justify-between">
                            <DoorOpenIcon color="#0364CC" className="w-[16px]" />
                            <p className="text-sm text-cardTextSecondaryColor font-normal font-Montserrat" >{item.numberBedrooms} Quartos</p>
                          </div>
                          <div className="gap-2 flex flex-row items-center justify-between">
                            <HomeIcon color="#0364CC" className="w-[16px]" />
                            <p className="text-sm text-cardTextSecondaryColor font-normal font-Montserrat" >{item.areaProperty} m²</p>
                          </div>

                          <div className="gap-2 flex flex-row items-center justify-between">
                            <BathIcon color="#0364CC" className="w-[16px]" />
                            <p className="text-sm text-cardTextSecondaryColor font-normal font-Montserrat" >{item.numberBathrooms} WC</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )))
            }
          </div>
        </section>
      </main>
    </div>
  );
}
