import { Api } from "@/app/api/Axios";
import IBankAccounts from "@/utils/interface/bankAccounts.interfaces";
import { toast } from "sonner";
import colors from "tailwindcss/colors";

export async function updateBankAccounts(id: string, name: string, iban: string, numberAccount: string, nameBank: string
): Promise<IBankAccounts | null> {
  try {
    const form = {
      name,
      iban,
      numberAccount,
      nameBank
    }
    await Api.put(`/bank-account/${id}`, form);
    toast("Conta bancaria editada com sucesso!", {
      style: {
        backgroundColor: colors.violet[800],
        color: colors.white,
        border: 0,
      },
    });
    return null;
  } catch {
    toast("Houve uma falha em editar a conta bancaria!", {
      style: {
        backgroundColor: colors.red[600],
        color: colors.white,
        border: 0,
      },
    });
    return null;
  }
}
