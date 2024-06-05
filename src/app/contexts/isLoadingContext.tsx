'use client'
import { Dispatch, ReactNode, createContext, useContext, useState } from "react";

type isLoadingContextProviderProps = {
  children: ReactNode;
};

type isLoadingContext = {
  isLoading: boolean,
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
}

export const IsLoadingContext = createContext<isLoadingContext | null>(null);

export const IsLoadingContextProvider = ({ children }: isLoadingContextProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <IsLoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </IsLoadingContext.Provider>
  )
}

export const useIsLoading = () => {
  const context = useContext(IsLoadingContext);
  if (!context) {
    throw new Error("useIsLoadingContext must be within a ContextProvider");
  }
  return context;
}
