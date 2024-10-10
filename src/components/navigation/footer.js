'use client'
import { useEffect, useState } from "react";
import Newsletter from "../Newsletter";

export default function Footer() {

    const [activeMenu, setActiveMenu] = useState(null);

    useEffect(() => {
        
        if (activeMenu !== null) {

            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });

        };

    }, [activeMenu]);

    const handleMenuToggle = (menuId) => {
        setActiveMenu(activeMenu === menuId ? null : menuId);
    };

    return (

        <footer className="h-auto w-full mt-10 mb-4">

            <Newsletter />

            <section className="sm:h-10 w-full bg-neon-green flex sm:flex-row flex-col items-center justify-between children:text-xs children:sm:space-x-4 sm:py-0 py-2">

                <button onClick={() => handleMenuToggle(1)} className="sm:hidden flex items-center justify-between w-full">
                    <p>help & assistance</p>
                    <p className="text-base pt-1">{activeMenu === 1 ? '-' : '+'}</p>
                </button>

                <div className={`sm:flex ${activeMenu === 1 ? 'w-full flex flex-col px-4 space-y-1' : 'hidden'}`}>
                    <p>shipping</p>
                    <p>billing</p>
                    <p>customer service</p>
                    <p>contact us</p>
                </div>

                <button onClick={() => handleMenuToggle(2)} className="sm:hidden flex items-center justify-between w-full">
                    <p>follow us</p>
                    <p className="text-base pt-1">{activeMenu === 2 ? '-' : '+'}</p>
                </button>

                <div className={`sm:flex ${activeMenu === 2 ? 'w-full h flex flex-col px-4 space-y-1' : 'hidden'}`}>
                    <p>x</p>
                    <p>instagram</p>
                </div>

            </section>

        </footer>

    );

};