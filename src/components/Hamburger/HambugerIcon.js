'use client'
import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";

export const HamburgerIcon = ({ action, size }) => {

    const [active, setActive] = useState(false);

    const handleMode = () => {

        action();
        setActive(!active);

    };

    return (

        <button className={`text-2xl`} onClick={handleMode}>{active ? <IoClose/> : <IoMenu />}</button>

    );

};