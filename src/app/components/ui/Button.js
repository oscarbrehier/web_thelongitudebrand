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
    disabled = false,
    ...props
}) {

    const [status, setStatus] = useState(loading);
    useEffect(() => {
        setStatus(loading)
    }, [loading]);

    const btnOutline = `
        bg-transparent border-[1px] ${" "}
        ${disabled ? "border-cream-400" : "border-black"}
    `;

    const btnFill = `
        ${disabled ? "bg-cream-400" : "bg-black"}
    `;

    const buttonClasses = `
        ${border ? btnOutline : btnFill}
        ${(!loading && !disabled) && "hover:bg-neon-green"}
        ${loading ? "cursor-not-allowed" : ""}
        select-none flex items-center justify-center text-sm transition-all duration-300 ease-in-out box-border	
        ${size} ${style} ${text}
    `;

    return (

        <button
            className={buttonClasses}
            onClick={!disabled ? onClick : undefined}
            disabled={disabled}
            {...props}
        >

            {
                status ? (

                    <LoadingSpinner />

                ) : (

                    <p
                        className={border
                            ? (disabled ? "text-neutral-500" : "text-black")
                            : (disabled ? "text-neutral-500" : "text-white hover:text-black")
                    }>
                        {title}</p>

                )
            }

        </button>

    )

};