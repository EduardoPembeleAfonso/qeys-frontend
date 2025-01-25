import { UserPen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { qeysLogo } from "../assets/images";

export default function InitialHeader() {
  return (
    <header className="bg-secondaryColor h-[80px] w-full flex items-center justify-between px-[64px]">
        <nav className='flex items-center justify-between w-[70%]'>
          <div className='flex flex-row items-center gap-x-3'>
            <div className="w-[60px] h-[60px]">
              <Image
                src={qeysLogo}
                alt="Logo"
                className="w-full h-full rounded-full"
              />
            </div>
            <Link href={"/"} className='text-2xl text-textColor font-bold font-Poppins'>Qeys</Link>
          </div>
          <ul className='flex gap-10 self-center text-base text-blackColor font-semibold font-Poppins'>
            <li className='hover:text-textColor cursor-pointer'>
              <Link href={"/#"}>Página Inicial</Link>
            </li>
            <li className='hover:text-textColor cursor-pointer'>
              <Link href={"/#"}>Propriedades</Link>
            </li>
            <li className='hover:text-textColor cursor-pointer'>
              <Link href={"/#"}>Páginas</Link>
            </li>
            <li className='hover:text-textColor cursor-pointer'>
              <Link href={"/#"}>Contatos</Link>
            </li>
          </ul>
        </nav>
        <div className='w-[210px] h-[54px] rounded-[10px] bg-textColor flex items-center justify-between px-[18px] py-[16px]'>
          <UserPen color='#FFFFFF' className=' h-[22px] w-[22px]'/>
          <div className='w-[1px] h-[22px] bg-secondaryColor'></div>
          <nav className='text-[15px] text-secondaryColor font-bold font-Poppins gap-1 flex items-center'>
            <Link href={"/sign-in"}>Entrar</Link>
            <span>/</span>
            <Link href={"/sign-in"}>Criar conta</Link>
          </nav>
        </div>
      </header>
  );
}
