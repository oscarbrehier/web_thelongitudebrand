import { Suspense } from "react";
import LoadingPanel from "@/app/components/LoadingPanel";
import SubMenu from "@/app/components/navigation/SubMenu";
import SignOutButton from "./button-sign-out";

export default function Layout({
    children,
    params: {
        lang
    }
}) {

    const categories = ["personal_information", "orders", "wishlist"];

    return (

        <div className="min-h-screen w-full pt-16 flex flex-col">

            <Suspense fallback={<LoadingPanel />}>

                <div className="w-full flex-1 flex flex-col items-start">

                    <SubMenu
                        baseRoute="/customer"
                        items={categories}
                        lang={lang}
                    >
                        
                        <SignOutButton
                            title="sign out"
                            className="text-sm hover:bg-neon-green"
                        />

                    </SubMenu>

                    {children}

                </div>

            </Suspense>

        </div>

    );

};