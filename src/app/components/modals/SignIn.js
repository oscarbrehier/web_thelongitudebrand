"use client"
import Input from "../ui/Input";
import { useEffect, useState } from "react";
import { useModalContext } from "@/lib/context/ModalContext";
import { signIn } from "@/lib/authentication/service";
import { signInSchema } from "@/lib/constants/zodSchema";
import Button from "../ui/Button";
import handleFirebaseError from "@/lib/firebase/handleFirebaseError";
import ModalContainer from "./ModalContainer";

const FORM_DEFAULT = {
    submit: false,
    error: null,
    email: "",
    password: "",
};

export default function SignInModal() {

    const { activeModal, openModal, closeModal } = useModalContext();

    const [form, setForm] = useState(FORM_DEFAULT);
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (event) => {

        event.preventDefault();
        setLoading(true);
        setForm(prev => ({ ...prev, submit: true, error: null }));

        try {

            const formData = new FormData(event.target);

            const data = {
                email: formData.get("email"),
                password: formData.get("password"),
            };

            signInSchema.parse(data);

            await signIn(data.email, data.password);
            closeModal();

        } catch (error) {

            if (error.errors) {

                const errors = error.errors.reduce((acc, curr) => {

                    acc[curr.path[0]] = curr.message;
                    return acc;

                }, {});

                setForm(prev => ({
                    ...prev,
                    email: errors.email || "",
                    password: errors.password || "",
                }));

            } else if (error.code) {

                const formatError = handleFirebaseError(error.code);
                setForm(prev => ({ ...prev, error: formatError }));

            } else {

                setForm(prev => ({ ...prev, error: "An error occured. Please try again or come back later." }));

            };

        } finally {

            setLoading(false);
            setForm(prev => ({ ...prev, submit: false }));

        };

    };

    useEffect(() => {

        if (activeModal === "sign_in") setForm(FORM_DEFAULT);

    }, activeModal);

    return (

        <ModalContainer title="sign in">

            <form onSubmit={handleFormSubmit} className="space-y-4 mt-4">

                <div className="space-y-2 mt-8">

                    <Input
                        title='email'
                        type='email'
                        error={form.email}
                    />

                    <Input
                        title='password'
                        type='password'
                        error={form.password}
                    />

                </div>

                <div className="mt-4 space-y-2 w-full">

                    <Button
                        title="login"
                        size="w-full h-10"
                        type="submit"
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

                <div className="text-sm mt-6 space-y-2">

                    <p>Forgot your password?</p>
                    <div className="flex">
                        <p className="text-neutral-500">Don't have an account? &nbsp;</p>
                        <p className="cursor-pointer capitalize" onClick={() => openModal('sign_up')}>sign up</p>
                    </div>

                </div>

            </form>

        </ModalContainer>

    );

};