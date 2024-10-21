"use client"
import SignInModal from "./signIn";
import RegisterModal from "./register";
import NewsletterModal from "./newsletter";
import { useModalContext } from "@/lib/context/ModalContext";

export default function ClientModals({ children }) {

    const { activeModal } = useModalContext();

    return (

        <div>

            <div className={`h-auto w-full ${activeModal !== null ? 'blur-md' : ''}`}>
                {children}
            </div>

            <SignInModal />
            <RegisterModal />
            <NewsletterModal />
        </div>

    );

};