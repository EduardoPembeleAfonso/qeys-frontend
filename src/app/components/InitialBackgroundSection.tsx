import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const locations = [
    { label: "Bengo", value: "Bengo" },
    { label: "Benguela", value: "Benguela" },
    { label: "Bié", value: "Bié" },
    { label: "Cabinda", value: "Cabinda" },
    { label: "Cunene", value: "Cunene" },
    { label: "Cuando-Cubango", value: "Cuando-Cubango" },
    { label: "Huíla", value: "Huíla" },
    { label: "Huambo", value: "Huambo" },
    { label: "Kwanza-Sul", value: "Kwanza-Sul" },
    { label: "Kwanza-Norte", value: "Kwanza-Norte" },
    { label: "Luanda", value: "Luanda" },
    { label: "Luanda-Sul", value: "Luanda-Sul" },
    { label: "Luanda-Norte", value: "Luanda-Norte" },
    { label: "Malanje", value: "Malanje" },
    { label: "Moxico", value: "Moxico" },
    { label: "Namibe", value: "Namibe" },
    { label: "Uíge", value: "Uíge" },
    { label: "Zaire", value: "Zaire" },
];
interface SectionProps {
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
    isForSale: boolean;
    setIsForSale: Dispatch<SetStateAction<boolean>>;
    address: string;
    setAddress: Dispatch<SetStateAction<string>>;
}
export default function InitialBackgroundSection({ search, setSearch, isForSale, setIsForSale, setAddress }: SectionProps) {
    return (
        <section className="flex items-center justify-center gap-20 w-full h-[516px] bg-[url('/initialBackground.png')] bg-no-repeat bg-cover">
            <div>
                <h1 className='text-[40px] text-secondaryColor font-bold font-Poppins w-[300px] h-auto'>Encontre sua residência perfeita conosco</h1>
                <p className='text-base text-secondaryColor font-semibold font-Poppins w-[380px] h-auto'>Descubra conosco a propriedade dos seus sonhos - onde o perfeito encontra o possível em todas as casas.</p>
            </div>
            <div className='w-[441px] h-[250px]'>
                <div className="w-[226px] mt-1 h-[40px] bg-secondaryColor rounded-tr-[10px] border-none flex items-center justify-between">
                    <button onClick={() => setIsForSale(false)} className={`w-[115px] rounded-tr-[10px] h-full ${!isForSale ? 'bg-textColor text-secondaryColor' : 'bg-transparent text-textColor'} transition-all duration-300 text-base font-semibold font-Poppins`}>
                        Aluguel
                    </button>
                    <button onClick={() => setIsForSale(true)} className={`w-[115px] rounded-tr-[10px] h-full ${isForSale ? 'bg-textColor text-secondaryColor' : 'bg-transparent text-textColor'} transition-all duration-300 text-base  font-semibold font-Poppins`}>
                        Comprar
                    </button>
                </div>
                <form className='bg-secondaryColor flex flex-col w-full h-full p-[22px] rounded-tr-[10px] rounded-b-[10px] '>
                    <div className="w-full flex flex-col gap-1">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Digite a palavra-chave..."
                            className="h-[54px] w-[390px] text-[#8E8E93] text-sm font-Poppins font-normal px-4 placeholder-[#8E8E93] bg-secondaryColor border border-[#E5E5EA] rounded-[10px] outline-none transition-all disabled:cursor-not-allowed"
                        />
                    </div>
                    <div className="w-[390px] flex flex-col gap-1 mt-7">
                        <Select onValueChange={setAddress}>
                            <SelectTrigger className="h-[54px] w-full text-[#8E8E93] text-sm font-Poppins font-normal px-4 placeholder-[#8E8E93] bg-secondaryColor border border-[#E5E5EA] rounded-[10px] outline-none transition-all disabled:cursor-not-allowed">
                                <SelectValue placeholder="Localização" />
                            </SelectTrigger>
                            <SelectContent>
                                {locations.map((category) => (
                                    <SelectItem key={category.value} value={category.value}>
                                        {category.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='flex items-center justify-between px-[22px] mt-7 w-[190px] h-[54px] bg-secondaryColor text-textColor hover:bg-textColor hover:text-secondaryColor border border-textColor rounded-[10px] text-[15px] font-bold font-Poppins'>
                        <button>Pesquisar agora</button>
                        <SearchIcon />
                    </div>
                </form>
            </div>
        </section>
    )
}