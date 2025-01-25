import Image from "next/image";
import React from "react";
import { companies, companies2, companies3, companies4, companies5, companies6 } from "../assets/images";

const InitialCompanies: React.FC = () => {
    return (
        <div className="mt-[10px] w-full h-auto bg-white flex flex-col items-center justify-center">
            <h2 className="text-black text-base font-extrabold font-Poppins">Aprovado por mais de 150 grandes empresas</h2>
            <div className="mt-[20px] grid grid-cols-6 w-[67%]">
                <div className="w-[90px] h-[70px]">
                    <Image
                        src={companies}
                        alt="Companies"
                        className="w-full h-full"
                    />
                </div>
                <div className="w-[90px] h-[70px]">
                    <Image
                        src={companies2}
                        alt="Companies"
                        className="w-full h-full"
                    />
                </div>
                <div className="w-[90px] h-[70px]">
                    <Image
                        src={companies3}
                        alt="Companies"
                        className="w-full h-full"
                    />
                </div>
                <div className="w-[90px] h-[70px]">
                    <Image
                        src={companies4}
                        alt="Companies"
                        className="w-full h-full"
                    />
                </div>
                <div className="w-[90px] h-[70px]">
                    <Image
                        src={companies5}
                        alt="Companies"
                        className="w-full h-full"
                    />
                </div>
                <div className="w-[90px] h-[70px]">
                    <Image
                        src={companies6}
                        alt="Companies"
                        className="w-full h-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default InitialCompanies;
