/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useState, type FormEvent, } from "react";
import { toast } from "sonner";

import { useAuth } from "../../../contexts/ContextProvider";
import colors from "tailwindcss/colors";
export default function Home() {
  const { onLogin } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true)

    const data = new FormData(event.currentTarget);

    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();

    if (email?.trim() === undefined || email?.trim() === "") {
      setIsLoading(false)
      toast("Por favor insira o e-mail!", {
        style: {
          backgroundColor: colors.amber[500],
          color: colors.white,
          border: 0,
        },
      });
      return;
    }

    if (password?.trim() === undefined || password?.trim() === "") {
      setIsLoading(false)
      toast("Por favor insira a senha!", {
        style: {
          backgroundColor: colors.amber[500],
          color: colors.white,
          border: 0,
        },
      });
      return;
    }

    await onLogin(email, password);
    setIsLoading(false)
  }

  return (
    <div className="bg-white lg:bg-[url('/figma.png')] bg-no-repeat bg-cover bg-center animate-zoom flex flex-col items-center justify-center lg:p-0 p-4 min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="lg:w-[581px] w-full h-[508px] p-4 bg-primaryColor bg-opacity-100 rounded-[20px]">
        <main className="flex flex-col gap-4 row-start-2 justify-center items-center ">
          <div className="max-w-[450px] w-full">
            <h2 className="text-5xl text-center mt-10 font-semibold text-secondary font-MontserratSemiBold">Entrar</h2>

            <form onSubmit={onSubmit} className="space-y-6 mt-11">
              <div className="w-full flex gap-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Insira o seu e-mail"
                  disabled={false}
                  className="h-[60px] w-full text-secondary font-Montserrat font-normal px-2 placeholder-secondary bg-transparent border-b border-secondary outline-none transition-all disabled:cursor-not-allowed"
                />
              </div>
              <div className="w-full flex gap-1">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Insira a sua senha"
                  disabled={false}
                  className="h-[60px] w-full text-secondary font-Montserrat font-normal px-2 placeholder-secondary bg-transparent border-b border-secondary outline-none transition-all disabled:cursor-not-allowed"
                />
              </div>
              <div className="flex items-end justify-end mt-8 mb-6 w-full">
                <Link href={"/forgot-password"} className="text-secondary text-xs font-semibold font-MontserratSemiBold underline">Esqueceu a sua senha ?</Link>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-secondary w-full h-[48px] rounded-[8px] text-TextButtonSecondaryColor text-base font-semibold font-MontserratSemiBold hover:bg-slate-200 active:scale-[.98] transition-all"
              >
                Entrar
              </button>
            </form>
          </div>
          <div className="mt-3">
            <span className="text-secondary text-base font-semibold font-MontserratSemiBold">Ainda não possui uma conta ? <Link href={"/sign-up"} className="underline">Crie uma aqui.</Link></span>
          </div>
        </main>
      </div>
    </div>
  );
}
