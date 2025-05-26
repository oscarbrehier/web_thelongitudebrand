import { Suspense } from "react";
import LoadingPanel from "@/app/components/LoadingPanel";
import SubMenu from "@/app/components/navigation/SubMenu";
import SignOutButton from "./button-sign-out";

export default async function Layout(props) {

    const params = await props.params;

    const {
        lang
    } = params;

    const {
        children
    } = props;

    const customerPages = ["personal-information", "orders", "wishlist"];


    return (

        <Suspense fallback={<LoadingUI />}>

            <div className="mt-16">
                <SubMenu
                    baseRoute="/customer"
                    items={customerPages}
                    lang={lang}
                >

                    <SignOutButton
                        title="sign out"
                        className="text-sm hover:bg-neon-green"
                    />

                </SubMenu>
            </div>

            <div className={`w-full flex flex-col flex-1`}>
                {children}
            </div>

        </Suspense>

    );
};

function LoadingUI() {
    return (
        <div className="w-full pt-16 flex flex-col min-h-screen">
            <LoadingPanel />
        </div>
    );
};