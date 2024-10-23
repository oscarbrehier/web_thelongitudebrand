"use client"
import SignInModal from "./signIn";
import SignUpModal from "./SignUp";
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
            <SignUpModal />
            <NewsletterModal />
        </div>

    );

};