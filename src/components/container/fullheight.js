'use client'
import { useAppContext } from "@/lib/context";
import { useEffect, useState } from "react";

export const FullHeight = ({ children }) => {

    const [windowSize, setWindowSize] = useState({
        height: null,
        width: null
    });
    const [navbar, setNavbar] = useState(null);

    const { height, setHeight } = useAppContext();

    useEffect(() => {

        // const getNavbarHeight = () => {

        //     console.log(height);

        // };
        
        setWindowSize({ height: window.innerHeight, width: window.innerWidth });

        // window.addEventListener('navbar_resize', getNavbarHeight);

        // return () => {

        //     window.removeEventListener('navbar_resize', getNavbarHeight);

        // };

    }, [])

    useEffect(() => {

        setNavbar(height);

    }, [height]);

    return (

        // <div style={{ height: `${windowSize.height !== 0 && windowSize.height - navbar}px` }} className="w-full bg-red-400">
        <div  className="w-full h-screen">
            {children}
        </div>

    );

};