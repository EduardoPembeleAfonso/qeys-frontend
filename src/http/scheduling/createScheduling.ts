import { Api, authorId } from "@/app/api/Axios";
import IScheduling from "@/utils/interface/scheduling.interfaces";
import { toast } from "sonner";
import colors from "tailwindcss/colors";

export async function createScheduling(date: string, time: string, contact: string,
  description: string, propertiesId: string): Promise<IScheduling | null> {
  try {
    const form = {
      date,
      time,
      contact,
      description,
      userId: authorId,
      propertiesId
    }
    const response = await Api.post("/scheduling", form);
    toast("Agendamento de visita a propriedade feito com sucesso!", {
      style: {
        backgroundColor: colors.violet[800],
        color: colors.white,
        border: 0,
      },
    });
    const scheduling: IScheduling = response.data;
    return scheduling;
  } catch {
    toast("Houve uma falha em agendar a visita a propriedade!", {
      style: {
        backgroundColor: colors.red[600],
        color: colors.white,
        border: 0,
      },
    });
    return null;
  }
}
