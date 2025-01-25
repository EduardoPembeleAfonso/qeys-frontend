import { Api } from "@/app/api/Axios";
import IUser from "@/utils/interface/user.interfaces";
import axios from "axios";
import { toast } from "sonner";
import colors from "tailwindcss/colors";

export async function resetPassword(email: string, password: string): Promise<IUser | null> {
  try {
    const data = {
      email,
      password
    };
    const response = await Api.post("/auth/reset-password", data);
    toast("Senha alterada com sucesso!", {
      style: {
        backgroundColor: colors.violet[800],
        color: colors.white,
        border: 0,
      },
    });
    const user: IUser = response.data;
    return user;
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
    toast("Houve uma falha em alterar a senha!", {
      style: {
        backgroundColor: colors.red[600],
        color: colors.white,
        border: 0,
      },
    });
    return null;
  }
}
