export const formateCurrency = (value: string) => {
    const amount = new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(+value);
  
    return amount;
  };
  