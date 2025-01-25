import { Api } from "@/app/api/Axios";
import IUser from "@/utils/interface/user.interfaces";
import axios from "axios";
import { toast } from "sonner";
import colors from "tailwindcss/colors";

export async function verifyToken(email: string, code: string): Promise<IUser | null> {
  try {
    const data = {
      email,
      token: code
    };
    const response = await Api.post("/auth/verify-token", data);
    toast("Código de verificação insirado válidado com sucesso!", {
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
        toast("O código de verificação insirado é inválido! Por favor solicite outro.", {
          style: {
            backgroundColor: colors.amber[600],
            color: colors.white,
            border: 0,
          },
        });
        return null;
      }
    }
    toast("Houve uma falha em confirmar o código de verificação!", {
      style: {
        backgroundColor: colors.red[600],
        color: colors.white,
        border: 0,
      },
    });
    return null;
  }
}
