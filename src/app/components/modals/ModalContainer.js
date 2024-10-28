import { useModalContext } from "@/lib/context/ModalContext";
import { IoClose } from "react-icons/io5";

export default function ModalContainer({ children, title, modal }) {

    const { closeModal } = useModalContext();

    return (

        <div
            className={`h-screen w-full fixed p-4 z-20 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 bg-black bg-opacity-20`}
            onClick={closeModal}
        >

            <div
                className="flex w-full h-full xl:col-start-4 lg:col-start-3 md:col-start-2 md:col-span-2 col-start-1 col-span-full items-start"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="h-auto w-full bg-cream-100 p-4">

                    <div className="w-full h-auto flex justify-between items-center">

                        <p className="text-sm capitalize">{title}</p>

                        <button onClick={closeModal} className="h-full bg-neon-green p-1">
                            <IoClose />
                        </button>

                    </div>

                    {children}

                </div>

            </div>

        </div>

    );

};