"use client";

import { createContext } from "react";
import { SessionProvider } from "next-auth/react";

interface ProviderParameters {
  children: React.ReactNode;
  mode: string;
}

export const Context = createContext({});
export const Provider = ({ children, mode }: ProviderParameters) => {
  return (
    <SessionProvider>
      <Context.Provider value={{ mode }}>{children}</Context.Provider>
    </SessionProvider>
  );
};
