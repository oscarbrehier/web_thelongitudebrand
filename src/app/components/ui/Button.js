"use client"
import { useEffect, useState } from "react"
import LoadingSpinner from "./loadingSpinner";

export default function Button({
    title,
    size,
    border = false,
    loading,
    onClick,
    style = null,
    text = "capitalize",
    ...props
}) {

    const [status, setStatus] = useState(loading);
    useEffect(() => {
        setStatus(loading)
    }, [loading]);

    const buttonClasses = `
        ${border ? "bg-transparent border-[1px] border-black" : "bg-black"}
        ${!loading && "hover:bg-neon-green"}
        ${loading ? "cursor-not-allowed" : ""}
        select-none flex items-center justify-center text-sm transition-all duration-300 ease-in-out box-border	
        ${size} ${style} ${text}
    `;

    return (

        <button
            className={buttonClasses}
            onClick={onClick}
            {...props}
        >

            {
                status ? (

                    <LoadingSpinner />

                ) : (

                    <p className={border ? "hover:text-black" : "text-white"}>{title}</p>

                )
            }

        </button>

    )

};