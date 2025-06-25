"use client"
import { createContext, useCallback, useContext, useState } from "react";

export const ModalContext = createContext();
export const useModalContext = () => useContext(ModalContext);

export default function ModalProvider({ children }) {

    const [activeModal, setActiveModal] = useState(null);
    const [modalProps, setModalProps] = useState(null);
    const [value, setValue] = useState(null);

    const openModal = useCallback((modalName, props) => {
        setActiveModal(modalName);
        setModalProps(props);
    }, []);

    const closeModal = useCallback((modalName) => {
        if (modalName && activeModal !== modalName)
            return;
        setActiveModal(null);
        setValue(null);
        setModalProps(null);
    }, []);

    return (

        <ModalContext.Provider value={{ activeModal, openModal, closeModal, value, setValue, modalProps }}>
            {children}
        </ModalContext.Provider>

    )

}