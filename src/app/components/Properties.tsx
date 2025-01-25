"use client";
import { getProperties } from "@/http/properties/getProperties";
import { useQuery } from "@tanstack/react-query";
import { FaBath, FaBed, FaStar } from "react-icons/fa";
import { SlSizeFullscreen } from "react-icons/sl";

interface PropertiesProps {
  setPropertyId: (id: string) => void;
}

export default function Properties({ setPropertyId }: PropertiesProps) {

  const { data } = useQuery({
    queryKey: ["properties"],
    queryFn: getProperties,
    staleTime: 1000 * 60,
  });

  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      {
        data?.map((item) => (
          <div className="ml-6 h-[150px] mb-8" key={item.id}>
            <div className="bg-white shadow-md p-4 rounded-lg">
              <img
                src={item.photo}
                alt="Propriedade"
                width={200}
                height={200}
                className="rounded-md h-[180px] w-full"
              />
              <div className="flex flex-row items-center justify-between mt-3">
                <div className="gap-3 flex flex-row items-center justify-between">
                  <SlSizeFullscreen />
                  <p>{item.areaProperty} m²</p>
                </div>
                <div className="gap-3 flex flex-row items-center justify-between">
                  <FaBed />
                  <p>{item.numberBedrooms} Beds</p>
                </div>
                <div className="gap-3 flex flex-row items-center justify-between">
                  <FaBath />
                  <p>{item.numberBathrooms} Baths</p>
                </div>
              </div>
              <div className="flex flex-row items-center justify-between mt-3">
                <div>
                  <p>Price</p>
                  <p className="text-black font-bold">{item.price} Kz</p>
                </div>
                <div>
                  <p>Rating</p>
                  <div className="gap-2 flex flex-row items-center justify-between">
                    <FaStar color="#FFFF00" />
                    <FaStar color="#FFFF00" />
                    <FaStar color="#FFFF00" />
                    <FaStar color="#FFFF00" />
                    <FaStar color="#FFFF00" />
                  </div>
                </div>
              </div>
            </div>
            <button onClick={() => { setPropertyId(item.id) }} className="mt-2 bg-primaryColor text-white py-2 px-4 rounded-lg w-full">
              Rent Now
            </button>
          </div>
        ))
      }
    </div>
  );
}
