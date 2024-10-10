'use client'
import { createContext, useContext, useState } from "react";

export const ModalContext = createContext();
export const useModalContext = () => useContext(ModalContext);

export default function ModalProvider({ children }) {

    const [activeModal, setActiveModal] = useState(null);

    const openModal = (modalName) => {
        setActiveModal(modalName);
    };

    const closeModal = () => {
        setActiveModal(null);
    };

    return (

        <ModalContext.Provider value={{ activeModal, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>

    )

}