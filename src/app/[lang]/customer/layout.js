'use client'
import { useState } from "react";
import { PageContainer } from "@/components/container/page";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Layout({ 
    children,
    params: {
        lang
    }
 }) {

    const pathname = usePathname();

    const categories = ["personal-information", "orders", "wishlist"];

    return (

        <PageContainer lang={lang}>

            <div className="min-h-screen w-full md:pt-16 pt-24 flex flex-col">

                <div className="w-full flex-1 flex flex-col items-start">

                    <div className="w-full flex xs:flex-row flex-col xs:items-center items-start text-sm xs:space-x-4 xs:space-y-0 space-y-1 cursor-pointer">

                        {
                            categories && categories.map((category, index) => (
                                <Link
                                    href={`/customer/${category}`}
                                    key={index}
                                    className={`${pathname.toString().includes(`/customer/${category}`) && 'bg-neon-green'}`}
                                >
                                    {category.replace(/-/g, ' ')}
                                    </Link>
                            ))
                        }

                    </div>

                    {children}

                </div>

            </div>

        </PageContainer>

    )

}