import React, { useContext, createContext, PropsWithChildren } from 'react';
import RootStore from "./RootStore";

const StoreContext = createContext(RootStore);

export const StoreProvider: any = ({ children }: any) => {
  return (
    <StoreContext.Provider
      value={RootStore}
    >
      {children}
    </StoreContext.Provider>);
};

export const useStores = () => {
  return useContext(StoreContext);
};
