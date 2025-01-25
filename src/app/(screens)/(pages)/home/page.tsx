"use client"
import { getProperties } from "@/http/properties/getProperties";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BathIcon, DoorOpenIcon, HomeIcon, MapPinIcon } from "lucide-react";
import { formateCurrency } from '../../../../utils/functions/formatCurrency';
import IProperties from "@/utils/interface/properties.interfaces";

import Header from "@/app/components/Header";
import Aside from "@/app/components/AsideClient";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import PropertiesInfo from "@/app/components/PropertiesInfo";
import PropertiesSkeletonLoader from "@/app/components/PropertiesSkeletonLoader";


export default function Page() {
  const [search, setSearch] = useState<string>("")
  const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false);
  const [showFeedBack, setShowFeedBack] = useState<boolean>(false);
  const [isForSale, setIsForSale] = useState<boolean>(false);
  const [propertiesFilter, setPropertiesFilter] = useState<IProperties[]>([])

  const { data, isLoading } = useQuery({
    queryKey: ["propertiesPage"],
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
    <div className="flex bg-white justify-between h-full w-full">
      <Aside isOpen={isAsideOpen} onMenuToggle={onMenuToggle} />
      <main className="flex flex-col lg:items-center lg:justify-center w-full h-full pt-4 px-4 lg:px-10 lg:pt-5 lg:ml-28 lg:w-[90%]">
        <Header search={search} setSearch={setSearch} onMenuToggle={onMenuToggle} />

        <section className="lg:mt-8 mt-5 w-full min-h-screen">
          <div className="md:h-[55px] h-auto w-full flex flex-col items-start md:flex-row md:justify-between">
            <h1 className="text-[32px] text-textColor font-bold font-MontserratBold">Mais recentes</h1>
            <div className="w-[226px] mt-1 lg:mt-0 h-full bg-secondaryColor rounded-[5px] border border-textColor flex items-center justify-between px-2">
              <button onClick={() => setIsForSale(false)} className={`w-[99px] h-[40px] lg:h-[43px] rounded-[5px] ${!isForSale ? 'bg-textColor text-secondaryColor' : 'bg-secondaryColor text-textColor'} transition-all duration-300 text-base font-bold font-Inter`}>
                Aluguel
              </button>
              <button onClick={() => setIsForSale(true)} className={`w-[99px] h-[40px] lg:h-[43px] rounded-[5px] ${isForSale ? 'bg-textColor text-secondaryColor' : 'bg-transparent text-textColor'} transition-all duration-300 text-base font-bold font-Inter`}>
                Comprar
              </button>
            </div>
          </div>
          {showFeedBack ? (
            <div className="flex items-center gap-2 w-full h-5 transition-all ease-in-out duration-300">
              <span className="text-base text-cardTextPrimaryColor font-bold font-Inter">{propertiesFilter.length}</span>
              <span className="text-base text-borderColor font-bold font-Inter">Resindencias encotradas </span>
            </div>
          ) : (
            <div className="flex items-center gap-5 w-full h-5">
            </div>
          )}
          <div className="md:mt-8 mt-5 w-full h-auto bg-white rounded-lg gap-y-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {
              isLoading ? (
                [...Array(3)].map((_, index) => (
                  <PropertiesSkeletonLoader key={index} />
                ))
              ) :
                showFeedBack ? (
                  propertiesFilter?.filter((i: IProperties) => i.isForSale === isForSale).map((item: IProperties) => (
                    <Dialog key={item.id}>
                      <DialogTrigger asChild>
                        <div className="cursor-pointer flex flex-col items-center justify-center md:w-[340px] w-full h-[352px] border border-borderColor rounded-[5px]">
                          <div className="w-[300px] h-[200px] rounded-[5px]">
                            <img
                              src={item.photo}
                              alt={item.title}
                              className="rounded-md w-full h-full"
                            />
                          </div>
                          <div className="flex items-center justify-between w-[300px] mt-[26px]">
                            <div className="flex items-center gap-2">
                              <MapPinIcon color="#0364cc" className="w-[16px] h-[16px]" />
                              <span className="text-cardTextSecondaryColor text-sm font-normal font-Montserrat">{item.address}</span>
                            </div>
                            <div>
                              <span className="text-textColor text-sm font-bold font-MontserratBold">{formateCurrency(item.price)}</span>
                              <span className="text-cardTextSecondaryColor text-sm font-normal font-Montserrat">/mês</span>
                            </div>
                          </div>
                          <h3 className="mt-[6px] w-[300px] text-textColor text-base font-semibold font-MontserratSemiBold">{item.title.toUpperCase()}</h3>
                          <div className="w-[300px] flex flex-row items-center justify-between mt-3">
                            <div className="gap-3 flex flex-row items-center justify-between">
                              <DoorOpenIcon color="#0364cc" className="w-[16px] h-[]20px" />
                              <p className="text-sm text-cardTextSecondaryColor font-normal font-Montserrat" >{item.numberBedrooms} Quartos</p>
                            </div>
                            <div className="gap-3 flex flex-row items-center justify-between">
                              <HomeIcon color="#0364cc" className="w-[16px] h-[]20px" />
                              <p className="text-sm text-cardTextSecondaryColor font-normal font-Montserrat" >{item.areaProperty} m²</p>
                            </div>

                            <div className="gap-3 flex flex-row items-center justify-between">
                              <BathIcon color="#0364cc" className="w-[16px] h-[]20px" />
                              <p className="text-sm text-cardTextSecondaryColor font-normal font-Montserrat" >{item.numberBathrooms} WC</p>
                            </div>
                          </div>
                        </div>
                      </DialogTrigger>
                      <PropertiesInfo {...item} />
                    </Dialog>
                  )))
                  : (
                    data?.filter((i: IProperties) => i.isForSale === isForSale).map((item: IProperties) => (
                      <Dialog key={item.id}>
                        <DialogTrigger asChild>
                          <div className="cursor-pointer flex flex-col items-center justify-center md:w-[340px] w-full h-[352px] border border-borderColor rounded-[5px]">
                            <div className="w-[300px] h-[200px] rounded-[5px]">
                              <img
                                src={item.photo}
                                alt={item.title}
                                className="rounded-md w-full h-full"
                              />
                            </div>
                            <div className="flex items-center justify-between w-[300px] mt-[26px]">
                              <div className="flex items-center gap-2">
                                <MapPinIcon color="#0364cc" className="w-[16px] h-[16px]" />
                                <span className="text-cardTextSecondaryColor text-sm font-normal font-Montserrat">{item.address}.</span>
                              </div>
                              <div>
                                <span className="text-textColor text-sm font-bold font-MontserratBold">{formateCurrency(item.price)}</span>
                                <span className="text-cardTextSecondaryColor text-sm font-normal font-Montserrat">{!isForSale && "/mês"}</span>
                              </div>
                            </div>
                            <h3 className="mt-[6px] w-[300px] text-textColor text-base font-semibold font-MontserratSemiBold">{item.title.toUpperCase()}</h3>
                            <div className="w-[300px] flex flex-row items-center justify-between mt-3">
                              <div className="gap-3 flex flex-row items-center justify-between">
                                <DoorOpenIcon color="#0364cc" className="w-[16px] h-[]20px" />
                                <p className="text-sm text-cardTextSecondaryColor font-normal font-Montserrat" >{item.numberBedrooms} Quartos</p>
                              </div>
                              <div className="gap-3 flex flex-row items-center justify-between">
                                <HomeIcon color="#0364cc" className="w-[16px] h-[]20px" />
                                <p className="text-sm text-cardTextSecondaryColor font-normal font-Montserrat" >{item.areaProperty} m²</p>
                              </div>

                              <div className="gap-3 flex flex-row items-center justify-between">
                                <BathIcon color="#0364cc" className="w-[16px] h-[]20px" />
                                <p className="text-sm text-cardTextSecondaryColor font-normal font-Montserrat" >{item.numberBathrooms} WC</p>
                              </div>
                            </div>
                          </div>
                        </DialogTrigger>
                        <PropertiesInfo {...item} />
                      </Dialog>
                    )))
            }

          </div>
        </section>
      </main>
    </div>
  );
}
