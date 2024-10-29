"use client"
import SignInModal from "./SignIn";
import SignUpModal from "./SignUp";
import NewsletterModal from "./Newsletter";
import { useModalContext } from "@/lib/context/ModalContext";

export default function ClientModals({ children }) {

    const { activeModal } = useModalContext();

    return (

        <>

            <div className={`h-auto w-full ${activeModal !== null ? 'blur-md' : ''}`}>
                {children}
            </div>

            {activeModal === "sign_in" && (<SignInModal />)}
            {activeModal === "sign_up" && (<SignUpModal />)}
            {activeModal === "newsletter" && (<NewsletterModal />)}
            
        </>

    );

};