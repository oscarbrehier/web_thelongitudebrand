'use client'
import { useModalContext } from "@/lib/context/ModalContext";
import { useState } from "react";

export default function Newsletter() {

    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState(false);

    const { openModal } = useModalContext();

    const validateEmail = (email) => {
        
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

    };

    const handleSubmit = () => {

        const isValid = validateEmail(inputValue);
        setError(!isValid);

    };

    return (

        <section className="h-auto w-full py-2 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">

            <div className="flex flex-col space-y-2 sm:col-span-2">

                <p className="capitalize font-playfair text-4xl italic">newsletter</p>

                <div className={`w-full text-xs ${error && 'text-red-600'}`}>

                    {
                        error
                            ? "please provide a valid email adress"
                            : "don’t miss out on the latest news, private sales and exclusive offers. sign up to our newsletter"
                    }

                </div>

                <div className="w-full h-10 bg-cream-300 flex">

                    <div className="flex-1 h-full">

                        <input
                            className="w-full h-full outline-none bg-transparent text-sm placeholder:text-neutral-900 placeholder:capitalize px-2"
                            type="email"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="email"
                            />

                    </div>

                    <div className="w-auto h-full flex items-center justify-end text-sm p-2 children:capitalize">
                        <button onClick={() => openModal('newsletter')} className={`${inputValue != '' ? 'block' : 'hidden'}`}>subscribe</button>
                    </div>

                </div>

            </div>

            {/* <div className="col-start-1 h-10">
                <button>
                    subscribe
                </button>
            </div> */}

        </section>

    );

};