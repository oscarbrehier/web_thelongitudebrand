'use client'
import { NavigationBar } from "../navigation/bar";
import Footer from "../footer";
import { useAppContext } from "@/lib/context";
import { useEffect, useRef } from "react";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const PageContainer = ({ children }) => {

    // const { height } = useAppContext();

    const containerRef = useRef();
    const childRef = useRef();

    useEffect(() => {

        const container = containerRef.current;
        const child = childRef.current;

        const tlChild = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'top top',
                end: 'bottom top',
                scrub: true
            },
        });

        tlChild.to(child, {
            backgroundColor: "#fff"
        });

        return () => tlChild.kill();

    }, []);

    return (

        <div ref={childRef} className="h-auto w-full bg-primary-blue">

            {/* <div style={{ paddingTop: `${height}px` }}> */}
            <NavigationBar position={'fixed'} ref={containerRef} />

            {/* <div className="h-auto w-full fixed bottom-0 flex justify-between px-6 py-4 z-30">
                <a href="/shop" className="flex items-center justify-center pointer-events-auto">
                    <p className="text-primary-blue hover:bg-primary-blue hover:text-white p-2 font-helvetica75 font-bold text-5xl">shop</p>
                </a>

                <a href="/cart" className="flex items-center justify-center pointer-events-auto">
                    <p className="text-primary-blue hover:bg-primary-blue hover:text-white p-2 font-helvetica75 font-bold text-5xl">cart:</p>
                </a>
            </div> */}

            <div className="z-20 relative">
                {children}
            </div>
            
            <Footer />

        </div>

    );

};