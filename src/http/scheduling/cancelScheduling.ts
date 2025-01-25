import { Api } from "@/app/api/Axios";
import IScheduling from "@/utils/interface/scheduling.interfaces";
import { toast } from "sonner";
import colors from "tailwindcss/colors";

export async function cancelScheduling(id: string): Promise<IScheduling | null> {
  try {

    const form = {
      id,
    }
    const response = await Api.put(`/cancel-scheduling/${id}`, form);
    toast("Agendamento cancelado!", {
      style: {
        backgroundColor: colors.violet[800],
        color: colors.white,
        border: 0,
      },
    });
    const scheduling: IScheduling = response.data;
    return scheduling;
  } catch {
    toast("Houve uma falha em cancelar o agendamento!", {
      style: {
        backgroundColor: colors.red[600],
        color: colors.white,
        border: 0,
      },
    });
    return null;
  }
}
