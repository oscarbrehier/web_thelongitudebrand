"use client"
import { createContext, useContext, useState } from "react";

export const ModalContext = createContext();
export const useModalContext = () => useContext(ModalContext);

export default function ModalProvider({ children }) {

    const [activeModal, setActiveModal] = useState(null);
    const [value, setValue] = useState(null);

    const openModal = (modalName) => setActiveModal(modalName);

    const closeModal = (modalName) => {
        if (modalName && activeModal != modalName)
            return ;
        setActiveModal(null);
        setValue(null);
    };

    return (

        <ModalContext.Provider value={{ activeModal, openModal, closeModal, value, setValue }}>
            {children}
        </ModalContext.Provider>

    )

}