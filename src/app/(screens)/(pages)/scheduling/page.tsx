"use client"
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Calendar } from "lucide-react";

import Header from "@/app/components/Header";
import Aside from "@/app/components/AsideClient";
import CalendarScheduling from "@/app/components/CalendarSchuling";
import { getSchedulingByUserId } from "@/http/scheduling/getSchedulingByUserId";

export default function Page() {
  const [search, setSearch] = useState<string>("")
  const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false);

  const { data } = useQuery({
    queryKey: ["getSchedulingByUserId"],
    queryFn: getSchedulingByUserId,
    staleTime: 1000 * 60,
  });

  const onMenuToggle = () => {
    setIsAsideOpen(!isAsideOpen)
  }

  return (
    <div className="flex justify-between h-full w-full">
      <Aside isOpen={isAsideOpen} onMenuToggle={onMenuToggle} />
      <main className="flex flex-col lg:items-center lg:justify-center w-full h-full pt-4 px-4 lg:px-10 lg:pt-5 lg:ml-28 lg:w-[90%]">
        <Header search={search} setSearch={setSearch} onMenuToggle={onMenuToggle} />

        <section className="lg:mt-8 mt-5 w-full">
          <div className="h-auto w-full flex flex-col items-start">
            <h1 className="text-[32px] text-textColor font-bold font-MontserratBold">Agendamentos</h1>
            <div className="flex items-center mt-5 gap-5 px-5 w-full md:w-[605px] h-[70px] border border-borderColor rounded-[20px]">
              <Calendar color="#0364cc" className="w-[35px] h-[35px]" />
              <div className="flex flex-col items-start">
                <span className="text-lg text-textColor font-semibold font-MontserratSemiBold">{data?.length}</span>
                <span className="text-sm text-[#9D9D9D] font-normal font-Montserrat">Total agendamentos</span>
              </div>
            </div>
          </div>
          <div className="w-full h-auto mt-8">
            <CalendarScheduling />
          </div>
        </section>
      </main>
    </div>
  );
}
