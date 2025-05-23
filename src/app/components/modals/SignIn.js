"use client"
import Input from "../ui/Input";
import { useEffect, useState } from "react";
import { useModalContext } from "@/lib/context/ModalContext";
import signIn from "@/lib/authentication/signIn";
import { signInSchema } from "@/lib/constants/zodSchema";
import Button from "../ui/Button";
import handleFirebaseError from "@/lib/firebase/handleFirebaseError";
import ModalContainer from "./ModalContainer";
import Link from "next/link";
import { useRouter } from "next/navigation";

const FORM_DEFAULT = {
    submit: false,
    error: null,
    email: "",
    password: "",
};

export default function SignInModal() {

    const router = useRouter();
    const { activeModal, openModal, closeModal } = useModalContext();

    const [form, setForm] = useState(FORM_DEFAULT);
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (event) => {

        event.preventDefault();
        setLoading(true);
        setForm(prev => ({ ...prev, submit: true, error: null }));

        try {

            console.log("attempting to sign in");

            const formData = new FormData(event.target);

            const data = {
                email: formData.get("email"),
                password: formData.get("password"),
            };

            signInSchema.parse(data);

            await signIn(data.email, data.password);

            console.log("successfully logged in");
            
            closeModal();
            router.push("/customer/personal-information");

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

    }, [activeModal]);

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

                    <Link href="/auth/reset-password">Forgot your password?</Link>
                    <div className="flex">
                        <p className="text-neutral-500">Don't have an account? &nbsp;</p>
                        <p className="cursor-pointer capitalize underline" onClick={() => openModal('sign_up')}>sign up</p>
                    </div>

                </div>

            </form>

        </ModalContainer>

    );

};