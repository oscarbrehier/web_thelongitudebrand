'use client'
import { useEffect, useState } from "react";


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
            <span className={`${cityName == 'Paris' && 'font-bold'} text-primary-blue`}>{cityName}</span> : {time}
        </p>

    );

};

export default function Footer() {

    const cities = [
        { name: "Athens", timeZone: 3 },
        { name: "Paris", timeZone: 2 },
        { name: "Sydney", timeZone: 10 },
        { name: "New York", timeZone: -4 },
        { name: "Tokyo", timeZone: 9 }
    ];


    return (

        <footer className="h-auto w-full bg-white z-40 relative flex justify-between p-8 ">

            <div className="uppercase font-helvetica children:text-primary-blue">
                {/* <p>ATH: 22:42</p>
                    <p>CDG: 22:42</p>
                    <p>SYD: 22:42</p>
                    <p>JFK: 22:42</p>
                    <p>TYO: 22:42</p> */}
                {cities.map(city => (
                    <CityTime key={city.name} cityName={city.name} timeZone={city.timeZone} />
                ))}
            </div>

            <div className="space-x-12 flex">

                <div className="h-full uppercase font-helvetica children:text-primary-blue">
                    <p>services client</p>
                    <p>terms and conditions</p>
                    <p>privacy policy</p>
                    <p>account</p>
                </div>

                <div className="h-full uppercase font-helvetica children:text-primary-blue">
                    <p>newsletter</p>
                    <p>instagram</p>
                    <p>x</p>
                </div>

            </div>

        </footer>

    );

};