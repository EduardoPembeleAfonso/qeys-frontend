import { Api, USER_EMAIL } from "@/app/api/Axios";
import IUser from "@/utils/interface/user.interfaces";
import axios from "axios";
import { toast } from "sonner";
import colors from "tailwindcss/colors";

export async function forgotPassword(email: string): Promise<IUser | null> {
  try {
    const data = {
      email,
    };
    await Api.post("/auth/forgot-password", data);
    localStorage.setItem(USER_EMAIL, JSON.stringify(email));
    toast("Código de verificação enviado com sucesso!", {
      style: {
        backgroundColor: colors.violet[800],
        color: colors.white,
        border: 0,
      },
    });
    return null;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      if (status === 400) {
        toast("Usuário não encontrado!", {
          style: {
            backgroundColor: colors.amber[600],
            color: colors.white,
            border: 0,
          },
        });
        return null;
      }
    }
    toast("Houve uma falha em enviar código de verificação!", {
      style: {
        backgroundColor: colors.red[600],
        color: colors.white,
        border: 0,
      },
    });
    return null;
  }
}
