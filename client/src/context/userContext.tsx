"use client"

import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  accountEmail: string;
  setAccountEmail: (email: string)=>void;
};



const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [accountEmail, setAccountEmail] = useState<string>('');
    return (
        <UserContext.Provider value={{ accountEmail, setAccountEmail }}>
        {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};