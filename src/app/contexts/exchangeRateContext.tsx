'use client'
import { Dispatch, ReactNode, createContext, useContext, useState } from "react";

type ExchangeRateContextProviderProps = {
  children: ReactNode;
};

type exchangeRateContext = {
  exchangeRate: number,
  setExchangeRate: Dispatch<React.SetStateAction<number>>;
}

export const ExchangeRateContext = createContext<exchangeRateContext | null>(null);

export const ExchangeRateContextProvider = ({ children }: ExchangeRateContextProviderProps) => {
  const [exchangeRate, setExchangeRate] = useState<number>(1);

  return (
    <ExchangeRateContext.Provider value={{ exchangeRate, setExchangeRate }}>
      {children}
    </ExchangeRateContext.Provider>
  )
}

export const useExchangeRate = () => {
  const context = useContext(ExchangeRateContext);
  if (!context) {
    throw new Error("useExchangeRateContext must be within layout");
  }
  return context;
}
