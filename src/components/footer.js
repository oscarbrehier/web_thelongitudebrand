'use client'
import { useEffect, useState } from "react";
import Link from "next/link";

const CityTime = ({ cityName, timeZone }) => {

    const [time, setTime] = useState('');

    useEffect(() => {

        const timer = setInterval(() => {
            setTime(getCurrentTime(timeZone));
        }, 1000);

        return () => clearInterval(timer);

    }, [timeZone]);

    function getCurrentTime(offset) {

        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);

        const cityTime = new Date(utc + (3600000 * offset));
        const hours = (cityTime.getHours() < 10 ? '0' : '') + cityTime.getHours();
        const minutes = (cityTime.getMinutes() < 10 ? '0' : '') + cityTime.getMinutes();
        const seconds = (cityTime.getSeconds() < 10 ? '0' : '') + cityTime.getSeconds();

        return `${hours}:${minutes}:${seconds}`;

    }

    return (

        <p>
            <span className={`${cityName == 'Paris' && 'font-bold'}`}>{cityName}</span> : {time}
        </p>

    );

};

export default function Footer() {

    const [openMenu, setOpenMenu] = useState(null);

    const cities = [
        { name: "Athens", timeZone: 3 },
        { name: "Paris", timeZone: 2 },
        { name: "Sydney", timeZone: 10 },
        { name: "New York", timeZone: -4 },
        { name: "Tokyo", timeZone: 9 }
    ];

    useEffect(() => {
        
        if (openMenu !== null) {

            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });

        };

    }, [openMenu]);

    const handleMenuToggle = (menuId) => {
        setOpenMenu(openMenu === menuId ? null : menuId);
    };

    return (

        <footer className="h-auto w-full mt-10 mb-4">

            <section className="h-auto w-full py-2 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">

                <div className="flex flex-col space-y-2 sm:col-span-2">

                    <p className="capitalize font-playfair text-4xl italic">newsletter</p>

                    <div className="w-full text-xs">

                        don’t miss out on the latest news, private sales and exclusive offers. sign up to our newsletter

                    </div>

                    <div className="w-full h-10 bg-cream-300 flex">

                        <div className="flex-1 h-full">
                            <input className="w-full h-full outline-none bg-transparent text-sm placeholder:text-neutral-900 px-2" type="email" placeholder="Email" />
                        </div>

                        <div className="w-auto flex items-start justify-end text-xs p-2 children:capitalize">
                            <button>sign up</button>
                        </div>


                    </div>

                </div>

            </section>

            <section className="sm:h-10 w-full bg-neon-green flex sm:flex-row flex-col items-center justify-between children:text-xs children:sm:space-x-4 sm:py-0 py-2">

                <button onClick={() => handleMenuToggle(1)} className="sm:hidden flex items-center justify-between w-full">
                    <p>help & assistance</p>
                    <p className="text-base pt-1">{openMenu === 1 ? '-' : '+'}</p>
                </button>

                <div className={`sm:flex ${openMenu === 1 ? 'w-full flex flex-col px-4 space-y-1' : 'hidden'}`}>
                    <p>shipping</p>
                    <p>billing</p>
                    <p>customer service</p>
                    <p>contact us</p>
                </div>

                <button onClick={() => handleMenuToggle(2)} className="sm:hidden flex items-center justify-between w-full">
                    <p>follow us</p>
                    <p className="text-base pt-1">{openMenu === 2 ? '-' : '+'}</p>
                </button>

                <div className={`sm:flex ${openMenu === 2 ? 'w-full h flex flex-col px-4 space-y-1' : 'hidden'}`}>
                    <p>x</p>
                    <p>instagram</p>
                </div>

            </section>

        </footer>

    );

};