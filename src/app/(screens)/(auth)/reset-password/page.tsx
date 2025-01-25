/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { USER_EMAIL } from "@/app/api/Axios";
import { resetPassword } from "@/http/users/resetPassword";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, type FormEvent, } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import colors from "tailwindcss/colors";
export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>("")

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true)

    const data = new FormData(event.currentTarget);

    const password = data.get("password")?.toString();
    const confirmPassword = data.get("confirmPassword")?.toString();

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

    const response = await resetPassword(email, password);
    setIsLoading(false)
    if(response?.email) {
      return router.replace("/sign-in")
    }
  }

  useEffect(() => {
    let email = "";
    const loadEmail = async () => {
      const emailStringfy = localStorage.getItem(USER_EMAIL);
      if (emailStringfy) {
        email = JSON.parse(emailStringfy);
        setEmail(email)
      }
    };

    loadEmail();
  }, []);

  return (
    <div className="bg-white lg:bg-[url('/figma.png')] bg-no-repeat bg-cover bg-center animate-zoom flex flex-col items-center justify-center lg:p-0 p-4 min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="lg:w-[581px] w-full h-[508px] p-4 bg-primaryColor flex flex-col items-center justify-center bg-opacity-100 rounded-[20px]">
        <main className="flex flex-col gap-4 row-start-2 justify-center items-center ">
          <div className="max-w-[450px] w-full">
            <nav className="">
              <Link href={"/forgot-password"} className="flex items-center justify-start gap-x-2">
                <ChevronLeftIcon color="#ffffff" className="h-[20px] w-5" />
                <span className="text-base text-secondary font-semibold font-MontserratSemiBold">Voltar</span>
              </Link>
            </nav>
            <h2 className="text-5xl text-center mt-10 font-semibold text-secondary font-MontserratSemiBold">Criar nova senha</h2>
            <form onSubmit={onSubmit} className="space-y-6 mt-11">
              <div className="w-full flex gap-1">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Insira a nova senha"
                  disabled={false}
                  className="h-[60px] w-full text-secondary font-Montserrat font-normal px-2 placeholder-secondary bg-transparent border-b border-secondary outline-none transition-all disabled:cursor-not-allowed"
                />
              </div>
              <div className="w-full flex gap-1">
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirmar a nova senha"
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
          </div>
        </main >
      </div >
    </div >
  );
}
