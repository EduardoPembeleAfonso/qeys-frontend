import { Api } from "@/app/api/Axios";
import IBankAccounts from "@/utils/interface/bankAccounts.interfaces";
import { toast } from "sonner";
import colors from "tailwindcss/colors";

export async function deleteBankAccounts(id: string): Promise<IBankAccounts | null> {
  try {
    await Api.delete(`/bank-account/${id}`);
    toast("Conta bancaria apagada com sucesso!", {
      style: {
        backgroundColor: colors.violet[800],
        color: colors.white,
        border: 0,
      },
    });
    return null;
  } catch (e) {
    console.log(e)
    toast("Houve uma falha em apagar a conta bancaria!", {
      style: {
        backgroundColor: colors.red[600],
        color: colors.white,
        border: 0,
      },
    });
    return null;
  }
}
