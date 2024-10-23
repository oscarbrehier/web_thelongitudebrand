"use client"
import { useEffect, useState } from "react"

export default function Button({
    title,
    size,
    border = false,
    loading,
    ...props
}) {

    const [status, setStatus] = useState(loading);
    useEffect(() => {
        setStatus(loading)
    }, [loading])

    return (

        <button
            className={`
                ${border
                    ? 'bg-transparent border-[1px] border-black hover:bg-neon-green'
                    : 'bg-black hover:bg-neon-green'
                }
                select-none
                capitalize text-sm transition-all duration-300 ease-in-out`
                + ' ' + size
            }
            {...props}
        >

            {
                status ? (

                    <div
                        className="inline-block size-6 animate-spin rounded-full border-2 border-solid border-current border-e-neutral-700 align-[-0.125em] text-neon-green motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status">
                        <span
                            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                        >Loading...</span>
                    </div>

                ) : (

                   <p className={border ? "hover:text-black" : "text-white"}>{title}</p>
                
                )
            }

        </button>

    )

};