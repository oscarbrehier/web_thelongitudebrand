"use client"
import { useModalContext } from "@/lib/context/ModalContext";
import { useMemo } from "react";
import dynamic from "next/dynamic";

const modals = {
    sign_in: dynamic(() => import("./SignIn")),
    sign_up: dynamic(() => import("./SignUp")),
    newsletter: dynamic(() => import("./Newsletter")),
    added_cart: dynamic(() => import("./AddedToCart")),
};

export default function ClientModals({ children }) {

    const { activeModal } = useModalContext();

    //     switch (activeModal) {

    //         case "sign_in":
    //             return <SignInModal />;

    //         case "sign_up":
    //             return <SignUpModal />;

    //         case "newsletter":
    //             return <NewsletterModal />;

    //         case "added_cart":
    //             return <AddedToCart />;

    //         default:
    //             return null;

    //     };

    // };

    const isContentBlurred = activeModal && activeModal !== "added_cart";

    const ActiveModalComponent = useMemo(() => {

        if (!activeModal) return null;
        return modals[activeModal];

    }, [activeModal]);

    return (

        <div className="grid">

            <div className="col-start-1 row-start-1">
                {activeModal === "added_cart" && <ActiveModalComponent />}
            </div>

            <div className={`h-auto w-full col-start-1 row-start-1 ${isContentBlurred && 'blur-md'}`}>
                {children}
            </div>

            {activeModal && activeModal !== "added_cart" && <ActiveModalComponent />}

        </div>

    );

};