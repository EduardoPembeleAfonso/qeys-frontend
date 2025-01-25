import { Api } from "@/app/api/Axios";
import IProperties from "@/utils/interface/properties.interfaces";
import { toast } from "sonner";
import colors from "tailwindcss/colors";

export async function deleteProperties(id: string): Promise<IProperties | null> {
  try {
    await Api.delete(`/properties/${id}`);
    toast("Propriedade apagada com sucesso", {
      style: {
        backgroundColor: colors.violet[800],
        color: colors.white,
        border: 0,
      },
    });
    return null;
  } catch (e) {
    console.log(e)
    toast("Houve uma falha em apagar a propriedade!", {
      style: {
        backgroundColor: colors.red[600],
        color: colors.white,
        border: 0,
      },
    });
    return null;
  }
}
