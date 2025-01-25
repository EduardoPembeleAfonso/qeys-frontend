import Image from "next/image";
import React from "react";
import { img, img2, img3 } from "../assets/images";
import { BathIcon, BedDoubleIcon, HomeIcon, MapIcon } from "lucide-react";

const InitialPropertyNews: React.FC = () => {
    return (
        <div className="mt-[30px] w-full h-auto bg-white flex flex-col items-center justify-center">
            <h2 className="text-[40px] font-bold font-Poppins text-center text-blackColor">Descubra as novidades imobiliárias</h2>
            <p className="text-center text-[#8E8E93] text-xs font-normal font-Poppins mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel lobortis justo
            </p>
            <div className="h-[425px] gap-[25px] flex items-center justify-between">
                <div className="w-[300px] h-[318px] shadow-md border rounded-[10px] px-[18px] py-[16px] flex flex-col items-start">
                    <div className="w-[260px] h-[150px]">
                        <Image
                            src={img}
                            alt="Logo"
                            className="w-full h-full rounded-[10px]"
                        />
                    </div>
                    <h1 className="mt-[14px] text-base text-blackColor text-center font-semibold font-Poppins">Princess Apartment Building</h1>
                    <div className="flex items-center gap-2 mt-[5px]">
                        <MapIcon color="#3A3A3C" className="w-[16px] h-[16px]" />
                        <span className="text-xs text-[#3A3A3C] self-center text-center font-normal font-Poppins">Bairro da Caope B, Viana</span>
                    </div>
                    <div className="flex items-center gap-1 mt-[14px]">
                        <span className="text-[15px] text-textColor font-semibold font-Poppins">3.000.000,00</span>
                        <span className="text-xs text-textColor font-semibold font-Poppins">AOA</span>
                    </div>
                    <div className="w-[260px] flex flex-row items-center justify-between mt-2">
                        <div className="gap-2 flex flex-row items-center justify-between">
                            <BedDoubleIcon color="#3A3A3C" className="w-[16px] h-[]20px" />
                            <p className="text-xs text-[#3A3A3C] font-normal font-Poppins" >4 Quartos</p>
                        </div>
                        <div className="gap-2 flex flex-row items-center justify-between">
                            <BathIcon color="#3A3A3C" className="w-[16px] h-[]20px" />
                            <p className="text-xs text-[#3A3A3C] font-normal font-Poppins" >2 WC</p>
                        </div>
                        <div className="gap-2 flex flex-row items-center justify-between">
                            <HomeIcon color="#3A3A3C" className="w-[16px] h-[]20px" />
                            <p className="text-xs text-[#3A3A3C] font-normal font-Poppins" >20/20</p>
                        </div>
                    </div>
                </div>
                <div className="w-[300px] h-[318px] shadow-md border rounded-[10px] px-[18px] py-[16px] flex flex-col items-start">
                    <div className="w-[260px] h-[150px]">
                        <Image
                            src={img3}
                            alt="Logo"
                            className="w-full h-full rounded-[10px]"
                        />
                    </div>
                    <h1 className="mt-[14px] text-base text-blackColor text-center font-semibold font-Poppins">Rose Rayhaan Building</h1>
                    <div className="flex items-center gap-2 mt-[5px]">
                        <MapIcon color="#3A3A3C" className="w-[16px] h-[16px]" />
                        <span className="text-xs text-[#3A3A3C] self-center text-center font-normal font-Poppins">Bairro da Caope B, Viana</span>
                    </div>
                    <div className="flex items-center gap-1 mt-[14px]">
                        <span className="text-[15px] text-textColor font-semibold font-Poppins">3.000.000,00</span>
                        <span className="text-xs text-textColor font-semibold font-Poppins">AOA</span>
                    </div>
                    <div className="w-[260px] flex flex-row items-center justify-between mt-2">
                        <div className="gap-2 flex flex-row items-center justify-between">
                            <BedDoubleIcon color="#3A3A3C" className="w-[16px] h-[]20px" />
                            <p className="text-xs text-[#3A3A3C] font-normal font-Poppins" >4 Quartos</p>
                        </div>
                        <div className="gap-2 flex flex-row items-center justify-between">
                            <BathIcon color="#3A3A3C" className="w-[16px] h-[]20px" />
                            <p className="text-xs text-[#3A3A3C] font-normal font-Poppins" >2 WC</p>
                        </div>
                        <div className="gap-2 flex flex-row items-center justify-between">
                            <HomeIcon color="#3A3A3C" className="w-[16px] h-[]20px" />
                            <p className="text-xs text-[#3A3A3C] font-normal font-Poppins" >20/20</p>
                        </div>
                    </div>
                </div>
                <div className="w-[300px] h-[318px] shadow-md border rounded-[10px] px-[18px] py-[16px] flex flex-col items-start">
                    <div className="w-[260px] h-[150px]">
                        <Image
                            src={img2}
                            alt="Logo"
                            className="w-full h-full rounded-[10px]"
                        />
                    </div>
                    <h1 className="mt-[14px] text-base text-blackColor text-center font-semibold font-Poppins">JW Marriott Marqui Building</h1>
                    <div className="flex items-center gap-2 mt-[5px]">
                        <MapIcon color="#3A3A3C" className="w-[16px] h-[16px]" />
                        <span className="text-xs text-[#3A3A3C] self-center text-center font-normal font-Poppins">Bairro da Caope B, Viana</span>
                    </div>
                    <div className="flex items-center gap-1 mt-[14px]">
                        <span className="text-[15px] text-textColor font-semibold font-Poppins">3.000.000,00</span>
                        <span className="text-xs text-textColor font-semibold font-Poppins">AOA</span>
                    </div>
                    <div className="w-[260px] flex flex-row items-center justify-between mt-2">
                        <div className="gap-2 flex flex-row items-center justify-between">
                            <BedDoubleIcon color="#3A3A3C" className="w-[16px] h-[]20px" />
                            <p className="text-xs text-[#3A3A3C] font-normal font-Poppins" >4 Quartos</p>
                        </div>
                        <div className="gap-2 flex flex-row items-center justify-between">
                            <BathIcon color="#3A3A3C" className="w-[16px] h-[]20px" />
                            <p className="text-xs text-[#3A3A3C] font-normal font-Poppins" >2 WC</p>
                        </div>
                        <div className="gap-2 flex flex-row items-center justify-between">
                            <HomeIcon color="#3A3A3C" className="w-[16px] h-[]20px" />
                            <p className="text-xs text-[#3A3A3C] font-normal font-Poppins" >20/20</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default InitialPropertyNews;
