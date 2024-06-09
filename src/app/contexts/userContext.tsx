'use client'
import { Dispatch, ReactNode, createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { fireAuth, fireStoreDB } from '@/Firebase/base';
import { useIsLoading } from "./isLoadingContext";

interface defType extends Record<string, any> { };

type userContextProviderProps = {
  children: ReactNode;
};

type userContext = {
  user: defType | null,
  setUser: Dispatch<React.SetStateAction<defType>>;
}

export const UserContext = createContext<userContext | null>(null);

export const UserContextProvider = ({ children }: userContextProviderProps) => {
  const { setIsLoading } = useIsLoading();
  const [user, setUser] = useState<defType | null>(null);

  useEffect(() => {
    const authStream = onAuthStateChanged(fireAuth, (userObj) => {
      if (userObj) {
        const touristStream = onSnapshot(doc(fireStoreDB, 'Tourists/' + userObj.uid), (snapshot) => {
          if (snapshot.exists()) {
            const touristTemp: defType = ({ id: snapshot.id, ...snapshot.data() });
            const userTemp = {
              uid: userObj.uid,
              email: userObj.displayName ? userObj.email : '',
              tourist: touristTemp
            }
            setUser(userTemp);
            setIsLoading(false);
          }
        });
        return () => touristStream();
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      authStream();
    }
  }, [setIsLoading])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be within a cartContextProvider");
  }
  return context;
}
