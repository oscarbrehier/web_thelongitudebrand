import { useModalContext } from "@/lib/context/ModalContext";
import { IoClose } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";
import LoadingSpinner from "../ui/loadingSpinner";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { doc, setDoc, Timestamp } from "@firebase/firestore";
import { database } from "@/lib/authentication/firebase";

export default function NewsletterModal() {

    const [resetInputs, setResetInputs] = useState(false);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        submit: false,
        error: "",
        firstName: "",
        lastName: "",
        email: "",
        newsletter: false,
        success: false
    });

    const { activeModal, closeModal, value } = useModalContext();


    const handleCloseModal = () => {

        closeModal();
        setForm(prev => ({ ...prev, success: false }));
        setProgress(0);
        setResetInputs(true);

    };

    useEffect(() => {

        if (resetInputs == true) setResetInputs(false);

    }, [resetInputs])

    useEffect(() => {

        if (activeModal == "newsletter" && form.success) {

            const interval = setInterval(() => {

                setProgress((oldProgress) => {

                    if (oldProgress === 100) {

                        clearInterval(interval);
                        handleCloseModal();

                        return oldProgress;

                    };
                    return Math.min(oldProgress + 1, 100);

                });

            }, 50);

            return () => {
                clearInterval(interval);
            };

        };

    }, [activeModal, form]);

    const handleFormSubmit = async (event) => {

        event.preventDefault();
        setLoading(true);
        setForm(prev => ({ ...prev, error: "", submit: true }));

        const { email, firstName, lastName, newsletter } = form;

        if (!newsletter) {

            setForm(prev => ({ ...prev, error: "You must agree to the terms and conditions before proceeding." }));
            setLoading(false);
            return;

        };


        try {

            const docRef = doc(database, "newsletter", email);
            await setDoc(docRef, {
                email,
                firstName,
                lastName,
                dateSubscribed: Timestamp.now()
            });

        } catch (err) {

            setForm(prev => ({ ...prev, error: "An error occured, please try again later." }));

        };

        setLoading(false);
        
        if (form.error) return;

        // handleCloseModal();
        setForm(prev => ({ ...prev, success: true }));

    };

    return (

        <div className={`${activeModal !== 'newsletter' && 'hidden'
            } h-screen w-full fixed p-4 z-20 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 bg-black bg-opacity-20`}>

            <div className="flex w-full h-full xl:col-start-4 lg:col-start-3 md:col-start-2 md:col-span-2 col-start-1 col-span-full items-start">

                <div className="h-auto w-full bg-cream-100 p-4">

                    <div className="w-full h-auto flex justify-between items-center">

                        <p className="text-sm capitalize">newsletter</p>

                        <button onClick={handleCloseModal} className="h-full bg-neon-green p-1">
                            <IoClose />
                        </button>

                    </div>

                    <section className={`space-y-4 mt-4 ${form.success && 'hidden'}`}>

                        <p className="text-sm">Sign up to receive news about Longitude collections, Longitude Paper, events and sales.</p>

                        <div className="mt-8 space-y-2">

                            <div className="w-full grid grid-cols-2 gap-2">

                                <Input
                                    title="first name"
                                    onChange={(value) => setForm(prev => ({ ...prev, firstName: value }))}
                                    validate={form.submit}
                                    reset={resetInputs}
                                />

                                <Input
                                    title="last name"
                                    onChange={(value) => setForm(prev => ({ ...prev, lastName: value }))}
                                    validate={form.submit}
                                    reset={resetInputs}
                                />

                            </div>

                            <Input
                                title="email"
                                type="email"
                                onChange={(value) => setForm(prev => ({ ...prev, email: value }))}
                                validate={form.submit}
                                reset={resetInputs}
                                value={value && value}
                            />



                        </div>

                        <div className="flex text-xs space-x-4">
                            <input
                                checked={form.newsletter}
                                onChange={() => setForm(prev => ({ ...prev, newsletter: !prev.newsletter }))}
                                type="checkbox"
                            />
                            <p>
                                By selecting "Subscribe", you are confirming that you have read and agree to thelongitudebrand's <span>Terms & Conditions</span>
                            </p>
                        </div>

                        <div className="mt-4 space-y-4">

                            <div onClick={(event) => handleFormSubmit(event)} className="w-full h-10 bg-black flex items-center justify-center cursor-pointer">

                                {
                                    loading
                                        ? <LoadingSpinner />
                                        : <p className="text-white text-sm capitalize">subscribe</p>
                                }

                            </div>

                            <>
                                {
                                    form.error && (
                                        <p className="text-sm text-error-red w-full">{form.error}</p>
                                    )
                                }
                            </>

                        </div>

                    </section>

                    <section className={`${!form.success && 'hidden'} mt-4 space-y-4`}>

                        <p>
                            Thank you for subscribing to our newsletter!
                        </p>

                        <div className="relative w-full">
                            <div className="w-full h-1 bg-neutral-200 absolute"></div>
                            <div style={{ width: `${progress}%` }} className="h-1 bg-neon-green absolute"></div>
                        </div>

                    </section>

                </div>


            </div>

        </div>

    );

};