"use client"
import { useModalContext } from "@/lib/context/ModalContext";
import Input from "../ui/Input";
import { useState, useEffect } from "react";
import { signUp } from "@/lib/authentication/service";
import { signUpSchema } from "@/lib/constants/zodSchema";
import Button from "../ui/Button";
import handleFirebaseError from "@/lib/firebase/handleFirebaseError";
import ModalContainer from "./ModalContainer";
import Link from "next/link";
import Checkbox from "../ui/Checkbox";

const FORM_DEFAULT = {
    submit: false,
    error: null,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    newsletter: false,
    terms: false,
    termsError: "",
}

export default function SignUpModal() {

    const { activeModal, closeModal } = useModalContext();

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState(FORM_DEFAULT);

    const handleFormSubmit = async (event) => {

        event.preventDefault();
        setLoading(true);
        setForm(prev => ({ ...prev, error: null, submit: true }));

        try {

            const formData = new FormData(event.target);

            const data = {
                firstName: formData.get("firstName"),
                lastName: formData.get("lastName"),
                email: formData.get("email"),
                password: formData.get("password"),
                confirmPassword: formData.get("confirmPassword"),
                newsletter: formData.get("newsletter"),
                terms: formData.get("terms") !== null
            };

            signUpSchema.parse(data);

            await signUp(data);
            closeModal();
            window.location.reload();

        } catch (error) {

            if (error.errors) {

                const errors = error.errors.reduce((acc, curr) => {

                    acc[curr.path[0]] = curr.message;
                    return acc;

                }, {});

                setForm(prev => ({
                    ...prev,
                    firstName: errors.firstName || "",
                    lastName: errors.lastName || "",
                    email: errors.email || "",
                    password: errors.password || "",
                    confirmPassword: errors.confirmPassword || "",
                    termsError: !!errors.terms ? true : false,
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

        if (activeModal === "sign_up") setForm(FORM_DEFAULT);

    }, [activeModal]);

    return (

        <ModalContainer title="sign up">

            <form onSubmit={handleFormSubmit} className="mt-4 space-y-4">

                <div className="space-y-2 mt-8">

                    <div className="grid grid-cols-2 gap-2">

                        <Input
                            title='first name'
                            type='text'
                            error={form.firstName}
                        />

                        <Input
                            title='last name'
                            type='text'
                            error={form.lastName}
                        />

                    </div>

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

                    <Input
                        title='confirm password'
                        type='password'
                        error={form.confirmPassword}
                    />

                </div>

                <div className="mt-4 space-y-2">

                    <div className="flex items-center text-xs space-x-3">

                        <Checkbox
                            name="newsletter"
                            id="newsletter"
                            size="4"
                            checked={form.newsletter}
                            onChange={() => setForm(prev => ({ ...prev, newsletter: !prev.newsletter }))}
                        />

                        <p>Subscribe to our newsletter</p>

                    </div>

                    <div className="flex items-center text-xs space-x-3">

                        <Checkbox
                            name="terms"
                            id="terms"
                            checked={form.terms}
                            size="4"
                            onChange={() => setForm(prev => ({ ...prev, terms: !prev.terms }))}
                        />

                        <p className={form.termsError && "text-error-red"}>
                            By selecting "Sign Up", you are confirming that you have read and agree to thelongitudebrand's &nbsp;
                            <Link className="underline" href="/legal/terms-conditions">Terms & Conditions</Link>
                        </p>

                    </div>

                </div>

                <div className="mt-4 space-y-2 w-full">

                    <Button
                        title="sign up"
                        type="submit"
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

        </ModalContainer>

    );

};