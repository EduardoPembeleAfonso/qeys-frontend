"use client"
import { DataTable } from "@/app/components/TableBasic";
// import { useAuth } from "@/app/contexts/ContextProvider";
// import { useRouter } from "next/navigation";
import 'react-responsive-modal/styles.css';
import { ChangeEvent, FormEvent, useState } from "react";
import { Modal } from 'react-responsive-modal';
import { ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { createProperties } from "@/http/properties/createProperties";
import Header from "@/app/components/Header";

export default function Page() {
  // const router = useRouter()
  // const { authState } = useAuth()
  const [open, setOpen] = useState(false);
  const [selectImage, setSelectImage] = useState("");
  const [image, setImage] = useState<unknown>(null);
  const [title, setTitle] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [numberBathrooms, setNumberBathrooms] = useState("");
  const [numberBedrooms, setNumberBedrooms] = useState("");
  const [areaProperty, setAreaProperty] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");



  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file ?? null);
    setSelectImage(file ? URL.createObjectURL(file) : "");
  };

  async function handleCreatePublicity(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true);
    createProperties(image, address, price, numberBathrooms,
      numberBedrooms, areaProperty,
      title, description, coordinates)
    setIsLoading(false);
    setOpen(false)
  }

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);


  // useEffect(() => {
  //   if (!authState?.authenticated) {
  //     return router.replace("/sign-in")
  //   }
  // }, [])


  return (
    <main className="w-full flex-1 flex flex-col gap-10">
      <Header onMenuToggle={() => {}} search={search} setSearch={setSearch} />
      <div className="bg-white w-full p-10 rounded-xl flex flex-col justify-center items-center">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-600 tracking-wide">
            Novas Propriedades
          </h2>
          <button
            type="button"
            onClick={onOpenModal}
            className="w-[110px] h-10 flex justify-center items-center rounded-xl border border-primaryColor text-primaryColor font-medium active:scale-95 hover:bg-primaryColor hover:text-gray-100 transition-all"
          >
            Criar
          </button>
        </div>

        <div className="mt-8 w-full">
          <DataTable />
        </div>
      </div>
      <Modal open={open} onClose={onCloseModal} center>
        <form onSubmit={handleCreatePublicity} className="sm:max-w-[600px] border-0 p-0 bg-white sm:rounded-[32px]">
          <div className="relative h-[160px] flex justify-center items-center bg-slate-900 rounded-xl p-0 mt-4">
            {selectImage ? (
              <div className="relative w-full">
                <Image
                  src={selectImage}
                  width={500}
                  height={200}
                  alt="biva"
                  className="h-[160px]"
                />
                <div className="absolute bg-black/50 bottom-0 top-0 w-full h-full " />
              </div>
            ) : (
              <>
                <label
                  htmlFor="image"
                  className="relative cursor-pointer rounded-xl flex justify-center items-center border border-gray-200 w-40 h-36"
                >
                  <ImageIcon className="size-10" />
                </label>
                <input
                  type="file"
                  accept=".png, .jpg"
                  id="image"
                  onChange={(e) => handleImage(e)}
                  className="hidden"
                />
              </>
            )}
          </div>

          <div className="grid gap-2 py-2 px-5 mt-1">
            <div className="flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <Input
                type="text"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
              <div className="gap-3 flex flex-row items-center justify-between">
                <Input
                  type="text"
                  placeholder="Price"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
                <Input
                  type="text"
                  placeholder="Area Property"
                  onChange={(e) => setAreaProperty(e.target.value)}
                  value={areaProperty}
                />
              </div>
              <div className="gap-3 flex flex-row items-center justify-between">
                <Input
                  type="text"
                  placeholder="Number Bathrooms"
                  onChange={(e) => setNumberBathrooms(e.target.value)}
                  value={numberBathrooms}
                />
                <Input
                  type="text"
                  placeholder="Number Bedrooms"
                  onChange={(e) => setNumberBedrooms(e.target.value)}
                  value={numberBedrooms}
                />
              </div>
              <div className="gap-3 flex flex-row items-center justify-between">
                <Input
                  type="text"
                  placeholder="Address"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
                <Input
                  type="text"
                  placeholder="Coordinates"
                  onChange={(e) => setCoordinates(e.target.value)}
                  value={coordinates}
                />
              </div>


              <div className="w-full h-[1px] bg-gray-200" />

              <div className="mx-auto w-full pb-4 flex items-center sm:justify-center gap-8">
                <Button
                  type="submit"
                  variant={"default"}
                  disabled={isLoading}
                  className="w-full max-w-[230px] disabled:cursor-not-allowed bg-slate-900 hover:bg-slate-800 active:scale-[.98] transition-all"
                >
                  Registrar Propriedade
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </main>
  );
}


