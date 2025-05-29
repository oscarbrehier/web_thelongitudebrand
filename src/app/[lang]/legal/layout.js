import { Suspense } from "react";
import LoadingPanel from "@/app/components/LoadingPanel";
import SubMenu from "@/app/components/navigation/SubMenu";

export default async function Layout(props) {
    const params = await props.params;

    const {
        lang
    } = params;

    const {
        children
    } = props;

    "customer-service", "privacy-policy", "cookie-policy"

    const categories = [
        "contact-us", 
        {
            title: "terms-&-conditions",
            route: "terms-conditions"
        }, 
        "customer-service",
        "privacy-policy",
        "cookie-policy",
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