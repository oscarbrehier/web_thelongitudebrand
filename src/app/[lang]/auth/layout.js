import { Suspense } from "react";

export default async function Layout({
    children
}) {

    return (

        <Suspense>
            <div className="min-h-screen w-full">
                {children}
            </div>
        </Suspense>

    );

};