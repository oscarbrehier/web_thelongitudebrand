"use client"
import { useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import LoadingSpinner from "./loadingSpinner";
import { useRouter } from "next/navigation";

const buttonVariants = tv({
    base: "select-none flex items-center justify-center text-sm transition-all duration-300 ease-in-out box-border",
    variants: {
        variant: {
            fill: "",
            outline: "bg-transparent border-[1px]"
        },
        disabled: {
            true: "",
            false: ""
        },
        loading: {
            true: "cursor-not-allowed",
            false: ""
        }
    },
    compoundVariants: [
        // Fill variant styles
        {
            variant: "fill",
            disabled: true,
            class: "bg-cream-400"
        },
        {
            variant: "fill",
            disabled: false,
            class: "bg-black"
        },
        // Outline variant styles
        {
            variant: "outline",
            disabled: true,
            class: "border-cream-400"
        },
        {
            variant: "outline",
            disabled: false,
            class: "border-black"
        },
        // Hover states (only when not loading and not disabled)
        {
            loading: false,
            disabled: false,
            class: "hover:bg-neon-green"
        }
    ]
})

const textVariants = tv({
    base: "",
    variants: {
        variant: {
            fill: "",
            outline: ""
        },
        disabled: {
            true: "text-neutral-500",
            false: ""
        }
    },
    compoundVariants: [
        // Fill variant text colors
        {
            variant: "fill",
            disabled: false,
            class: "text-white hover:text-black"
        },
        // Outline variant text colors
        {
            variant: "outline",
            disabled: false,
            class: "text-black"
        }
    ]
})

export default function Button({
    children,
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
    }, [loading])

    const variant = border ? "outline" : "fill"

    const buttonClasses = buttonVariants({
        variant,
        disabled,
        loading: status,
        className: `${size} ${style} ${text}`
    })

    const textClasses = textVariants({
        variant,
        disabled
    });

    return (
        <button
            className={buttonClasses}
            onClick={!disabled ? onClick : undefined}
            disabled={disabled}
            {...props}
        >
            {status ? (
                <LoadingSpinner />
            ) : (
                <p className={textClasses}>
                    {children}
                </p>
            )}
        </button>
    )
}