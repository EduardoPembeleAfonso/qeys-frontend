import { Api } from "@/app/api/Axios";
import IBankAccounts from "@/utils/interface/bankAccounts.interfaces";
import { toast } from "sonner";
import colors from "tailwindcss/colors";

export async function getBankAccounts(): Promise<IBankAccounts[]> {
  try {
    const response = await Api.get("/bank-account");
    const bank: IBankAccounts[] = response.data;
    return bank;
  } catch {
    toast("Houve uma falha ao buscar as conta bancarias!", {
      style: {
        backgroundColor: colors.red[600],
        color: colors.white,
        border: 0,
      },
    });
    return [];
  }
}
