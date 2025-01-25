"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProperties } from "@/http/properties/getProperties";
import IProperties from "@/utils/interface/properties.interfaces";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { FaBath, FaBed } from "react-icons/fa";
import { SlSizeFullscreen } from "react-icons/sl";
import { FaStar } from "react-icons/fa6";
import { deleteProperties } from "@/http/properties/deleteProperties";

export function DataTable() {
  const { data } = useQuery({
    queryKey: ["propertiesDash"],
    queryFn: getProperties,
    staleTime: 1000 * 60,
  });

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedProperty, setSelectedProperty] = useState<IProperties>();

  const onCloseModal = () => setOpen(false);

  const handleRowClick = (property: IProperties) => {
    setSelectedProperty(property);
    setOpen(true);
  };

  const handleDeleteProperties = (id: string) => {
    setIsLoading(true)
    deleteProperties(id)
    setIsLoading(false)
    setOpen(false);
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] font-medium tracking-wide">
              Propriedades
            </TableHead>
            <TableHead className="text-right font-medium tracking-wide">
              Preço
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((row: IProperties) => (
              <TableRow key={row.id} className="" onClick={() => handleRowClick(row)}>
                <TableCell className="font-medium flex gap-2">
                  <div className="flex flex-col">
                    <img
                      src={row.photo}
                      alt="Propriedade"
                      width={200}
                      height={200}
                      className="rounded-md h-10 w-20"
                    />
                    <span className="text-xs mt-2">{row.address}</span>
                  </div>
                </TableCell>
                <TableCell
                  className="text-right font-bold text-gray-400">
                  {row.price}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <Modal open={open} onClose={onCloseModal} center>
          <div className="w-[450px]">
            <div className="p-4 rounded-lg">
              <img
                src={selectedProperty?.photo}
                alt="Propriedade"
                width={200}
                height={200}
                className="rounded-md h-[250px] w-full"
              />
              <div className="flex flex-row items-center justify-between mt-3">
                <div className="gap-3 flex flex-row items-center justify-between">
                  <SlSizeFullscreen />
                  <p>{selectedProperty?.areaProperty} m²</p>
                </div>
                <div className="gap-3 flex flex-row items-center justify-between">
                  <FaBed />
                  <p>{selectedProperty?.numberBedrooms} Beds</p>
                </div>
                <div className="gap-3 flex flex-row items-center justify-between">
                  <FaBath />
                  <p>{selectedProperty?.numberBathrooms} Baths</p>
                </div>
              </div>
              <div className="flex flex-row items-center justify-between mt-3">
                <div>
                  <p>Price</p>
                  <p className="text-black font-bold">{selectedProperty?.price} Kz</p>
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
              <div className="flex flex-row items-center justify-between mt-3">
                <button className="bg-primaryColor w-48 h-8 rounded-[8px] text-base text-white">Editar</button>
                <button disabled={isLoading} onClick={() => handleDeleteProperties(selectedProperty?.id as string)} className="bg-red-500 w-48 h-8 rounded-[8px] text-base text-white hover:bg-red-400 active:scale-[.98] transition-all">Apagar</button>
              </div>
            </div>
          </div>
        </Modal>
      </Table>
      {data === undefined && (
        <div className="w-full flex justify-center py-10">
          <span className="text-gray-400 text-lg text-center">
            Nenhuma propriedade encontrada!
          </span>
        </div>
      )}
    </>
  );
}
