import { Api, authorId } from "@/app/api/Axios";
import IBankAccounts from "@/utils/interface/bankAccounts.interfaces";
import { toast } from "sonner";
import colors from "tailwindcss/colors";

export async function createBankAccounts(name: string, iban: string, numberAccount: string, nameBank: string): Promise<IBankAccounts | null> {
  try {
    const form = {
      name,
      iban,
      numberAccount,
      nameBank
    }
    await Api.post(`/bank-account/${authorId}`, form);
    toast("Conta bancaria registrada com sucesso!", {
      style: {
        backgroundColor: colors.violet[800],
        color: colors.white,
        border: 0,
      },
    });
    return null;
  } catch {
    toast("Houve uma falha em registrar a conta bancaria!", {
      style: {
        backgroundColor: colors.red[600],
        color: colors.white,
        border: 0,
      },
    });
    return null;
  }
}
