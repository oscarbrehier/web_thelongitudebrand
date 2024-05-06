'use client'
import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {

    let [height, setHeight] = useState(null);

    return (

        <AppContext.Provider value={{ height, setHeight }}>
            {children}
        </AppContext.Provider>

    );

};

export function useAppContext() {

    return useContext(AppContext);

};