'use client'
import { Dispatch, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { getZoneFromCoordinates } from "../External/location";
import { currencyList } from "../External/lists";
import { useExchangeRate } from "./exchangeRateContext";
import { getExchangeRate } from "../External/currency";

type currency = {
  tag: string,
  symbol: string,
  img: string,
}

type CurrencyContextProviderProps = {
  children: ReactNode;
};

type currencyContext = {
  currency: currency,
  setCurrency: Dispatch<React.SetStateAction<currency>>;
}

export const CurrencyContext = createContext<currencyContext | null>(null);

export const CurrencyContextProvider = ({ children }: CurrencyContextProviderProps) => {
  const { setExchangeRate } = useExchangeRate();
  const [currency, setCurrency] = useState<currency>(currencyList.find((el) => el.tag === 'USD')!);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const zone = await getZoneFromCoordinates(latitude, longitude);
            if (zone.continent === 'europe') {
              const exchangeRate = await getExchangeRate('EUR');
              setExchangeRate(exchangeRate);
              setCurrency(currencyList.find((el) => el.tag === 'EUR')!);
            } else if (zone.country === 'england') {
              const exchangeRate = await getExchangeRate('GBP');
              setExchangeRate(exchangeRate);
              setCurrency(currencyList.find((el) => el.tag === 'GBP')!)
            } else if (zone.country === 'ghana') {
              const exchangeRate = await getExchangeRate('GHS');
              setExchangeRate(exchangeRate);
              setCurrency(currencyList.find((el) => el.tag === 'GHS')!)
            }
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    };

    return () => getLocation();
  }, [setExchangeRate])

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be within a currencyProvider");
  }
  return context;
}
