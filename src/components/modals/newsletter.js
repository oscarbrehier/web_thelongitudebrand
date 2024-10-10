import { useModalContext } from "@/lib/context/ModalContext";
import Input from "../ui/Input";
import { IoClose } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";
import LoadingSpinner from "../ui/loadingSpinner";

export default function NewsletterModal() {

    const { activeModal, closeModal } = useModalContext();

    const [progress, setProgress] = useState(0);

    const handleCloseModal = () => {

        closeModal();
        setProgress(0);

    };

    useEffect(() => {

        if (activeModal == "newsletter") {

            const interval = setInterval(() => {
                setProgress((oldProgress) => {
                    if (oldProgress === 100) {
                        clearInterval(interval);
                        return oldProgress;
                    }
                    return Math.min(oldProgress + 1, 100);
                });
            }, 50);

            return () => {
                clearInterval(interval);
            };

        };

    }, [activeModal]);

    return (

        <div className={`${activeModal !== 'newsletter' && 'hidden'} h-screen w-full fixed p-4 z-20 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 bg-black bg-opacity-20`}>

            <div className="flex w-full h-full xl:col-start-4 lg:col-start-3 md:col-start-2 md:col-span-2 col-start-1 col-span-full items-start">

                <div className="h-auto w-full bg-cream-100 p-4">

                    <div className="w-full h-auto flex justify-between items-center">

                        <p className="text-sm capitalize">newsletter</p>

                        <button onClick={handleCloseModal} className="h-full bg-neon-green p-1">
                            <IoClose />
                        </button>

                    </div>

                    <div className="mt-8 space-y-2">

                        <p className="text-base">thank you for subscribing to our newsletter</p>

                        <div className="relative w-full">
                            <div className="w-full h-1 bg-neutral-200 absolute"></div>
                            <div style={{ width: `${progress}%` }} className="h-1 bg-neon-green absolute"></div>
                        </div>

                    </div>

                </div>


            </div>

        </div>

    );

};