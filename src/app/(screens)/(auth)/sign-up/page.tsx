/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "../../../contexts/ContextProvider";
import colors from "tailwindcss/colors";

const categories = [
  { label: "Proprietário", value: "OWNER" },
  { label: "Inquilino", value: "TENANT" },
];

export default function Home() {
  const { onRegister } = useAuth();
  const [selectTypeAccount, setSelectTypeAccount] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true)

    const data = new FormData(event.currentTarget);

    const name = data.get("name")?.toString();
    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();
    const confirmPassword = data.get("confirmPassword")?.toString();

    if (name === undefined || name?.trim() === "") {
      setIsLoading(false)
      toast("Por favor insira um nome!", {
        style: {
          backgroundColor: colors.amber[500],
          color: colors.white,
          border: 0,
        },
      });
      return;
    }

    if (selectTypeAccount === undefined || selectTypeAccount?.trim() === "") {
      setIsLoading(false)
      toast("Por favor selecione um tipo de conta!", {
        style: {
          backgroundColor: colors.amber[500],
          color: colors.white,
          border: 0,
        },
      });
      return;
    }

    if (email === undefined || email?.trim() === "") {
      setIsLoading(false)
      toast("Por favor insira um e-mail", {
        style: {
          backgroundColor: colors.amber[500],
          color: colors.white,
          border: 0,
        },
      });
      return;
    }

    if (password === undefined || password?.trim() === "") {
      setIsLoading(false)
      toast("Por favor insira uma senha!", {
        style: {
          backgroundColor: colors.amber[500],
          color: colors.white,
          border: 0,
        },
      });
      return;
    }

    if (confirmPassword === undefined || confirmPassword?.trim() === "") {
      setIsLoading(false)
      toast("Por favor insira novamente a senha!", {
        style: {
          backgroundColor: colors.amber[500],
          color: colors.white,
          border: 0,
        },
      });
      return;
    }

    if (confirmPassword?.trim() !== password?.trim()) {
      setIsLoading(false)
      toast("Senha diferentes. As senhas devem ser iguais!", {
        style: {
          backgroundColor: colors.amber[500],
          color: colors.white,
          border: 0,
        },
      });
      return;
    }


    await onRegister(name, email, password, selectTypeAccount);
    setIsLoading(false)
  }

  return (
    <div className="bg-white lg:bg-[url('/figma.png')] bg-no-repeat bg-cover bg-center animate-zoom flex flex-col items-center justify-center lg:p-0 p-4 min-h-screen">
      <div className="lg:w-[581px] lg:h-[560px] w-full h-[650px]  p-4 bg-primaryColor bg-opacity-100 rounded-[20px]">
        <main className="flex flex-col gap-4 row-start-2 justify-center items-center ">
          <div className="max-w-[450px] w-full">
            <h2 className="text-5xl text-secondary text-center mt-8 font-MontserratSemiBold font-semibold">Registro</h2>

            <form onSubmit={onSubmit} className="space-y-6 mt-8">
              <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-center lg:gap-x-5">
                <div className="w-full flex flex-col gap-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Insira o seu nome"
                    disabled={false}
                    autoCapitalize="off"
                    autoComplete="off"
                    className="h-[60px] w-full text-secondary font-Montserrat font-normal px-2 placeholder-secondary bg-transparent border-b border-secondary outline-none transition-all disabled:cursor-not-allowed"
                  />
                </div>
                <div className="w-full flex flex-col gap-1 mt-4 lg:mt-0">
                  <Select onValueChange={setSelectTypeAccount}>
                    <SelectTrigger className="h-[60px] w-full text-secondary font-Montserrat font-normal px-2 placeholder-secondary bg-transparent border-b border-secondary outline-none transition-all disabled:cursor-not-allowed">
                      <SelectValue placeholder="Selecione o tipo de conta" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                </div>
              </div>
              <div className="w-full flex flex-col gap-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Insira o seu e-mail"
                  disabled={false}
                  autoCapitalize="off"
                  autoComplete="off"
                  className="h-[60px] w-full text-secondary font-Montserrat font-normal px-2 placeholder-secondary bg-transparent border-b border-secondary outline-none transition-all disabled:cursor-not-allowed"
                />
              </div>
              <div className="w-full flex flex-col gap-1">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Insira a sua senha"
                  disabled={false}
                  autoCapitalize="off"
                  autoComplete="off"
                  className="h-[60px] w-full text-secondary font-Montserrat font-normal px-2 placeholder-secondary bg-transparent border-b border-secondary outline-none transition-all disabled:cursor-not-allowed"
                />
              </div>
              <div className="w-full flex flex-col gap-1">
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirmar a senha"
                  disabled={false}
                  autoCapitalize="off"
                  autoComplete="off"
                  className="h-[60px] w-full text-secondary font-Montserrat font-normal px-2 placeholder-secondary bg-transparent border-b border-secondary outline-none transition-all disabled:cursor-not-allowed"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-secondary w-full h-[48px] rounded-[8px] text-TextButtonSecondaryColor text-base font-semibold font-MontserratSemiBold hover:bg-slate-200 active:scale-[.98] transition-all"
              >
                Registrar
              </button>
            </form>
          </div>
          <div className="mt-1">
            <span className="text-secondary text-base font-semibold font-MontserratSemiBold">Já possui uma conta ? <Link href={"/sign-in"} className="underline">Entre aqui.</Link></span>
          </div>
        </main>
      </div>
    </div>
  );
}