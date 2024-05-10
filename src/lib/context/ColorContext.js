'use client'
import { createContext, useContext, useState } from "react";    

export const ColorContext = createContext();
export const useColorContext = () => useContext(ColorContext);

export const ColorContextProvider = ({ children }) => {

    const colors = {
        'primary-blue': '#4834d4',
    };
    
    const [color, setColor] = useState(colors["primary-blue"]);

    return (

        <ColorContext.Provider value={{ color, setColor }}>
            {children}
        </ColorContext.Provider>

    );

};