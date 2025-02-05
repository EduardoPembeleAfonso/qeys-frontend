import { Api } from "@/app/api/Axios";
import { USER_TYPES } from "@/utils/enums/userTypes.enum";
import IUser from "@/utils/interface/user.interfaces";
import { toast } from "sonner";
import colors from "tailwindcss/colors";

export async function updateUser(id: string, image: any, name: string, email: string, selectedOption: string): Promise<IUser | null> {
  try {
    const form = new FormData();
    form.append("name", name);
    form.append("email", email);
    form.append("type", selectedOption.trim() === "Proprietário" ? USER_TYPES.OWNER : USER_TYPES.TENANT);
    if (image) {
      form.append("image", image);
    }
    await Api.put(`/user/${id}`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast("Perfil editado com sucesso!", {
      style: {
        backgroundColor: colors.violet[800],
        color: colors.white,
        border: 0,
      },
    });
    return null;
  } catch {
    toast("Houve uma falha em editar o perfil!", {
      style: {
        backgroundColor: colors.red[600],
        color: colors.white,
        border: 0,
      },
    });
    return null;
  }
}
