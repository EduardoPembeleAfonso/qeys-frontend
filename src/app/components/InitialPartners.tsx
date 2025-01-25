import Image from "next/image";
import React from "react";
import { agent, agent2, imgPartners } from "../assets/images";
import Link from "next/link";
import {  MoveRight } from "lucide-react";

const InitialPartners: React.FC = () => {
    return (
        <div className="w-full h-[450px] mb-5 bg-white flex items-center justify-between">
            <div className="w-[50%] h-full">
                <Image
                    src={imgPartners}
                    alt="Logo"
                    className="w-full h-full"
                />
            </div>
            <div className="h-full w-[50%] px-[40px] py-[10px] bg-textColor flex flex-col">
                <h2 className="text-[30px] w-[400px] text-secondaryColor font-bold font-Poppins">Explore a casa dos seus sonhos ou aumente seu portfólio de investimentos hoje - seu futuro o aguarda!</h2>
                <p className="text-sm text-secondaryColor font-normal font-Poppins">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed tristique metus proin id lorem</p>
                <div className="w-full mt-[20px] flex items-center justify-between">
                    <div className="flex flex-col w-[220px] h-[200px] bg-secondaryColor rounded-[10px]">
                        <div className="w-full h-[115px]">
                            <Image
                                src={agent}
                                alt="Agent"
                                className="w-full h-full rounded-t-[10px]"
                            />
                        </div>
                        <h2 className="ml-[10px] mt-[5px] text-lg text-blackColor font-semibold font-Poppins">Darlene Robertson</h2>
                        <span className="ml-[10px] mt-[2px] text-xs text-[#3A3A3C] font-normal font-Poppins">Corretor de imóveis</span>
                        <Link href="https://wa.me/+224952574322" target="_blank" className="ml-[10px] mt-[7px] text-sm text-textColor font-semibold font-Poppins flex items-center gap-2">Contate o vendedor <MoveRight /> </Link>
                    </div>
                    <div className="flex flex-col w-[220px] h-[200px] bg-secondaryColor rounded-[10px]">
                        <div className="w-full h-[115px]">
                            <Image
                                src={agent2}
                                alt="Agent"
                                className="w-full h-full rounded-t-[10px]"
                            />
                        </div>
                        <h2 className="ml-[10px] mt-[5px] text-lg text-blackColor font-semibold font-Poppins">Darlene Robertson</h2>
                        <span className="ml-[10px] mt-[2px] text-xs text-[#3A3A3C] font-normal font-Poppins">Corretor de imóveis</span>
                        <Link href="https://wa.me/+224952574322" target="_blank" className="ml-[10px] mt-[7px] text-sm text-textColor font-semibold font-Poppins flex items-center gap-2">Contate o vendedor <MoveRight /> </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InitialPartners;
