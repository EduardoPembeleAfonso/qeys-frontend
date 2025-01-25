import Image from "next/image";
import React from "react";
import { user, user2, user3 } from "../assets/images";
import { MailIcon, PhoneIcon } from "lucide-react";
import Link from "next/link";

const InitialAgents: React.FC = () => {
    return (
        <div className="mt-[30px] w-full h-auto bg-white flex flex-col items-center justify-center">
            <h2 className="text-[40px] font-bold font-Poppins text-center text-blackColor">Conheça os agentes</h2>
            <p className="text-center text-[#8E8E93] text-sm font-normal font-Poppins mb-0">
                Conheça nossos agentes
            </p>
            <div className="h-[325px] gap-[25px] flex items-center justify-between">
                <div className="w-[300px] h-[280px] shadow-md border rounded-[10px] flex flex-col items-start">
                    <div className="w-full h-[200px]">
                        <Image
                            src={user}
                            alt="Agent"
                            className="w-full h-full rounded-t-[10px]"
                        />
                    </div>
                    <div className="w-full flex items-center justify-between px-[10px]">
                        <div>
                            <h1 className="mt-[14px] text-base text-blackColor text-start font-semibold font-Poppins">Wade Warren</h1>
                            <span className="text-xs text-[#3A3A3C] text-start font-normal font-Poppins">Vendedor</span>
                        </div>
                        <div className="flex items-center gap-[10px]">
                            <div className="flex items-center justify-center w-[38px] h-[38px] rounded-full p-1 border border-[#EFEFEF] hover:bg-textColor hover:cursor-pointer hover:text-secondaryColor">
                                <PhoneIcon className="w-[30px] h-[20px]" />
                            </div>
                            <div className="flex items-center justify-center w-[38px] h-[38px] rounded-full p-1 border border-[#EFEFEF] hover:bg-textColor hover:cursor-pointer hover:text-secondaryColor">
                                <MailIcon className="w-[30px] h-[20px]" />
                            </div>
                        </div>
                    </div>

                </div>
                <div className="w-[300px] h-[280px] shadow-md border rounded-[10px] flex flex-col items-start">
                    <div className="w-full h-[200px]">
                        <Image
                            src={user2}
                            alt="Agent"
                            className="w-full h-full rounded-t-[10px]"
                        />
                    </div>
                    <div className="w-full flex items-center justify-between px-[10px]">
                        <div>
                            <h1 className="mt-[14px] text-base text-blackColor text-start font-semibold font-Poppins">Leslie Alexander</h1>
                            <span className="text-xs text-[#3A3A3C] text-start font-normal font-Poppins">Corretor Comercial</span>
                        </div>
                        <div className="flex items-center gap-[10px]">
                            <div className="flex items-center justify-center w-[38px] h-[38px] rounded-full p-1 border border-[#EFEFEF] hover:bg-textColor hover:cursor-pointer hover:text-secondaryColor">
                                <PhoneIcon className="w-[30px] h-[20px]" />
                            </div>
                            <div className="flex items-center justify-center w-[38px] h-[38px] rounded-full p-1 border border-[#EFEFEF] hover:bg-textColor hover:cursor-pointer hover:text-secondaryColor">
                                <MailIcon className="w-[30px] h-[20px]" />
                            </div>
                        </div>
                    </div>

                </div>
                <div className="w-[300px] h-[280px] shadow-md border rounded-[10px] flex flex-col items-start">
                    <div className="w-full h-[200px]">
                        <Image
                            src={user3}
                            alt="Agent"
                            className="w-full h-full rounded-t-[10px]"
                        />
                    </div>
                    <div className="w-full flex items-center justify-between px-[10px]">
                        <div>
                            <h1 className="mt-[14px] text-base text-blackColor text-start font-semibold font-Poppins">Darlene Robertson</h1>
                            <span className="text-xs text-[#3A3A3C] text-start font-normal font-Poppins">Corretor de imóveis</span>
                        </div>
                        <div className="flex items-center gap-[10px]">
                            <div className="flex items-center justify-center w-[38px] h-[38px] rounded-full p-1 border border-[#EFEFEF] hover:bg-textColor hover:cursor-pointer hover:text-secondaryColor">
                                <PhoneIcon className="w-[30px] h-[20px]" />
                            </div>
                            <div className="flex items-center justify-center w-[38px] h-[38px] rounded-full p-1 border border-[#EFEFEF] hover:bg-textColor hover:cursor-pointer hover:text-secondaryColor">
                                <MailIcon className="w-[30px] h-[20px]" />
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <span className="text-xs text-[#3A3A3C] text-start font-normal font-Poppins">Torne-se um agente e receba a comissão que você merece. <Link href="https://wa.me/+244952574322" className="text-textColor underline">Contate-nos</Link></span>
        </div>
    );
};

export default InitialAgents;
