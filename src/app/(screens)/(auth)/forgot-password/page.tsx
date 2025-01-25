/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useState, type FormEvent, } from "react";
import { toast } from "sonner";

// import { useAuth } from "../../../contexts/ContextProvider";
import colors from "tailwindcss/colors";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { forgotPassword } from "@/http/users/forgotPassword";
import { verifyToken } from "@/http/users/verifyToken";
export default function Home() {
  // const { onLogin } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showVerifyCode, setShowVerifyCode] = useState<boolean>(false)
  const [email, setEmail] = useState<string>("")
  const [code, setCode] = useState<string>("")

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true)


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

    await forgotPassword(email)
    setIsLoading(false)
    setShowVerifyCode(true)
  }

  async function onSubmitVerifyCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true)

    if (code?.trim() === undefined || code?.trim() === "") {
      setIsLoading(false)
      toast("Por favor insira o código de verificação!", {
        style: {
          backgroundColor: colors.amber[500],
          color: colors.white,
          border: 0,
        },
      });
      return;
    }

    const response = await verifyToken(email, code)
    setIsLoading(false)
    if (response?.email) {
      return router.replace('/reset-password')
    }
  }

  return (
    <div className="bg-white lg:bg-[url('/figma.png')] bg-no-repeat bg-cover bg-center animate-zoom flex flex-col items-center justify-center lg:p-0 p-4 min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="lg:w-[581px] w-full h-[508px] p-4 bg-primaryColor flex flex-col items-center justify-center bg-opacity-100 rounded-[20px]">
        <main className="flex flex-col gap-4 row-start-2 justify-center items-center ">
          {
            showVerifyCode ? (<div className="max-w-[450px] w-full">
              <nav className="">
                <Link href={"/sign-in"} className="flex items-center justify-start gap-x-2">
                  <ChevronLeftIcon color="#ffffff" className="h-[20px] w-5" />
                  <span className="text-base text-secondary font-semibold font-MontserratSemiBold">Voltar</span>
                </Link>
              </nav>
              <h2 className="text-5xl text-center mt-10 font-semibold text-secondary font-MontserratSemiBold">Recuperar senha</h2>
              <p className="text-base text-center text-secondary font-normal font-Montserrat mt-3">Entre no seu e-mail, e verifique se recebeu o código de verificação.</p>
              <form onSubmit={onSubmitVerifyCode} className="space-y-6 mt-11">
                <div className="w-full flex gap-1">
                  <input
                    type="text"
                    name="code"
                    id="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Insira o código de verificação"
                    disabled={false}
                    className="h-[60px] w-full text-secondary font-Montserrat font-normal px-2 placeholder-secondary bg-transparent border-b border-secondary outline-none transition-all disabled:cursor-not-allowed"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-secondary w-full h-[48px] rounded-[8px] text-TextButtonSecondaryColor text-base font-semibold font-MontserratSemiBold hover:bg-slate-200 active:scale-[.98] transition-all"
                >
                  Confirmar
                </button>
              </form>
            </div>) : (
              <div className="max-w-[450px] w-full">
                <nav className="">
                  <Link href={"/sign-in"} className="flex items-center justify-start gap-x-2">
                    <ChevronLeftIcon color="#ffffff" className="h-[20px] w-5" />
                    <span className="text-base text-secondary font-semibold font-MontserratSemiBold">Voltar</span>
                  </Link>
                </nav>
                <h2 className="text-5xl text-center mt-10 font-semibold text-secondary font-MontserratSemiBold">Recuperar senha</h2>
                <p className="text-base text-center text-secondary font-normal font-Montserrat mt-3">Insira o seu e-mail para receber o código de verificação.</p>
                <form onSubmit={onSubmit} className="space-y-6 mt-11">
                  <div className="w-full flex gap-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Insira o seu e-mail"
                      disabled={false}
                      className="h-[60px] w-full text-secondary font-Montserrat font-normal px-2 placeholder-secondary bg-transparent border-b border-secondary outline-none transition-all disabled:cursor-not-allowed"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-secondary w-full h-[48px] rounded-[8px] text-TextButtonSecondaryColor text-base font-semibold font-MontserratSemiBold hover:bg-slate-200 active:scale-[.98] transition-all"
                  >
                    Enviar
                  </button>
                </form>
              </div>
            )
          }
        </main >
      </div >
    </div >
  );
}
