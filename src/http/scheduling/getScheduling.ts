import { Api } from "@/app/api/Axios";
import IScheduling from "@/utils/interface/scheduling.interfaces";
import { toast } from "sonner";
import colors from "tailwindcss/colors";

export async function getScheduling(): Promise<IScheduling[]> {
  try {
    const response = await Api.get("scheduling");
    const scheduling: IScheduling[] = response.data;
    return scheduling;
  } catch {
    toast("Houve uma falha ao buscar os agendamentos de propriedades!", {
      style: {
        backgroundColor: colors.red[600],
        color: colors.white,
        border: 0,
      },
    });
    return [];
  }
}
