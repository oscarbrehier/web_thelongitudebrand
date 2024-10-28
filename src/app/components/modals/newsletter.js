"use client"
import { useModalContext } from "@/lib/context/ModalContext";
import { useState, useEffect, useRef } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { doc, setDoc, Timestamp } from "@firebase/firestore";
import { database } from "@/lib/firebase/client";
import { newsletterSchema } from "@/lib/constants/zodSchema";
import handleFirebaseError from "@/lib/firebase/handleFirebaseError";
import ModalContainer from "./ModalContainer";

const FORM_DEFAULT = {
    error: "",
    firstName: "",
    lastName: "",
    email: "",
    terms: false,
    termsError: "",
    success: false
};

export default function NewsletterModal() {

    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState(FORM_DEFAULT);

    const { activeModal, closeModal, value } = useModalContext();

    useEffect(() => {

        if (activeModal === "newsletter") {

            if (form.success) {

                const interval = setInterval(() => {

                    setProgress((oldProgress) => {

                        if (oldProgress === 100) {

                            clearInterval(interval);
                            closeModal();

                            return oldProgress;

                        };
                        return Math.min(oldProgress + 1, 100);

                    });

                }, 50);

                return () => {
                    clearInterval(interval);
                };

            };

        };


    }, [activeModal, form]);

    const handleFormSubmit = async (event) => {

        event.preventDefault();
        setLoading(true);
        setForm(prev => ({
            ...prev,
            firstName: null,
            lastName: null,
            email: null,
            termsError: null,
            error: null
        }));

        try {

            const formData = new FormData(event.target);
            const data = {
                firstName: formData.get("firstName"),
                lastName: formData.get("lastName"),
                email: formData.get("email"),
                terms: formData.get("terms") !== null,
            };

            newsletterSchema.parse(data);

            const docRef = doc(database, "newsletter", data.email);
            await setDoc(docRef, {
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                dateSubscribed: Timestamp.now()
            });

            setForm(prev => ({ ...prev, success: true }));

        } catch (error) {

            if (error.errors) {

                const errors = error.errors.reduce((acc, curr) => {

                    acc[curr.path[0]] = curr.message;
                    return acc;

                }, {});

                setForm(prev => ({
                    ...prev,
                    firstName: errors.firstName || null,
                    lastName: errors.lastName || null,
                    email: errors.email || null,
                    termsError: !!errors.terms ? true : false,
                }));

            } else if (error.code) {

                const response = handleFirebaseError(error.code);
                setForm(prev => ({ ...prev, error: response }));

            } else {

                setForm(prev => ({
                    ...prev,
                    error: err ? "" : "An error occured. Please try again or come back later",
                }));

            };

        } finally {

            setLoading(false);

        };

    };

    useEffect(() => {

        if (activeModal === "newsletter") {
            
            setForm(FORM_DEFAULT);
            setProgress(0);

        };

    }, [activeModal]);

    return (

        <ModalContainer title="newsletter">

            <form onSubmit={handleFormSubmit} className={`space-y-4 mt-4 ${form.success && 'hidden'}`}>

                <p className="text-sm">Sign up to receive news about Longitude collections, Longitude Paper, events and sales.</p>

                <div className="mt-8 space-y-2">

                    <div className="w-full grid grid-cols-2 gap-2">

                        <Input
                            title="first name"
                            // reset={resetInputs}
                            error={form.firstName}
                        />

                        <Input
                            title="last name"
                            // reset={resetInputs}
                            error={form.lastName}
                        />

                    </div>

                    <Input
                        title="email"
                        // reset={resetInputs}
                        value={value && value}
                        error={form.email}
                    />



                </div>

                <div className="flex text-xs space-x-4">

                    <input
                        type="checkbox"
                        name="terms"
                        checked={form.terms}
                        onChange={() => setForm(prev => ({ ...prev, terms: !prev.terms }))}
                    />

                    <p className={form.termsError && "text-error-red"}>
                        By selecting "Subscribe", you are confirming that you have read and agree to thelongitudebrand's <span>Terms & Conditions</span>
                    </p>

                </div>

                <div className="mt-4 space-y-4">

                    <Button
                        title="subscribe"
                        type={"submit"}
                        size="w-full h-10"
                        loading={loading}
                    />

                    <>
                        {
                            form.error && (
                                <p className="text-sm text-error-red w-full">{form.error}</p>
                            )
                        }
                    </>

                </div>

            </form>

            <section className={`${!form.success && 'hidden'} mt-4 space-y-4`}>

                <p>
                    Thank you for subscribing to our newsletter!
                </p>

                <div className="relative w-full">
                    <div className="w-full h-1 bg-neutral-200 absolute"></div>
                    <div style={{ width: `${progress}%` }} className="h-1 bg-neon-green absolute"></div>
                </div>

            </section>

        </ModalContainer>

    );

};