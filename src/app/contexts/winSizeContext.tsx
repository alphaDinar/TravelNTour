'use client'
import { Dispatch, ReactNode, createContext, useContext, useState, useEffect } from "react";

type winSizeContextProviderProps = {
  children: ReactNode;
};

type winSizeContext = {
  winSize: number,
  setWinSize: Dispatch<React.SetStateAction<number>>;
}

export const WinSizeContext = createContext<winSizeContext | null>(null);

export const WinSizeContextProvider = ({ children }: winSizeContextProviderProps) => {
  const [winSize, setWinSize] = useState<number>(1200);

  useEffect(() => {
    if (typeof window !== undefined) {
      setWinSize(window.innerWidth);
      window.onresize = () => {
        setWinSize(window.innerWidth);
      }
    }
  }, [])

  return (
    <WinSizeContext.Provider value={{ winSize, setWinSize }}>
      {children}
    </WinSizeContext.Provider>
  )
}

export const useWinSize = () => {
  const context = useContext(WinSizeContext);
  if (!context) {
    throw new Error("useWinSizeContext must be within a cartContextProvider");
  }
  return context;
}
