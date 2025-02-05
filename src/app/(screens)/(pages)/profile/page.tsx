"use client"
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useState } from "react";
import { Edit2, MailIcon, Trash2, HouseIcon, UserSquare, DoorOpenIcon, HomeIcon, BathIcon, MapPinIcon, User2Icon, Edit3Icon, ImageIcon } from "lucide-react";

import Header from "@/app/components/Header";
import Aside from "@/app/components/AsideClient";
import { useAuth } from "@/app/contexts/ContextProvider";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import IProperties from '../../../../utils/interface/properties.interfaces';
import PropertiesProfileSkeletonLoader from "@/app/components/PropertiesProfileSkeletonLoader";
import { getProperties } from "@/http/properties/getProperties";
import "react-responsive-modal/styles.css";
import Modal from "react-responsive-modal";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import CustomSelect from "@/app/components/CustomSelect";
import Avatar from "@/app/components/avatar";
import UserProfileSkeletonLoader from "@/app/components/UserProfileSkeletonLoader";
import Image from "next/image";
import { updateUser } from "@/http/users/updateUser";
import { updateBankAccounts } from "@/http/bankAccounts/updateBankAccounts";
import { deleteBankAccounts } from "@/http/bankAccounts/deleteBankAccounts";
import { getBankAccounts } from "@/http/bankAccounts/getBankAccounts";
import { USER_TYPES } from "@/utils/enums/userTypes.enum";

const banks = [
  "Banco Atlantico",
  "Banco BAI",
  "Banco BPC",
  "Banco BFA",
  "Banco BIC",
  "Banco SOL"
];

const usersTypes = [
  "Proprietário",
  "Inquilino"
]
export default function Page() {
  const { authState } = useAuth();
  const user = authState?.author;
  const [search, setSearch] = useState<string>("")
  const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false);
  const [image, setImage] = useState<unknown>(null);
  const [selectImage, setSelectImage] = useState<string>("");
  const [userTypes, setUserTypes] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [iban, setIban] = useState<string>("");
  const [numberAccount, setNumberAccount] = useState<string>("");
  const [nameBank, setNameBank] = useState<string>("");
  const [bankId, setBankId] = useState<string>("");
  const [openInfo, setOpenInfo] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openEditUserProfile, setOpenEditUserProfile] = useState<boolean>(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState<boolean>(false);

  const { data, isLoading } = useQuery({
    queryKey: ["getAllPropertiesOwner"],
    queryFn: getProperties,
    staleTime: 1000 * 60,
  });

  const _bankAccounts = useQuery({
    queryKey: ["getBankAccountsOwner"],
    queryFn: getBankAccounts,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: true,
  });

  // const bankAccounts = _bankAccounts.data;
  const bankAccounts = _bankAccounts.data;

  const onMenuToggle = () => {
    setIsAsideOpen(!isAsideOpen)
  }

  const onOpenModal = () => {
    setName("Eduardo P. Afonso");
    setIban("00LAO42568910234");
    setNameBank("Banco BAI");
    setNumberAccount("123456789");
    setOpenInfo(true);
  };
  const onOpenEditUserProfile = () => {
    if (user?.name || user?.email || user?.image) {
      setName(user?.name);
      setEmail(user?.email);
      setUserTypes(user?.type ?? "Inquilino");
      setSelectImage(user?.image ?? "");
      setOpenEditUserProfile(true);
    }
  };


  const onOpenModalEdit = () => {
    setBankId("3454rfdsf43");
    setName("Eduardo P. Afonso");
    setIban("00LAO42568910234");
    setNameBank("Banco BAI");
    setNumberAccount("123456789");
    setOpenEdit(true);
  };
  const onCloseModal = () => {
    setName("");
    setIban("");
    setNameBank("");
    setNumberAccount("");
    setOpenInfo(false);
  };
  const onCloseModalEdit = () => {
    setBankId("");
    setName("");
    setIban("");
    setNameBank("");
    setNumberAccount("");
    setOpenEdit(false);
  };

  const onCloseModalEditUserProfile = () => {
    setName("");
    setEmail("");
    setSelectImage("");
    setUserTypes("");
    setOpenEditUserProfile(false);
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file ?? null);
    setSelectImage(file ? URL.createObjectURL(file) : "");
  };

  async function handleEditUserProfile(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (user && user?.id) {
      setIsLoadingEdit(true);
      await updateUser(
        user?.id,
        image,
        name,
        email,
        userTypes
      );
      setIsLoadingEdit(false);
      onCloseModalEditUserProfile();
    }
  }

  async function handleEditBankAccounts(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoadingEdit(true);
    await updateBankAccounts(
      bankId,
      name,
      iban,
      numberAccount,
      nameBank
    );
    setIsLoadingEdit(false);
    onCloseModalEdit();
  }

  async function handleDeleteBankAccounts() {
    setIsLoadingDelete(true);
    await deleteBankAccounts(
      bankId,
    );
    setIsLoadingDelete(false);
  }

  return (
    <div className="flex justify-between h-full w-full">
      <Aside isOpen={isAsideOpen} onMenuToggle={onMenuToggle} />
      <main className=" flex flex-col lg:items-center lg:justify-center w-full h-full pt-4 px-4 lg:px-10 lg:pt-5 lg:ml-28 lg:w-[90%]">
        <Header search={search} setSearch={setSearch} onMenuToggle={onMenuToggle} />

        <section className="lg:mt-8 mt-5 w-full h-full">
          <div className="h-auto w-full flex flex-col items-start">
            <h1 className="text-2xl md:text-[32px] text-textColor font-bold font-MontserratBold">Perfil</h1>
          </div>
          <section className="w-full h-full mt-8 flex flex-col lg:flex-row items-center lg:justify-between">
            <div className="flex flex-col items-center justify-center w-full md:h-[300px] md:w-[30%]">
              {
                user ? (
                  <>
                    <div className="relative w-28 h-28 rounded-full bg-secondaryColor border border-borderColor">
                      {
                        <Avatar
                          fallback={user?.name ?? "UC"}
                          image={user?.image}
                          height="100%"
                          width="100%"
                          className="bg-secondaryColor"
                        />
                      }
                    </div>
                    <div className="relative -top-8 -right-8 bg-secondaryColor w-8 h-8 p-1 rounded-full border border-borderColor hover:bg-borderColor">
                      <button onClick={() => onOpenEditUserProfile()} className="w-full h-full">
                        <Edit3Icon color="#0364cc" className="w-full h-full" />
                      </button>
                    </div>
                    <h2 className="mt-5 font-MontserratSemiBold text-2xl text-blackColor">{user?.name}</h2>
                    <div className="mt-4 flex items-center justify-start gap-2">
                      <UserSquare
                        color="#0364cc"
                        className="w-[16px] h-[16px]"
                      />
                      <span className="text-blackColor text-lg font-Poppins font-normal">{user?.type === USER_TYPES.OWNER ? "Proprietário" : "Inquilino"}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-start gap-2">
                      <MailIcon
                        color="#0364cc"
                        className="w-[16px] h-[16px]"
                      />
                      <span className="text-blackColor text-lg font-Poppins font-normal">{user?.email}</span>
                    </div>
                  </>
                ) : (
                  <UserProfileSkeletonLoader />
                )
              }
            </div>
            <div className="mt-5 lg:mt-0 w-full md:w-auto">
              <div className="h-full w-full flex flex-col lg:flex-row items-center lg:justify-between gap-1 lg:gap-4">
                <div className="flex items-center mt-5 gap-5 px-5 w-full md:w-[325px] h-[70px] border border-borderColor rounded-[20px]">
                  <HouseIcon color="#0364cc" className="w-[35px] h-[35px]" />
                  <div className="flex flex-col items-start">
                    <span className="text-lg text-textColor font-semibold font-MontserratSemiBold">{data?.length}</span>
                    <span className="text-sm text-[#9D9D9D] font-normal font-Montserrat">Total de imoveis</span>
                  </div>
                </div>
                <div className="flex items-center mt-5 gap-5 px-5 w-full md:w-[325px] h-[70px] border border-borderColor rounded-[20px]">
                  <HouseIcon color="#0364cc" className="w-[35px] h-[35px]" />
                  <div className="flex flex-col items-start">
                    <span className="text-lg text-textColor font-semibold font-MontserratSemiBold">{data?.length}</span>
                    <span className="text-sm text-[#9D9D9D] font-normal font-Montserrat">Total de imoveis alugados/comprados</span>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col items-center justify-center md:items-start md:justify-start">
                <h4 className="text-xl font-Poppins mt-3 text-textColor font-semibold md:mt-2">Top 2 imoveis mais bem avaliados</h4>
                <div className="mt-5 w-full h-auto md:h-[220px] flex flex-col items-center justify-center rounded-lg md:grid md:grid-cols-2">
                  {
                    isLoading ? (
                      [...Array(2)].map((_, index) => (
                        <PropertiesProfileSkeletonLoader key={index} />
                      ))
                    ) :
                      (
                        data?.filter((i: IProperties) => i.userId === user?.id).map((item: IProperties) => (
                          <div key={item.id}>
                            <div className="cursor-pointer bg-white flex flex-col items-center justify-center w-[268px] h-[220px] border border-borderColor rounded-[5px]">
                              <div className="w-[230px] h-[90px] rounded-[5px]">
                                <img
                                  src={item.photo}
                                  alt={item.title}
                                  className="rounded-md w-full h-full"
                                />
                              </div>
                              <div className="flex items-center justify-between w-[230px] mt-[20px]">
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
                        )).slice(0, 1)
                      )
                  }
                </div>
              </div>
            </div>
          </section>
          <div className="w-full my-5">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left text-[#9291A5] font-medium font-DmSans text-sm">NOME</TableHead>
                  <TableHead className="text-right text-[#9291A5] font-medium font-DmSans text-sm">BANCO</TableHead>
                  <TableHead className="text-right text-[#9291A5] font-medium font-DmSans text-sm">ACÇÕES</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell onClick={() => onOpenModal()} className="font-medium font-DmSans text-[#1D1C2B] text-sm w-auto">
                    Eduardo Afonso
                  </TableCell>
                  <TableCell onClick={() => onOpenModal()} className="text-right">
                    <span className="md:bg-[#D2FDE6] px-4 py-2 h-[27px] rounded-[30px] font-medium font-DmSans text-xs md:text-[#00974F]">
                      Banco BAI
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <button type="button" disabled={isLoadingDelete} onClick={() => handleDeleteBankAccounts()} className="p-2">
                      <Trash2 size={16} color="#615E83" />
                    </button>
                    <button onClick={onOpenModalEdit} type="button" className="p-2">
                      <Edit2 size={16} color="#615E83" />
                    </button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </section>
      </main>
      {/* Modal info bank account */}
      <Modal open={openInfo} onClose={onCloseModal} center>
        <div className="w-full max-w-[500px] lg:w-[650px] border-0 p-0 bg-red-400 rounded-[5px]">
          <div className="bg-white px-1 sm:px-5 w-[250px] sm:w-full rounded-[5px]">
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="w-[200px] sm:w-full h-[120px] md:h-[200px] border border-borderColor rounded-[5px]">
                {/* <img
                  src={selectImage}
                  alt={name}
                  className="rounded-md w-full h-full"
                /> */}
              </div>
              <div className="self-start flex flex-col sm:flex-row sm:items-center sm:justify-between w-full sm:w-full mt-[26px]">
                <div className="flex items-center gap-2">
                  <User2Icon color="#0364cc" className="w-[16px] h-[16px]" />
                  <span className="text-cardTextSecondaryColor text-sm font-normal font-Montserrat">
                    {name}.
                  </span>
                </div>
                <div className="gap-2">
                  <span className="text-sm text-textColor font-normal font-Montserrat">Conta n: </span>
                  <span className="text-cardTextSecondaryColor text-sm font-bold font-MontserratBold">
                    {numberAccount}
                  </span>
                </div>
              </div>
              <span className="mt-[6px] sm:w-[300px] self-start lg:w-full text-textColor text-base font-semibold font-MontserratSemiBold">
                {nameBank.toUpperCase()}
              </span>
              <p className="text-sm font-normal w-full self-start font-Montserrat">
                {iban}
              </p>
              <div className="mt-3 w-full h-auto flex flex-col self-start gap-3 sm:gap-0 sm:flex-row sm:items-center sm:justify-between lg:justify-start lg:gap-5">
                <motion.button
                  // onClick={handleDelete}
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

      {/* Modal edit bank account */}
      <Modal open={openEdit} onClose={onCloseModalEdit} center>
        <form
          onSubmit={handleEditBankAccounts}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-[500px] lg:w-[650px] border-0 p-0 bg-white rounded-[5px]"
        >
          <div className="grid gap-2 py-2 px-5 mt-3">
            <h4 className="text-xl font-Poppins mt-3 text-textColor text-center font-semibold md:mt-2">Editar conta bancaria</h4>
            <div className="flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Nome da conta (exemplo: Eduardo Afonso)"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="h-12"
              />
              <Input
                type="text"
                placeholder="Iban da conta"
                onChange={(e) => setIban(e.target.value)}
                value={iban}
                className="h-12"
              />
              <div className="gap-3 flex flex-col lg:flex-row items-center lg:justify-between">
                <Input
                  type="text"
                  placeholder="Número da conta"
                  onChange={(e) => setNumberAccount(e.target.value)}
                  value={numberAccount}
                  className="h-12"
                />
                <CustomSelect options={banks} placeholder="Selecione um banco" onChange={setNameBank} />
              </div>

              <div className="w-full h-[1px] bg-gray-200" />

              <div className="mx-auto w-full pb-4 flex items-center sm:justify-center gap-8">
                <Button
                  type="submit"
                  variant={"default"}
                  disabled={isLoadingEdit}
                  className="w-full lg:max-w-[230px] h-12 disabled:cursor-not-allowed font-bold text-lg font-Poppins bg-textColor text-secondaryColor border border-textColor hover:bg-secondaryColor hover:text-textColor active:scale-[.98] transition-all"
                >
                  Editar Conta bancaria
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Modal>

      {/* Modal edit user profile */}
      <Modal open={openEditUserProfile} onClose={onCloseModalEditUserProfile} center>
        <form
          onSubmit={handleEditUserProfile}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-[500px] lg:w-[650px] border-0 p-0 bg-white rounded-[5px]"
        >
          <div className="grid gap-2 py-2 px-5 mt-3">
            <h4 className="text-xl font-Poppins mt-3 text-textColor text-center font-semibold md:mt-2">Editar perfil</h4>
            <div className="relative h-[160px] flex justify-center items-center bg-textColor rounded-xl p-0 mt-5">
              {selectImage ? (
                <div className="relative w-40 h-40 rounded-full">
                  <label
                    htmlFor="image"
                    className="relative h-full w-full rounded-full"
                  >
                    <Image
                      src={selectImage}
                      width={500}
                      height={200}
                      alt="biva"
                      className="h-full w-full rounded-full"
                    />
                  </label>

                </div>
              ) : (
                <>
                  <label
                    htmlFor="image"
                    className="relative cursor-pointer rounded-full flex justify-center items-center border border-gray-200 w-36 h-36"
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
            <div className="flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Digite o seu nome"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="h-12"
              />
              <Input
                type="text"
                placeholder="Digite o seu e-mail"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="h-12"
              />
              <CustomSelect options={usersTypes} placeholder={`${userTypes ? userTypes : "Selecione o tipo de conta"} `} onChange={setUserTypes} />

              <div className="w-full h-[1px] bg-gray-200" />

              <div className="mx-auto w-full pb-4 flex items-center sm:justify-center gap-8">
                <Button
                  type="submit"
                  variant={"default"}
                  disabled={isLoadingEdit}
                  className="w-full lg:max-w-[230px] h-12 disabled:cursor-not-allowed font-bold text-lg font-Poppins bg-textColor text-secondaryColor border border-textColor hover:bg-secondaryColor hover:text-textColor active:scale-[.98] transition-all"
                >
                  Editar perfil
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
