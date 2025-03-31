"use client"

import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
    accountEmail: string;
    setAccountEmail: (email: string)=>void;
    accountId: number;
    setAccountId: (id: number)=>void;
};



const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [accountId, setAccountId] = useState<number>(0);
    const [accountEmail, setAccountEmail] = useState<string>('');
    return (
        <UserContext.Provider value={{ accountId, setAccountId, accountEmail, setAccountEmail }}>
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