import { Api } from "@/app/api/Axios";
import IScheduling from "@/utils/interface/scheduling.interfaces";
import { toast } from "sonner";
import colors from "tailwindcss/colors";

export async function updateScheduling(id: string, date: string, time: string, contact: string,
  description: string, userId: string, propertiesId: string): Promise<IScheduling | null> {
  try {

    const form = {
      id,
      date,
      time,
      contact,
      description,
      userId,
      propertiesId
    }
    const response = await Api.put(`/scheduling/${id}`, form);
    toast("Agendamento atualizado com sucesso!", {
      style: {
        backgroundColor: colors.violet[800],
        color: colors.white,
        border: 0,
      },
    });
    const scheduling: IScheduling = response.data;
    return scheduling;
  } catch {
    toast("Houve uma falha em atualizar o agendamento!", {
      style: {
        backgroundColor: colors.red[600],
        color: colors.white,
        border: 0,
      },
    });
    return null;
  }
}
