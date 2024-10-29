"use client"
import { useState } from "react";
import { PageContainer } from "@/app/components/container/PageContainer";
import { Suspense } from "react";
import { useAuthContext } from "@/lib/context/AuthContext";
import LoadingPanel from "@/app/components/LoadingPanel";

export default function Layout({ children, params: { lang } }) {

    const { loadingCart } = useAuthContext();

    return (

        // <Suspense>

        <PageContainer lang={lang}>

            <div className="min-h-screen w-full relative">

                <section className={`w-full min-h-screen flex flex-col pt-12 absolute`}>

                    <div className="h-40 w-full md:grid grid-cols-4 gap-4 flex flex-col justify-center md:items-end items-center space-y-3 my-10">

                        <div className="h-full flex justify-start items-center col-start-2">
                            <div className="bg-neon-green">
                                <h1 className="capitalize font-playfair italic font-medium text-6xl">cart</h1>
                            </div>
                        </div>

                    </div>

                    {children}

                </section>

                {loadingCart && <LoadingPanel/>}

            </div>

        </PageContainer>



        // </Suspense>

    );

};