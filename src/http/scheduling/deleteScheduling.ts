import { Api } from "@/app/api/Axios";
import IScheduling from "@/utils/interface/scheduling.interfaces";
import { toast } from "sonner";
import colors from "tailwindcss/colors";

export async function deleteScheduling(id: string): Promise<IScheduling | null> {
  try {
    await Api.delete(`/scheduling/${id}`);
    toast("Agendamento apagado com sucesso!", {
      style: {
        backgroundColor: colors.violet[800],
        color: colors.white,
        border: 0,
      },
    });
    return null;
  } catch (e) {
    console.log(e)
    toast("Houve uma falha em apagar o agendamento!", {
      style: {
        backgroundColor: colors.red[600],
        color: colors.white,
        border: 0,
      },
    });
    return null;
  }
}
