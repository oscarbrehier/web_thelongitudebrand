import { Suspense } from "react";
import LoadingPanel from "@/app/components/LoadingPanel";
import SubMenu from "@/app/components/navigation/SubMenu";

export default function Layout({
    children,
    params: {
        lang
    }
}) {

    const categories = [
        "contact_us", 
        "terms_conditions",
        "customer_service",
        "privacy_policy",
        "cookie_policy",
    ];

    return (

        <div className="min-h-screen w-full pt-16 flex flex-col">

            <Suspense fallback={<LoadingPanel/>}>

                <div className="w-full flex-1 flex flex-col items-start">

                    <SubMenu
                        baseRoute="/legal"
                        items={categories}
                        lang={lang}
                    />

                    {children}

                </div>

            </Suspense>

        </div>

    );

};