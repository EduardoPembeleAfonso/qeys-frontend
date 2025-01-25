import { Api } from "@/app/api/Axios";
import IProperties from "@/utils/interface/properties.interfaces";
import { toast } from "sonner";
import colors from "tailwindcss/colors";

export async function updateLikes(id: string): Promise<IProperties | null> {
  try {
    const response = await Api.put(`/properties/likes/${id}`);
    const properties: IProperties = response.data;
    return properties;
  } catch {
    toast("Houve uma falha, por favor tentar mais tarde!", {
      style: {
        backgroundColor: colors.red[600],
        color: colors.white,
        border: 0,
      },
    });
    return null;
  }
}
