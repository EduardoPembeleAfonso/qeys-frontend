import { Api } from "@/app/api/Axios";
import IProperties from "@/utils/interface/properties.interfaces";
import { toast } from "sonner";
import colors from "tailwindcss/colors";

export async function getProperties(): Promise<IProperties[]> {
  try {
    const response = await Api.get("/properties");
    const properties: IProperties[] = response.data;
    return properties;
  } catch {
    toast("Houve uma falha ao buscar as propriedades!", {
      style: {
        backgroundColor: colors.red[600],
        color: colors.white,
        border: 0,
      },
    });
    return [];
  }
}
