import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer, Event } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import IProperties from "@/utils/interface/properties.interfaces";
import { MapPinIcon } from "lucide-react";
import { formateCurrency } from "@/utils/functions/formatCurrency";
import { cancelScheduling } from "@/http/scheduling/cancelScheduling";
import { getSchedulingByUserId } from "@/http/scheduling/getSchedulingByUserId";

const locales = {
  ptBR,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface CustomEvent extends Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  isActive: boolean
  contact: string;
  description?: string;
  properties: IProperties
}

const CalendarScheduling: React.FC = () => {
  const [events, setEvents] = useState<CustomEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CustomEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchEvents = async () => {
    const data = await getSchedulingByUserId();

    if (data) {
      const mappedEvents = data.map((event) => {
        const [day, month, year] = event.date.split("/").map(Number);
        const [hour, minute] = event.time.split(":").map(Number);
        const startDate = new Date(year, month - 1, day, hour, minute);

        return {
          id: event.id,
          title: event.description,
          contact: event.contact,
          isActive: event.isActive,
          start: startDate,
          end: new Date(startDate.getTime() + 2 * 60 * 60 * 1000),
          description: event.description,
          properties: event.properties
        };
      });

      setEvents(mappedEvents);
    }
  };

  const handleCancelScheduling = async (id: string) => {
    setIsLoading(true)
    await cancelScheduling(id)
    setIsLoading(false)
  }

  const handleSelectEvent = (event: CustomEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-4 w-full">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          views={["week", "day", "month"]}
          defaultView="week"
          min={new Date(1970, 1, 1, 8, 0)}
          max={new Date(1970, 1, 1, 17, 0)}
          messages={{
            next: "Próximo",
            previous: "Anterior",
            today: "Hoje",
            month: "Mês",
            week: "Semana",
            day: "Dia",
          }}
          onSelectEvent={handleSelectEvent}
          className="text-sm w-full"
        />
      </div>
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 w-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="flex flex-col items-center w-[350px] h-auto lg:w-[500px] bg-white p-5 border-none rounded-[5px]">
            <button onClick={() => handleCloseModal()} className="self-end text-TextButtonSecondaryColor text-sm font-bold font-MontserratBold w-6 h-6 rounded-full hover:bg-slate-200 bg-borderColor">X</button>
            <div className="w-full h-[200px] rounded-[5px] mt-4">
              <img
                src={selectedEvent?.properties.photo}
                alt={selectedEvent.properties.title}
                className="rounded-md w-full h-full"
              />
            </div>
            <div className="flex items-center justify-between w-[300px] lg:w-full mt-[26px]">
              <div className="flex items-center gap-2">
                <MapPinIcon color="#0364cc" className="w-[16px] h-[16px]" />
                <span className="text-cardTextSecondaryColor text-sm font-normal font-Montserrat">{selectedEvent.properties.address}.</span>
              </div>
              <div>
                <span className="text-textColor text-sm font-bold font-MontserratBold">{formateCurrency(selectedEvent.properties.price)}</span>
                <span className="text-cardTextSecondaryColor text-sm font-normal font-Montserrat">/mês</span>
              </div>
            </div>
            <h1 className="mt-[6px] w-[300px] lg:w-full text-textColor text-base font-semibold font-MontserratSemiBold">{selectedEvent.properties.title.toUpperCase()}</h1>
            <div className="text-sm font-normal font-Montserrat">
              {selectedEvent.description}
            </div>
            <div className="flex items-center justify-between w-[300px] lg:w-full mt-[15px]">
              <div className="flex items-center gap-2 text-cardTextSecondaryColor text-sm font-normal font-Montserrat">
                <span>Data da visita :</span>
                <span className="text-textColor font-semibold">{selectedEvent.start.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-cardTextSecondaryColor text-sm font-normal font-Montserrat">
                <span>Hora :</span>
                <span className="text-textColor font-semibold">{selectedEvent.start.toLocaleTimeString()}</span>
              </div>
            </div>
            <div className="flex items-center justify-between w-[300px] lg:w-full mt-[6px]">
              <div className="flex items-center gap-2 text-cardTextSecondaryColor text-sm font-normal font-Montserrat">
                <span>Contacto :</span>
                <span className="text-textColor font-semibold">{selectedEvent.contact}</span>
              </div>
            </div>
            <div className="mt-3 w-full h-auto flex flex-row items-center justify-between lg:justify-start lg:gap-5">
              {
                selectedEvent.isActive ? (
                  <button disabled={isLoading} onClick={() => handleCancelScheduling(selectedEvent.id)} className="hover:bg-textColor hover:text-secondaryColor active:scale-[.98] transition-all w-full h-[48px] bg-secondaryColor border border-textColor rounded-[10px] text-base text-textColor font-semibold font-MontserratSemiBold">Cancelar visita</button>
                ) : (
                  <button disabled={true} className="hover:bg-red-200 active:scale-[.98] transition-all w-full h-[48px] bg-red-300 border rounded-[10px] text-base text-secondaryColor font-semibold font-MontserratSemiBold">Visita cancelada</button>
                )
              }

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CalendarScheduling;
