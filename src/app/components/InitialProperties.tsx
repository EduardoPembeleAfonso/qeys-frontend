import Image from "next/image";
import React from "react";
import { image7 } from "../assets/images";

const InitialProperties: React.FC = () => {
    return (
        <div className="mt-[30px] w-full h-[300px] bg-white flex flex-col items-center justify-center">
            <h2 className="text-[40px] font-bold font-Poppins text-center text-blackColor">Explore nossas propriedades</h2>
            <p className="text-center text-[#8E8E93] text-sm font-normal font-Poppins mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel lobortis justo
            </p>
            <div className="flex items-center justify-between">
                <div className="w-[160px] h-[190px] px-[22px] flex flex-col items-center justify-center">
                    <div className="w-[116px] h-[116px]">
                        <Image
                            src={image7}
                            alt="Logo"
                            className="w-full h-full rounded-full"
                        />
                    </div>
                    <h1 className="text-lg text-blackColor text-center font-semibold font-Poppins">Luanda</h1>
                    <span className="text-sm text-[#3A3A3C] self-center text-center font-normal font-Poppins">1750 imoveis</span>
                </div>
                <div className="w-[160px] h-[190px] px-[22px] flex flex-col items-center justify-center">
                    <div className="w-[116px] h-[116px]">
                        <Image
                            src={image7}
                            alt="Logo"
                            className="w-full h-full rounded-full"
                        />
                    </div>
                    <h1 className="text-lg text-blackColor text-center font-semibold font-Poppins">Huambo</h1>
                    <span className="text-sm text-[#3A3A3C] self-center text-center font-normal font-Poppins">1750 imoveis</span>
                </div>
                <div className="w-[160px] h-[190px] px-[22px] flex flex-col items-center justify-center">
                    <div className="w-[116px] h-[116px]">
                        <Image
                            src={image7}
                            alt="Logo"
                            className="w-full h-full rounded-full"
                        />
                    </div>
                    <h1 className="text-lg text-blackColor text-center font-semibold font-Poppins">Benguela</h1>
                    <span className="text-sm text-[#3A3A3C] self-center text-center font-normal font-Poppins">1750 imoveis</span>
                </div>
                <div className="w-[160px] h-[190px] px-[22px] flex flex-col items-center justify-center">
                    <div className="w-[116px] h-[116px]">
                        <Image
                            src={image7}
                            alt="Logo"
                            className="w-full h-full rounded-full"
                        />
                    </div>
                    <h1 className="text-lg text-blackColor text-center font-semibold font-Poppins">Malanje</h1>
                    <span className="text-sm text-[#3A3A3C] self-center text-center font-normal font-Poppins">1750 imoveis</span>
                </div>
                <div className="w-[160px] h-[190px] px-[22px] flex flex-col items-center justify-center">
                    <div className="w-[116px] h-[116px]">
                        <Image
                            src={image7}
                            alt="Logo"
                            className="w-full h-full rounded-full"
                        />
                    </div>
                    <h1 className="text-lg text-blackColor text-center font-semibold font-Poppins">Uíge</h1>
                    <span className="text-sm text-[#3A3A3C] self-center text-center font-normal font-Poppins">1750 imoveis</span>
                </div>
                <div className="w-[160px] h-[190px] px-[22px] flex flex-col items-center justify-center">
                    <div className="w-[116px] h-[116px]">
                        <Image
                            src={image7}
                            alt="Logo"
                            className="w-full h-full rounded-full"
                        />
                    </div>
                    <h1 className="text-lg text-blackColor text-center font-semibold font-Poppins">Cabinda</h1>
                    <span className="text-sm text-[#3A3A3C] self-center text-center font-normal font-Poppins">1750 imoveis</span>
                </div>
            </div>
        </div>
    );
};

export default InitialProperties;
