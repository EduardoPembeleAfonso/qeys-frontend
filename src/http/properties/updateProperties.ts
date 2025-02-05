import { Api } from "@/app/api/Axios";
import IProperties from "@/utils/interface/properties.interfaces";
import { toast } from "sonner";
import colors from "tailwindcss/colors";

export async function updateProperties(id: string, image: any, address: string, price: string, numberBathrooms: string,
  numberBedrooms: string, areaProperty: string,
  title: string, description: string, coordinates: string, selectedOption: string): Promise<IProperties | null> {
  try {
    const form = new FormData();
    form.append("address", address);
    form.append("areaProperty", areaProperty);
    form.append("numberBathrooms", numberBathrooms);
    form.append("title", title);
    form.append("numberBedrooms", numberBedrooms);
    form.append("description", description);
    form.append("coordinates", coordinates);
    form.append("price", price);
    form.append("isForSale", selectedOption);
    if (image) {
      form.append("photo", image);
    }
    await Api.put(`/properties/${id}`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast("Propriedade editada com sucesso", {
      style: {
        backgroundColor: colors.violet[800],
        color: colors.white,
        border: 0,
      },
    });
    return null;
  } catch {
    toast("Houve uma falha em editar a propriedade!", {
      style: {
        backgroundColor: colors.red[600],
        color: colors.white,
        border: 0,
      },
    });
    return null;
  }
}
