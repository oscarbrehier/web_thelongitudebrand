'use client'
import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";

export const HamburgerIcon = ({ size }) => {

    const [active, setActive] = useState(false);

    return (

        <button className={`text-2xl`} onClick={() => setActive(!active)}>{active ? <IoClose/> : <IoMenu />}</button>

    );

};