"use client";
import { useQuery } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { Edit2, Trash2, HouseIcon, User2Icon } from "lucide-react";
import Header from "@/app/components/Header";
import Aside from "@/app/components/AsideClient";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import "react-responsive-modal/styles.css";
import Modal from "react-responsive-modal";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import CustomSelect from "@/app/components/CustomSelect";
import { updateBankAccounts } from "@/http/bankAccounts/updateBankAccounts";
import { deleteBankAccounts } from "@/http/bankAccounts/deleteBankAccounts";
import { getBankAccounts } from "@/http/bankAccounts/getBankAccounts";
import { createBankAccounts } from "@/http/bankAccounts/createBankAccounts";
import BankAccountSkeletonLoader from "@/app/components/BankAccountSkeletonLoader";
import IBankAccounts from "@/utils/interface/bankAccounts.interfaces";
import { authorId } from "@/app/api/Axios";

const banks = [
  "Banco Atlantico",
  "Banco BAI",
  "Banco BPC",
  "Banco BFA",
  "Banco BIC",
  "Banco SOL",
];

export default function Page() {
  const [search, setSearch] = useState<string>("");
  const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [iban, setIban] = useState<string>("");
  const [numberAccount, setNumberAccount] = useState<string>("");
  const [nameBank, setNameBank] = useState<string>("");
  const [bankId, setBankId] = useState<string>("");
  const [openInfo, setOpenInfo] = useState<boolean>(false);
  const [openRegister, setOpenRegister] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState<boolean>(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getMyBankAccountsOwner"],
    queryFn: getBankAccounts,
    staleTime: 1000 * 60,
  });

  const onMenuToggle = () => {
    setIsAsideOpen(!isAsideOpen);
  };

  const onOpenModal = (item: IBankAccounts) => {
    setBankId(item.id);
    setName(item.name);
    setIban(item.iban);
    setNameBank(item.nameBank);
    setNumberAccount(item.numberAccount);
    setOpenInfo(true);
  };

  const onOpenModalEdit = () => setOpenEdit(true);

  const onOpenRegister = () => setOpenRegister(true);
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

  const onCloseModalRegister = () => {
    setName("");
    setIban("");
    setNameBank("");
    setNumberAccount("");
    setOpenRegister(false);
  };

  async function handleEditBankAccounts(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoadingEdit(true);
    await updateBankAccounts(bankId, name, iban, numberAccount, nameBank);
    setIsLoadingEdit(false);
    refetch();
    onCloseModalEdit();
  }

  async function handleRegisterBankAccounts(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoadingEdit(true);
    await createBankAccounts(name, iban, numberAccount, nameBank);
    setIsLoadingEdit(false);
    refetch();
    onCloseModalEdit();
  }

  async function handleDeleteBankAccounts(id: string) {
    setIsLoadingDelete(true);
    await deleteBankAccounts(id);
    refetch();
    setIsLoadingDelete(false);
  }

  return (
    <div className="flex justify-between h-full bg-secondaryColor w-full">
      <Aside isOpen={isAsideOpen} onMenuToggle={onMenuToggle} />
      <main className=" flex flex-col lg:items-center lg:justify-center w-full h-full pt-4 px-4 lg:px-10 lg:pt-5 lg:ml-28 lg:w-[90%]">
        <Header
          search={search}
          setSearch={setSearch}
          onMenuToggle={onMenuToggle}
        />

        <section className="lg:mt-8 mt-5 w-full h-full bg-secondaryColor">
          <div className="h-auto w-full flex flex-col items-start">
            <h1 className="text-2xl md:text-[32px] text-textColor font-bold font-MontserratBold">
              Contas bancarias
            </h1>
          </div>
          <section className="w-full h-full mt-3 flex flex-col lg:flex-row items-center lg:justify-between">
            <div className="h-full w-full mt-5 lg:mt-0 flex flex-col items-start justify-start md:flex-row md:items-center md:justify-between gap-1 lg:gap-0">
              <div className="flex items-center mt-5 gap-5 px-5 w-full md:w-[325px] h-[80px] border border-borderColor rounded-[20px]">
                <HouseIcon color="#0364cc" className="w-[35px] h-[35px]" />
                <div className="flex flex-col items-start">
                  <span className="text-lg text-textColor font-semibold font-MontserratSemiBold">
                    {
                      data?.filter((i: IBankAccounts) => i.userId === authorId)
                        .length
                    }
                  </span>
                  <span className="text-sm text-[#9D9D9D] font-normal font-Montserrat">
                    Total de contas bancarias
                  </span>
                </div>
              </div>
              <Button
                onClick={onOpenRegister}
                className="bg-secondaryColor text-textColor border border-textColor hover:bg-textColor hover:text-secondaryColor text-lg py-2 px-5 mt-5 md:mt-0 font-Poppins"
              >
                Registrar Conta Bancaria
              </Button>
            </div>
          </section>
          <div className="w-full h-full my-5">
            {isLoading ? (
              <BankAccountSkeletonLoader />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left text-[#9291A5] font-medium font-DmSans text-sm">
                      NOME
                    </TableHead>
                    <TableHead className="text-right text-[#9291A5] font-medium font-DmSans text-sm">
                      BANCO
                    </TableHead>
                    <TableHead className="text-right text-[#9291A5] font-medium font-DmSans text-sm">
                      ACÇÕES
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data
                    ?.filter((i: IBankAccounts) => i.userId === authorId)
                    .map((item, key) => (
                      <TableRow key={key}>
                        <TableCell
                          onClick={() => onOpenModal(item)}
                          className="font-medium font-DmSans text-[#1D1C2B] text-sm w-auto"
                        >
                          {item.name}
                        </TableCell>
                        <TableCell
                          onClick={() => onOpenModal(item)}
                          className="text-right"
                        >
                          <span className="md:bg-[#D2FDE6] px-4 py-2 h-[27px] rounded-[30px] font-medium font-DmSans text-xs md:text-[#00974F]">
                            {item.nameBank}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <button
                            type="button"
                            disabled={isLoadingDelete}
                            onClick={() => handleDeleteBankAccounts(item.id)}
                            className="p-2"
                          >
                            <Trash2 size={16} color="#615E83" />
                          </button>
                          <button
                            onClick={() => {
                              setBankId(item.id);
                              setName(item.name);
                              setIban(item.iban);
                              setNameBank(item.nameBank);
                              setNumberAccount(item.numberAccount);
                              onOpenModalEdit();
                            }}
                            type="button"
                            className="p-2"
                          >
                            <Edit2 size={16} color="#615E83" />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            )}
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
                  <span className="text-sm text-textColor font-normal font-Montserrat">
                    Conta n:{" "}
                  </span>
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
                  disabled={isLoadingDelete}
                  onClick={() => handleDeleteBankAccounts(bankId)}
                  className="hover:bg-[#0364cc] hover:text-secondaryColor active:scale-[.98] transition-all w-full sm:w-[150px] lg:w-[215px] h-[48px] bg-secondaryColor border border-textColor rounded-[10px] text-base text-textColor font-semibold font-MontserratSemiBold"
                  whileTap={{ scale: 0.95 }}
                  animate={isLoadingDelete ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {isLoadingDelete ? "Apagando..." : "Apagar"}
                </motion.button>
                <button
                  onClick={() => {
                    onOpenModalEdit();
                  }}
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
            <h4 className="text-xl font-Poppins mt-3 text-textColor text-center font-semibold md:mt-2">
              Editar conta bancaria
            </h4>
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
                <CustomSelect
                  options={banks}
                  placeholder="Selecione um banco"
                  onChange={setNameBank}
                />
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

      {/* Modal register bank account */}
      <Modal open={openRegister} onClose={onCloseModalRegister} center>
        <form
          onSubmit={handleRegisterBankAccounts}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-[500px] lg:w-[650px] border-0 p-0 bg-white rounded-[5px]"
        >
          <div className="grid gap-2 py-2 px-5 mt-3">
            <h4 className="text-xl font-Poppins mt-3 text-textColor text-center font-semibold md:mt-2">
              Registar conta bancaria
            </h4>
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
                <CustomSelect
                  options={banks}
                  placeholder="Selecione um banco"
                  onChange={setNameBank}
                />
              </div>

              <div className="w-full h-[1px] bg-gray-200" />

              <div className="mx-auto w-full pb-4 flex items-center sm:justify-center gap-8">
                <Button
                  type="submit"
                  variant={"default"}
                  disabled={isLoadingEdit}
                  className="w-full lg:max-w-[230px] h-12 disabled:cursor-not-allowed font-bold text-lg font-Poppins bg-textColor text-secondaryColor border border-textColor hover:bg-secondaryColor hover:text-textColor active:scale-[.98] transition-all"
                >
                  Registrar Conta bancaria
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
