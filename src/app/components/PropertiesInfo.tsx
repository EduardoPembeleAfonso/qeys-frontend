import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion"
import { BathIcon, DoorOpenIcon, HomeIcon, MapPinIcon } from "lucide-react";
import { formateCurrency } from "@/utils/functions/formatCurrency";
import { useState } from "react";
import DateScheduling from "./DateScheduling";
import { createScheduling } from "@/http/scheduling/createScheduling";
import { updateLikes } from "@/http/properties/updateLikesProperties";
import IProperties from "@/utils/interface/properties.interfaces";

export default function PropertiesInfo({ ...props }: IProperties) {
  const [contact, setContact] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [showScheduling, setShowScheduling] = useState<boolean>(false)
  const [, setDateSchedulingDetails] = useState<string>("")
  const [schedulingStartAndEndTimes, setSchedulingStartAndEndTimes] = useState<Date>()
  const [timeValue, setTimeValue] = useState<string>('00:00')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoadingLikes, setIsLoadingLikes] = useState<boolean>(false)
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleCreateScheduling = async () => {
    let formattedDate = "";
    if (schedulingStartAndEndTimes) {

      formattedDate = formatDate(schedulingStartAndEndTimes)
    }
    setIsLoading(true)
    const propertiesId: string = props.id
    const res = await createScheduling(formattedDate, timeValue, contact, description, propertiesId)
    if (res) {
      setShowScheduling(false)
    }
    setIsLoading(false)
  }

  const handleLikes = async (id: string) => {
    setIsLoadingLikes(true);
    const res = await updateLikes(id);
    if (res) {
      setIsLiked(true);
    }
    setIsLoadingLikes(false);
  };

  return (

    <DialogContent className="bg-white px-5 w-[350px] lg:w-full rounded-[5px]">
      {
        showScheduling ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <DialogTitle className="mt-[6px] mb-5 w-[300px] lg:w-full text-highlightColor text-2xl text-center font-semibold font-MontserratSemiBold">Agendamento de visita</DialogTitle>
            <DateScheduling
              schedulingStartAndEndTimes={schedulingStartAndEndTimes}
              setSchedulingStartAndEndTimes={setSchedulingStartAndEndTimes}
              timeValue={timeValue}
              setTimeValue={setTimeValue}
              setDateSchedulingDetails={setDateSchedulingDetails}
            />
            <div className="mt-5 w-full flex gap-1">
              <input
                type="text"
                name="code"
                id="code"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Numero de contacto"
                disabled={false}
                className="h-[60px] w-full rounded-lg text-TextButtonSecondaryColor font-Montserrat font-normal px-5 placeholder-TextButtonSecondaryColor bg-slate-50 border border-borderColor outline-none transition-all disabled:cursor-not-allowed"
              />
            </div>
            <div className="mt-5 w-full flex gap-1">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição"
                disabled={false}
                className="h-[100px] w-full rounded-lg text-TextButtonSecondaryColor font-Montserrat font-normal px-5 py-5 placeholder-TextButtonSecondaryColor bg-slate-50 border border-borderColor outline-none transition-all disabled:cursor-not-allowed"
                name="description" id="description" rows={5}></textarea>
            </div>
            <DialogFooter className="mt-5 w-full h-auto flex flex-row items-center justify-between lg:justify-start lg:gap-5">
              <button onClick={() => setShowScheduling(false)} className="hover:bg-blue-500 active:scale-[.98] transition-all w-[150px] lg:w-[215px] h-[48px] bg-primaryColor border rounded-[10px] text-base text-secondaryColor font-semibold font-MontserratSemiBold">Cancelar</button>
              <button disabled={isLoading} onClick={() => handleCreateScheduling()} className="hover:bg-amber-400 active:scale-[.98] transition-all w-[150px] lg:w-[215px] h-[48px] bg-highlightColor border rounded-[10px] text-base text-secondaryColor font-semibold font-MontserratSemiBold">Confirmar</button>
            </DialogFooter>
          </div>
        ) :
          (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <DialogHeader className="w-full h-[200px] rounded-[5px]">
                <img
                  src={props?.photo}
                  alt={props.title}
                  className="rounded-md w-full h-full"
                />
              </DialogHeader>
              <div className="flex items-center justify-between w-[300px] lg:w-full mt-[26px]">
                <div className="flex items-center gap-2">
                  <MapPinIcon color="#0364cc" className="w-[16px] h-[16px]" />
                  <span className="text-cardTextSecondaryColor text-sm font-normal font-Montserrat">{props.address}.</span>
                </div>
                <div>
                  <span className="text-textColor text-sm font-bold font-MontserratBold">{formateCurrency(props.price)}</span>
                  <span className="text-cardTextSecondaryColor text-sm font-normal font-Montserrat">/mês</span>
                </div>
              </div>
              <DialogTitle className="mt-[6px] w-[300px] lg:w-full text-textColor text-base font-semibold font-MontserratSemiBold">{props.title.toUpperCase()}</DialogTitle>
              <DialogDescription className="text-sm font-normal font-Montserrat">
                {props.description}
              </DialogDescription>
              <div className="w-[300px] lg:w-full flex flex-row items-center justify-between mt-3">
                <div className="gap-3 flex flex-row items-center justify-between">
                  <DoorOpenIcon color="#0364cc" className="w-[16px] h-[]20px" />
                  <p className="text-sm text-cardTextSecondaryColor font-normal font-Montserrat" >{props.numberBedrooms} Quartos</p>
                </div>
                <div className="gap-3 flex flex-row items-center justify-between">
                  <HomeIcon color="#0364cc" className="w-[16px] h-[]20px" />
                  <p className="text-sm text-cardTextSecondaryColor font-normal font-Montserrat" >{props.areaProperty} m²</p>
                </div>

                <div className="gap-3 flex flex-row items-center justify-between">
                  <BathIcon color="#0364cc" className="w-[16px] h-[]20px" />
                  <p className="text-sm text-cardTextSecondaryColor font-normal font-Montserrat" >{props.numberBathrooms} WC</p>
                </div>
              </div>
              <DialogFooter className="mt-3 w-full h-auto flex flex-row items-center justify-between lg:justify-start lg:gap-5">
                <motion.button
                onClick={() => handleLikes("props.id")}
                className="hover:bg-[#0364cc] hover:text-secondaryColor active:scale-[.98] transition-all w-[150px] lg:w-[215px] h-[48px] bg-secondaryColor border border-textColor rounded-[10px] text-base text-textColor font-semibold font-MontserratSemiBold"
                whileTap={{ scale: 0.95 }}
                animate={isLiked ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {isLoadingLikes ? "Carregando..." : "Gostei"}
              </motion.button>
              <button onClick={() => setShowScheduling(true)} className="hover:bg-secondaryColor hover:text-textColor active:scale-[.98] transition-all w-[150px] lg:w-[215px] h-[48px] bg-textColor border border-textColor rounded-[10px] text-base text-secondaryColor font-semibold font-MontserratSemiBold">Agendar</button>
            </DialogFooter>
            </div>

           
          )
      }
    </DialogContent>

  );
}
