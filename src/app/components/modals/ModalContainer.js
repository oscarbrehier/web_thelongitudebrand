import { useModalContext } from "@/lib/context/ModalContext";
import clsx from "clsx";
import { useRef } from "react";
import { IoClose } from "react-icons/io5";
import { tv } from "tailwind-variants";

const container = tv({
    base: "h-screen w-full fixed p-4 z-40 bg-black/20",
    variants: {
        display: {
            grid: "grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2",
            flex: "block"
        }
    },
    defaultVariants: {
        display: "grid"
    },
});

const modal = tv({
    base: "flex w-full h-full",
    variants: {
        position: {
            "top": "xl:col-start-4 lg:col-start-3 md:col-start-2 md:col-span-2 col-start-1 col-span-full items-start",
            "center": "xl:col-start-4 lg:col-start-3 md:col-start-2 md:col-span-2 col-start-1 col-span-full items-center",
            "bottom": "xl:col-start-4 lg:col-start-3 md:col-start-2 md:col-span-2 col-start-1 col-span-full items-end",
            // "center-center": `
            //     items-center justify-center
            //     col-span-full
            //     md:col-start-2 md:col-span-1
            //     lg:col-start-2 lg:col-span-2
            //     xl:col-start-2 xl:col-span-2
            // `,
            "center-center": "items-center justify-center",
        }
    },
    defaultVariants: {
        position: "top"
    },
});

export default function ModalContainer({
    children,
    title,
    position,
    preventClose,
    size = null,
}) {

    const { closeModal } = useModalContext();
    const mouseDownOnModal = useRef(false);

    const handleCloseSignal = () => {
        if (!preventClose) closeModal();
    };

    return (

        <div
            className={container({ display: position === "center-center" ? "flex" : "grid" })}
            onMouseDown={e => {
                mouseDownOnModal.current = e.target === e.currentTarget;
            }}
            onClick={(e) => {
                if (mouseDownOnModal.current && e.target === e.currentTarget) handleCloseSignal();
                mouseDownOnModal.current = false;
            }}
        >

            <div
                className={modal({ position })}
            >

                <div className={clsx("h-auto bg-cream-100 p-4", size ? size : "w-full")} onClick={(e) => e.stopPropagation()}>

                    <div className="w-full h-auto flex justify-between items-center mb-4">

                        <p className="text-sm capitalize">{title}</p>

                        {
                            !preventClose && (
                                <button onClick={() => closeModal()} className="h-full bg-neon-green p-1 z-50">
                                    <IoClose />
                                </button>
                            )
                        }

                    </div>

                    {children}

                </div>

            </div>

        </div>

    );

};