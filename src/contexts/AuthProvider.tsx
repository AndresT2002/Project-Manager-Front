"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { Provider } from "jotai";
import { useAuth } from "@/hooks/useAuth";

// Contexto para proporcionar el hook useAuth
const AuthContext = createContext<ReturnType<typeof useAuth> | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuth();

  return (
    <Provider>
      <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
    </Provider>
  );
};

// Hook para usar el contexto de autenticación
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
