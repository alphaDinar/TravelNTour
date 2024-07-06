'use client';
import { useCurrency } from "@/app/contexts/currencyContext";
import { useExchangeRate } from "@/app/contexts/exchangeRateContext";
import { FC } from "react";

type PriceTagProps = {
  amount: number
}
const PriceTag: FC<PriceTagProps> = ({ amount }) => {
  const { exchangeRate } = useExchangeRate();
  const { currency } = useCurrency();

  return (
    <span>{currency.symbol} {(exchangeRate * amount).toLocaleString()}</span>
  );
}

export default PriceTag;