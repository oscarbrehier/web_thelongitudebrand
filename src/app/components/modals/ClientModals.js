"use client"
import { useModalContext } from "@/lib/context/ModalContext";
import { useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const modals = {
    sign_in: dynamic(() => import("./SignIn")),
    sign_up: dynamic(() => import("./SignUp")),
    newsletter: dynamic(() => import("./Newsletter")),
    added_cart: dynamic(() => import("./AddedToCart")),
};

export default function ClientModals({ children }) {
    
    const pathname = usePathname();
    const { activeModal } = useModalContext();

    const isContentBlurred = activeModal && activeModal !== "added_cart";

    const ActiveModalComponent = useMemo(() => {

        if (!activeModal) return null;
        return modals[activeModal];

    }, [activeModal]);

    return (

        <div className="grid">

            <div className="col-start-1 row-start-1">
                {(activeModal === "added_cart" && pathname.includes("/shop/")) && (
                    
                    <ActiveModalComponent />

                )}
            </div>

            <div className={`h-auto w-full col-start-1 row-start-1 ${isContentBlurred && 'blur-md'}`}>
                {children}
            </div>

            {activeModal && activeModal !== "added_cart" && <ActiveModalComponent />}

        </div>

    );

};