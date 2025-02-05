"use client";
import { getProperties } from "@/http/properties/getProperties";
import { createProperties } from "@/http/properties/createProperties";
import { updateProperties } from "@/http/properties/updateProperties";
import { deleteProperties } from "@/http/properties/deleteProperties";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { BathIcon, DoorOpenIcon, HomeIcon, MapPinIcon } from "lucide-react";
import IProperties from "@/utils/interface/properties.interfaces";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

import Header from "@/app/components/Header";
import Aside from "@/app/components/AsideClient";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import PropertiesSkeletonLoader from "@/app/components/PropertiesSkeletonLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authorId } from "@/app/api/Axios";

export default function Page() {
  const [search, setSearch] = useState<string>("");
  const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false);
  const [showFeedBack, setShowFeedBack] = useState<boolean>(false);
  const [isForSale, setIsForSale] = useState<boolean>(false);
  const [propertiesFilter, setPropertiesFilter] = useState<IProperties[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [openInfo, setOpenInfo] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [selectImage, setSelectImage] = useState("");
  const [image, setImage] = useState<unknown>(null);
  const [propertyId, setPropertyId] = useState("");
  const [title, setTitle] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [numberBathrooms, setNumberBathrooms] = useState("");
  const [numberBedrooms, setNumberBedrooms] = useState("");
  const [areaProperty, setAreaProperty] = useState("");
  const [description, setDescription] = useState("");
  const [isLoadingC, setIsLoading] = useState(false);
  const [formattedPrice, setFormattedPrice] = useState("");
  const [selectedOption, setSelectedOption] = useState("false");
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["propertiesDashboard"],
    queryFn: getProperties,
    staleTime: 1000 * 60,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file ?? null);
    setSelectImage(file ? URL.createObjectURL(file) : "");
  };

  const handleChangePrice = (e: any) => {
    let value = e.target.value;
    value = value.replace(/[^0-9]/g, "");
    const formattedValue = new Intl.NumberFormat("pt-AO", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value / 100);

    setFormattedPrice(formattedValue);
    setPrice(formattedValue);
  };

  async function handleCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    await createProperties(
      image,
      address,
      price,
      numberBathrooms,
      numberBedrooms,
      areaProperty,
      title,
      description,
      coordinates,
      selectedOption
    );
    setAddress("");
    setAreaProperty("");
    setCoordinates("");
    setDescription("");
    setTitle("");
    setImage("");
    setAreaProperty("");
    setNumberBathrooms("");
    setNumberBedrooms("");
    setIsLoading(false);
    refetch();
    setOpen(false);
  }

  async function handleEdit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    await updateProperties(
      propertyId,
      image,
      address,
      price,
      numberBathrooms,
      numberBedrooms,
      areaProperty,
      title,
      description,
      coordinates,
      selectedOption
    );
    setIsLoading(false);
    refetch();
    setOpenEdit(false);
  }

  async function handleDelete() {
    setIsLoadingDelete(true);
    await deleteProperties(propertyId);
    setIsLoadingDelete(false);
    refetch();
    onCloseModalInfo();
  }

  const onOpenModal = () => setOpen(true);
  const onOpenModalEdit = () => setOpenEdit(true);
  const onOpenModalInfo = (props: IProperties) => {
    setPropertyId(props.id);
    setTitle(props.title);
    setAddress(props.address);
    setDescription(props.description);
    setFormattedPrice(props.price);
    setPrice(props.price);
    setAreaProperty(props.areaProperty);
    setSelectImage(props.photo);
    setNumberBathrooms(props.numberBathrooms);
    setNumberBedrooms(props.numberBedrooms);
    setSelectedOption(props.isForSale === true ? "true" : "false");
    setCoordinates(props.coordinates);
    setOpenInfo(true);
  };
  const onCloseModal = () => setOpen(false);
  const onCloseModalInfo = () => {
    setTitle("");
    setAddress("");
    setDescription("");
    setFormattedPrice("");
    setPrice("");
    setAreaProperty("");
    setSelectImage("");
    setNumberBathrooms("");
    setNumberBedrooms("");
    setSelectedOption("false");
    setCoordinates("");
    setOpenInfo(false);
  };

  const onCloseModalEdit = () => setOpenEdit(false);

  const onMenuToggle = () => {
    setIsAsideOpen(!isAsideOpen);
  };

  useEffect(() => {
    if (search.trim() === "") {
      setPropertiesFilter([]);
      setShowFeedBack(false);
    } else {
      if (data) {
        const dataFilters = data?.filter(
          (item) =>
            item.address.toLowerCase().includes(search.toLowerCase()) ||
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase())
        );
        setPropertiesFilter(dataFilters);
        setShowFeedBack(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="flex bg-white justify-between h-full w-full">
      <Aside isOpen={isAsideOpen} onMenuToggle={onMenuToggle} />
      <main className="flex flex-col lg:items-center lg:justify-center w-full h-full pt-4 px-4 lg:px-10 lg:pt-5 lg:ml-28 lg:w-[90%]">
        <Header
          search={search}
          setSearch={setSearch}
          onMenuToggle={onMenuToggle}
        />

        <section className="lg:mt-8 mt-5 w-full min-h-screen">
          <div className="md:h-[55px] h-auto w-full flex flex-col items-start md:flex-row md:justify-between">
            <h1 className="text-[32px] text-textColor font-bold font-MontserratBold">
              Meus imoveis
            </h1>
            <div className="w-[226px] mt-1 lg:mt-0 h-full bg-secondaryColor rounded-[5px] border border-textColor flex items-center justify-between px-2">
              <button
                onClick={() => setIsForSale(false)}
                className={`w-[99px] h-[40px] lg:h-[43px] rounded-[5px] ${
                  !isForSale
                    ? "bg-textColor text-secondaryColor"
                    : "bg-secondaryColor text-textColor"
                } transition-all duration-300 text-base font-bold font-Inter`}
              >
                Aluguel
              </button>
              <button
                onClick={() => setIsForSale(true)}
                className={`w-[99px] h-[40px] lg:h-[43px] rounded-[5px] ${
                  isForSale
                    ? "bg-textColor text-secondaryColor"
                    : "bg-transparent text-textColor"
                } transition-all duration-300 text-base font-bold font-Inter`}
              >
                Comprar
              </button>
            </div>
          </div>
          {showFeedBack ? (
            <div className="flex items-center gap-2 w-full h-5 transition-all ease-in-out duration-300">
              <span className="text-base text-cardTextPrimaryColor font-bold font-Inter">
                {
                  propertiesFilter.filter(
                    (i: IProperties) => i.userId === authorId
                  ).length
                }
              </span>
              <span className="text-base text-borderColor font-bold font-Inter">
                Resindencias encotradas{" "}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-5 mt-3 lg:mt-0 w-full">
              <button
                onClick={onOpenModal}
                className={`w-[150px] h-[40px] lg:h-[43px] rounded-[5px] border border-textColor bg-secondaryColor text-textColor hover:bg-textColor hover:text-secondaryColor transition-all duration-300 text-base font-bold font-Inter`}
              >
                Registrar imovel
              </button>
            </div>
          )}
          <div className="md:mt-8 mt-5 w-full h-auto bg-white rounded-lg gap-y-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? [...Array(3)].map((_, index) => (
                  <PropertiesSkeletonLoader key={index} />
                ))
              : showFeedBack
              ? propertiesFilter
                  ?.filter(
                    (i: IProperties) =>
                      i.isForSale === isForSale && i.userId === authorId
                  )
                  .map((item: IProperties) => (
                    <Dialog key={item.id}>
                      <DialogTrigger asChild>
                        <div
                          onClick={() => onOpenModalInfo(item)}
                          className="cursor-pointer flex flex-col items-center justify-center md:w-[340px] w-full h-[352px] border border-borderColor rounded-[5px]"
                        >
                          <div className="w-[300px] h-[200px] rounded-[5px]">
                            <img
                              src={item.photo}
                              alt={item.title}
                              className="rounded-md w-full h-full"
                            />
                          </div>
                          <div className="flex items-center justify-between w-[300px] mt-[26px]">
                            <div className="flex items-center gap-2">
                              <MapPinIcon
                                color="#0364cc"
                                className="w-[16px] h-[16px]"
                              />
                              <span className="text-cardTextSecondaryColor text-sm font-normal font-Montserrat">
                                {item.address}
                              </span>
                            </div>
                            <div>
                              <span className="text-textColor text-sm font-bold font-MontserratBold">
                                {item.price} Kz
                              </span>
                              <span className="text-cardTextSecondaryColor text-sm font-normal font-Montserrat">
                                /mês
                              </span>
                            </div>
                          </div>
                          <h3 className="mt-[6px] w-[300px] text-textColor text-base font-semibold font-MontserratSemiBold">
                            {item.title.toUpperCase()}
                          </h3>
                          <div className="w-[300px] flex flex-row items-center justify-between mt-3">
                            <div className="gap-3 flex flex-row items-center justify-between">
                              <DoorOpenIcon
                                color="#0364cc"
                                className="w-[16px] h-[]20px"
                              />
                              <p className="text-sm text-cardTextSecondaryColor font-normal font-Montserrat">
                                {item.numberBedrooms} Quartos
                              </p>
                            </div>
                            <div className="gap-3 flex flex-row items-center justify-between">
                              <HomeIcon
                                color="#0364cc"
                                className="w-[16px] h-[]20px"
                              />
                              <p className="text-sm text-cardTextSecondaryColor font-normal font-Montserrat">
                                {item.areaProperty} m²
                              </p>
                            </div>

                            <div className="gap-3 flex flex-row items-center justify-between">
                              <BathIcon
                                color="#0364cc"
                                className="w-[16px] h-[]20px"
                              />
                              <p className="text-sm text-cardTextSecondaryColor font-normal font-Montserrat">
                                {item.numberBathrooms} WC
                              </p>
                            </div>
                          </div>
                        </div>
                      </DialogTrigger>
                    </Dialog>
                  ))
              : data
                  ?.filter(
                    (i: IProperties) =>
                      i.isForSale === isForSale && i.userId === authorId
                  )
                  .map((item: IProperties) => (
                    <Dialog key={item.id}>
                      <DialogTrigger asChild>
                        <div
                          onClick={() => onOpenModalInfo(item)}
                          className="cursor-pointer flex flex-col items-center justify-center md:w-[340px] w-full h-[352px] border border-borderColor rounded-[5px]"
                        >
                          <div className="w-[300px] h-[200px] rounded-[5px]">
                            <img
                              src={item.photo}
                              alt={item.title}
                              className="rounded-md w-full h-full"
                            />
                          </div>
                          <div className="flex items-center justify-between w-[300px] mt-[26px]">
                            <div className="flex items-center gap-2">
                              <MapPinIcon
                                color="#0364cc"
                                className="w-[16px] h-[16px]"
                              />
                              <span className="text-cardTextSecondaryColor text-sm font-normal font-Montserrat">
                                {item.address}.
                              </span>
                            </div>
                            <div>
                              <span className="text-textColor text-sm font-bold font-MontserratBold">
                                {item.price} kz
                              </span>
                              <span className="text-cardTextSecondaryColor text-sm font-normal font-Montserrat">
                                {!isForSale && "/mês"}
                              </span>
                            </div>
                          </div>
                          <h3 className="mt-[6px] w-[300px] text-textColor text-base font-semibold font-MontserratSemiBold">
                            {item.title.toUpperCase()}
                          </h3>
                          <div className="w-[300px] flex flex-row items-center justify-between mt-3">
                            <div className="gap-3 flex flex-row items-center justify-between">
                              <DoorOpenIcon
                                color="#0364cc"
                                className="w-[16px] h-[]20px"
                              />
                              <p className="text-sm text-cardTextSecondaryColor font-normal font-Montserrat">
                                {item.numberBedrooms} Quartos
                              </p>
                            </div>
                            <div className="gap-3 flex flex-row items-center justify-between">
                              <HomeIcon
                                color="#0364cc"
                                className="w-[16px] h-[]20px"
                              />
                              <p className="text-sm text-cardTextSecondaryColor font-normal font-Montserrat">
                                {item.areaProperty} m²
                              </p>
                            </div>

                            <div className="gap-3 flex flex-row items-center justify-between">
                              <BathIcon
                                color="#0364cc"
                                className="w-[16px] h-[]20px"
                              />
                              <p className="text-sm text-cardTextSecondaryColor font-normal font-Montserrat">
                                {item.numberBathrooms} WC
                              </p>
                            </div>
                          </div>
                        </div>
                      </DialogTrigger>
                    </Dialog>
                  ))}
          </div>
        </section>
        {/* Modal create propertie */}
        <Modal open={open} onClose={onCloseModal} center>
          <form
            onSubmit={handleCreate}
            className="w-full max-w-[500px] lg:w-[650px] border-0 p-0 bg-white rounded-[5px]"
          >
            <div className="relative h-[160px] flex justify-center items-center bg-textColor rounded-xl p-0 mt-5">
              {selectImage ? (
                <div className="relative w-full">
                  <Image
                    src={selectImage}
                    width={500}
                    height={200}
                    alt="biva"
                    className="h-[160px] w-full"
                  />
                </div>
              ) : (
                <>
                  <label
                    htmlFor="image"
                    className="relative cursor-pointer rounded-xl flex justify-center items-center border border-gray-200 w-40 h-36"
                  >
                    <ImageIcon className="size-10" color="#fff" />
                  </label>
                  <input
                    type="file"
                    accept=".png, .jpg"
                    id="image"
                    onChange={(e) => handleImage(e)}
                    className="hidden"
                  />
                </>
              )}
            </div>

            <div className="grid gap-2 py-2 px-5 mt-1">
              <div className="flex flex-col gap-4">
                <Input
                  type="text"
                  placeholder="Titulo (exemplo: Casa dos sonhos)"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  className="h-12"
                />
                <Input
                  type="text"
                  placeholder="Descrição do imovel (faça uma breve descrição da casa)"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  className="h-12"
                />
                <div className="gap-3 flex flex-col lg:flex-row items-center lg:justify-between">
                  <Input
                    type="text"
                    placeholder="Preço do imovel"
                    onChange={handleChangePrice}
                    value={formattedPrice}
                    className="h-12"
                  />
                  <Input
                    type="text"
                    placeholder="Área do imovel em metros quadrados"
                    onChange={(e) => setAreaProperty(e.target.value)}
                    value={areaProperty}
                    className="h-12"
                  />
                </div>
                <div className="gap-3 flex flex-col lg:flex-row items-center lg:justify-between">
                  <Input
                    type="text"
                    placeholder="Números de WC"
                    onChange={(e) => setNumberBathrooms(e.target.value)}
                    value={numberBathrooms}
                    className="h-12"
                  />
                  <Input
                    type="text"
                    placeholder="Números de quartos"
                    onChange={(e) => setNumberBedrooms(e.target.value)}
                    value={numberBedrooms}
                    className="h-12"
                  />
                </div>
                <div className="gap-3 flex flex-col lg:flex-row items-center lg:justify-between">
                  <Input
                    type="text"
                    placeholder="Endereço"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    className="h-12"
                  />
                  <Input
                    type="text"
                    placeholder="Coordenadas (ex: -8.902213534599657, 13.375108003008123)"
                    onChange={(e) => setCoordinates(e.target.value)}
                    value={coordinates}
                    className="h-12"
                  />
                </div>
                <div className="gap-3 flex flex-row items-center justify-between">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="false"
                      checked={selectedOption === "false"}
                      onChange={handleChange}
                    />
                    Para Aluguel
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="true"
                      checked={selectedOption === "true"}
                      onChange={handleChange}
                    />
                    Para Venda
                  </label>
                </div>

                <div className="w-full h-[1px] bg-gray-200" />

                <div className="mx-auto w-full pb-4 flex items-center sm:justify-center gap-8">
                  <Button
                    type="submit"
                    variant={"default"}
                    disabled={isLoadingC}
                    className="w-full lg:max-w-[230px] h-12 disabled:cursor-not-allowed font-bold text-lg font-Poppins bg-textColor text-secondaryColor border border-textColor hover:bg-secondaryColor hover:text-textColor active:scale-[.98] transition-all"
                  >
                    Registrar Imovel
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Modal>

        {/* Modal info propertie */}
        <Modal open={openInfo} onClose={onCloseModalInfo} center>
          <div className="w-full max-w-[500px] lg:w-[650px] border-0 p-0 bg-red-400 rounded-[5px]">
            <div className="bg-white px-1 sm:px-5 w-[250px] sm:w-full rounded-[5px]">
              <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="w-[200px] sm:w-full h-[200px] rounded-[5px]">
                  <img
                    src={selectImage}
                    alt={title}
                    className="rounded-md w-full h-full"
                  />
                </div>
                <div className="self-start flex flex-col sm:flex-row sm:items-center sm:justify-between w-full sm:w-full mt-[26px]">
                  <div className="flex items-center gap-2">
                    <MapPinIcon color="#0364cc" className="w-[16px] h-[16px]" />
                    <span className="text-cardTextSecondaryColor text-sm font-normal font-Montserrat">
                      {address}.
                    </span>
                  </div>
                  <div>
                    <span className="text-textColor text-sm font-bold font-MontserratBold">
                      {price} kz
                    </span>
                    <span className="text-cardTextSecondaryColor text-sm font-normal font-Montserrat">
                      /mês
                    </span>
                  </div>
                </div>
                <span className="mt-[6px] sm:w-[300px] self-start lg:w-full text-textColor text-base font-semibold font-MontserratSemiBold">
                  {title.toUpperCase()}
                </span>
                <p className="text-sm font-normal w-full self-start font-Montserrat">
                  {description}
                </p>
                <div className="self-start w-full sm:w-full flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3">
                  <div className="gap-3 flex flex-row items-center justify-between">
                    <DoorOpenIcon
                      color="#0364cc"
                      className="w-[16px] h-[]20px"
                    />
                    <p className="text-sm text-cardTextSecondaryColor font-normal font-Montserrat">
                      {numberBedrooms} Quartos
                    </p>
                  </div>
                  <div className="gap-3 flex flex-row items-center justify-between">
                    <HomeIcon color="#0364cc" className="w-[16px] h-[]20px" />
                    <p className="text-sm text-cardTextSecondaryColor font-normal font-Montserrat">
                      {areaProperty} m²
                    </p>
                  </div>

                  <div className="gap-3 flex flex-row items-center justify-between">
                    <BathIcon color="#0364cc" className="w-[16px] h-[]20px" />
                    <p className="text-sm text-cardTextSecondaryColor font-normal font-Montserrat">
                      {numberBathrooms} WC
                    </p>
                  </div>
                </div>
                <div className="mt-3 w-full h-auto flex flex-col self-start gap-3 sm:gap-0 sm:flex-row sm:items-center sm:justify-between lg:justify-start lg:gap-5">
                  <motion.button
                    onClick={handleDelete}
                    className="hover:bg-[#0364cc] hover:text-secondaryColor active:scale-[.98] transition-all w-full sm:w-[150px] lg:w-[215px] h-[48px] bg-secondaryColor border border-textColor rounded-[10px] text-base text-textColor font-semibold font-MontserratSemiBold"
                    whileTap={{ scale: 0.95 }}
                    animate={isLoadingDelete ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {isLoadingDelete ? "Apagando..." : "Apagar"}
                  </motion.button>
                  <button
                    onClick={onOpenModalEdit}
                    className="hover:bg-secondaryColor hover:text-textColor active:scale-[.98] transition-all w-full sm:w-[150px] lg:w-[215px] h-[48px] bg-textColor border border-textColor rounded-[10px] text-base text-secondaryColor font-semibold font-MontserratSemiBold"
                  >
                    Editar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        {/* Modal edit propertie */}
        <Modal open={openEdit} onClose={onCloseModalEdit} center>
          <form
            onSubmit={handleEdit}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[500px] lg:w-[650px] border-0 p-0 bg-white rounded-[5px]"
          >
            <div className="relative h-[150px] flex justify-center items-center rounded-xl p-0 px-5 mt-7">
              <div className="relative w-full h-full">
                <>
                  <label
                    htmlFor="image"
                    className="relative cursor-pointer rounded-[10px] bg-secondaryColor flex justify-center items-center border border-textColor text-textColor w-full h-5 mb-1"
                  >
                    Alterar imagem
                  </label>
                  <input
                    type="file"
                    accept=".png, .jpg"
                    id="image"
                    onChange={handleImage}
                    className="hidden"
                  />
                </>
                <img
                  src={selectImage}
                  width={500}
                  height={150}
                  alt="biva"
                  className="h-[140px] w-full rounded-[10px]"
                />
              </div>
            </div>

            <div className="grid gap-2 py-2 px-5 mt-3">
              <div className="flex flex-col gap-4">
                <Input
                  type="text"
                  placeholder="Titulo (exemplo: Casa dos sonhos)"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  className="h-12"
                />
                <Input
                  type="text"
                  placeholder="Descrição do imovel (faça uma breve descrição da casa)"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  className="h-12"
                />
                <div className="gap-3 flex flex-col lg:flex-row items-center lg:justify-between">
                  <Input
                    type="text"
                    placeholder="Preço do imovel"
                    onChange={handleChangePrice}
                    value={formattedPrice}
                    className="h-12"
                  />
                  <Input
                    type="text"
                    placeholder="Área do imovel em metros quadrados"
                    onChange={(e) => setAreaProperty(e.target.value)}
                    value={areaProperty}
                    className="h-12"
                  />
                </div>
                <div className="gap-3 flex flex-col lg:flex-row items-center lg:justify-between">
                  <Input
                    type="text"
                    placeholder="Números de WC"
                    onChange={(e) => setNumberBathrooms(e.target.value)}
                    value={numberBathrooms}
                    className="h-12"
                  />
                  <Input
                    type="text"
                    placeholder="Números de quartos"
                    onChange={(e) => setNumberBedrooms(e.target.value)}
                    value={numberBedrooms}
                    className="h-12"
                  />
                </div>
                <div className="gap-3 flex flex-col lg:flex-row items-center lg:justify-between">
                  <Input
                    type="text"
                    placeholder="Endereço"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    className="h-12"
                  />
                  <Input
                    type="text"
                    placeholder="Coordenadas (ex: -8.902213534599657, 13.375108003008123)"
                    onChange={(e) => setCoordinates(e.target.value)}
                    value={coordinates}
                    className="h-12"
                  />
                </div>
                <div className="gap-3 flex flex-row items-center justify-between">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="false"
                      checked={selectedOption === "false"}
                      onChange={handleChange}
                    />
                    Para Aluguel
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="true"
                      checked={selectedOption === "true"}
                      onChange={handleChange}
                    />
                    Para Venda
                  </label>
                </div>

                <div className="w-full h-[1px] bg-gray-200" />

                <div className="mx-auto w-full pb-4 flex items-center sm:justify-center gap-8">
                  <Button
                    type="submit"
                    variant={"default"}
                    disabled={isLoadingC}
                    className="w-full lg:max-w-[230px] h-12 disabled:cursor-not-allowed font-bold text-lg font-Poppins bg-textColor text-secondaryColor border border-textColor hover:bg-secondaryColor hover:text-textColor active:scale-[.98] transition-all"
                  >
                    Editar Imovel
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Modal>
      </main>
    </div>
  );
}
