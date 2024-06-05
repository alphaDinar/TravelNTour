'use client'
import { Dispatch, ReactNode, createContext, useContext, useState } from "react";

type notify = {
  active: boolean,
  type: string,
  text: string
}

type notifyContextProviderProps = {
  children: ReactNode;
};

type notifyContext = {
  notify: notify,
  setNotify: Dispatch<React.SetStateAction<notify>>;
}

export const NotifyContext = createContext<notifyContext | null>(null);

export const NotifyContextProvider = ({ children }: notifyContextProviderProps) => {
  const [notify, setNotify] = useState<notify>({
    active: false,
    type: 'pass',
    text: 'Room Created successfully'
  });

  return (
    <NotifyContext.Provider value={{ notify, setNotify }}>
      {children}
    </NotifyContext.Provider>
  )
}

export const useNotify = () => {
  const context = useContext(NotifyContext);
  if (!context) {
    throw new Error("useNotify must be within a notifyProvider");
  }
  return context;
}
