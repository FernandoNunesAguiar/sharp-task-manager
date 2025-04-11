"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface UserContextType {
    accountId: number;
    setAccountId: (id: number)=>void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProps{
    children: ReactNode;
}


export const UserProvider = ({ children }: UserProps) => {
    const [accountId, setAccountId] = useState<number>(0);
    return (
      <UserContext.Provider value={{ accountId, setAccountId }}>
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