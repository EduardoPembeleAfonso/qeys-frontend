import Image from "next/image";
import React from "react";
import { img, user } from "../assets/images";
import { HomeIcon, MailOpen, PhoneCallIcon, PhoneIcon } from "lucide-react";
import Link from "next/link";

const InitialFooter: React.FC = () => {
    return (
        <div className="mt-[30px] w-full h-auto bg-blackColor flex flex-col items-center justify-center">
            <div className="w-[75%] mt-10 h-auto flex items-center justify-between">
                <div className="bg-secondaryColor w-[450px] h-[150px] rounded-[12px] flex flex-col items-center p-[10px]">
                    <div className="flex items-center justify-between w-full gap-5">
                        <div className="w-[120px] h-[90px]">
                            <Image
                                src={user}
                                alt="Vendedor"
                                className="w-full h-full rounded-[10px]"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-[20px] text-blackColor font-bold font-Poppins">Você precisa de uma casa</h2>
                            <p className="text-sm text-blackColor font-normal font-Poppins mt-[12px]">Diga-nos as suas necessidades, daremos-lhe milhares de sugestões para a casa dos sonhos.</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-[20px] w-[212px] h-[54px] bg-textColor text-secondaryColor rounded-[10px] py-[16px] px-[18px]">
                        <PhoneIcon />
                        <div className="w-[1px] h-[15px] bg-secondaryColor"></div>
                        <Link href="https://wa.me/+244952574322" className="text-[13px] font-bold font-Poppins">Contate o vendedor</Link>
                    </div>
                </div>
                <div className="bg-highlightColor w-[450px] h-[150px] rounded-[12px] flex flex-col items-center p-[10px]">
                    <div className="flex items-center justify-between w-full gap-5">
                        <div className="w-[120px] h-[90px]">
                            <Image
                                src={img}
                                alt="Vendedor"
                                className="w-full h-full rounded-[10px]"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-[20px] text-blackColor font-bold font-Poppins">Venda sua casa</h2>
                            <p className="text-sm text-blackColor font-normal font-Poppins mt-[12px]">Conectaremos você a milhares de pessoas que precisam comprar uma casa.</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-[20px] w-[212px] h-[54px] bg-textColor text-secondaryColor rounded-[10px] py-[16px] px-[18px]">
                        <HomeIcon />
                        <div className="w-[1px] h-[15px] bg-secondaryColor"></div>
                        <Link href="/sign-up" className="text-[13px] font-bold font-Poppins">Vender Propriedade</Link>
                    </div>
                </div>
            </div>
            <div className="w-full h-[1px] bg-secondaryColor bg-opacity-10 mt-20"></div>
            <div className="w-[75%] h-[325px] flex items-center justify-between">
                <div className="w-[255px] flex flex-col items-start h-[270px]">
                    <h2 className="text-lg text-secondaryColor font-semibold font-Poppins">Endereço do escritório</h2>
                    <span className="mt-[24px] text-secondaryColor text-sm text-opacity-50 font-normal font-Poppins">Nossa Sede:</span>
                    <span className="mt-[6px] text-[#F1FAEE] text-sm font-semibold font-Poppins">Luanda, Angola</span>
                    <span className="mt-[16px] text-secondaryColor text-sm text-opacity-50 font-normal font-Poppins">Branch:</span>
                    <span className="mt-[6px] text-[#F1FAEE] text-sm font-normal font-Poppins">Reem island Addax tower Floor 45, offi in Abu Dhabi, UAE</span>
                    <div className="w-full h-[1px] bg-secondaryColor bg-opacity-10 mt-[6px]"></div>
                    <span className="mt-[6px] text-[#F1FAEE] text-sm font-normal font-Poppins">Reem island Addax tower Floor 45, offi in Abu Dhabi, UAE</span>
                </div>
                <div className="w-[255px] flex flex-col items-start h-[270px]">
                    <h2 className="text-lg text-secondaryColor font-semibold font-Poppins">Contate o vendedor</h2>
                    <div className="mt-[24px] flex items-center gap-5 w-full">
                        <div className="w-[40px] h-[42px]">
                            <Image
                                src={user}
                                alt="Vendedor"
                                className="w-full h-full rounded-full"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-secondaryColor text-sm text-opacity-50 font-normal font-Poppins">Eduardo Afonso</span>
                            <span className="mt-[6px] text-[#F1FAEE] text-sm font-semibold font-Poppins">(+244) 951-355-812</span>
                        </div>
                    </div>
                    <div className="w-full h-[1px] bg-secondaryColor bg-opacity-10 mt-[14px]"></div>
                    <div className="mt-[20px] flex items-center gap-5 w-full">
                        <div className="w-[40px] h-[42px]">
                            <PhoneCallIcon className="w-full h-full rounded-full" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-secondaryColor text-sm text-opacity-50 font-normal font-Poppins">Linha direta</span>
                            <span className="mt-[6px] text-[#F1FAEE] text-sm font-semibold font-Poppins">(+244) 951-355-812</span>
                        </div>
                    </div>
                    <div className="w-full h-[1px] bg-secondaryColor bg-opacity-10 mt-[14px]"></div>
                    <div className="mt-[20px] flex items-center gap-5 w-full">
                        <div className="w-[40px] h-[42px]">
                            <MailOpen className="w-full h-full rounded-full" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-secondaryColor text-sm text-opacity-50 font-normal font-Poppins">E-mail</span>
                            <span className="mt-[6px] text-[#F1FAEE] text-sm font-semibold font-Poppins">geral@qeys.com</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default InitialFooter;
