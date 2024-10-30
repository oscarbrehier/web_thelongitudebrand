import { Suspense } from "react";
import Navbar from "./Navbar";
import LoadingPanel from "@/app/components/LoadingPanel";

export default function Layout({
    children,
    params: {
        lang
    }
}) {

    const categories = ["personal-information", "orders", "wishlist"];

    return (

        <div className="min-h-screen w-full pt-16 flex flex-col">

            <Suspense fallback={<LoadingPanel/>}>

                <div className="w-full flex-1 flex flex-col items-start">

                    <Navbar categories={categories} />

                    {children}

                </div>

            </Suspense>

        </div>

    );

};