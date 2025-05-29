"use client"
import Button from "@/app/components/ui/Button";
import InputWithLabel from "@/app/components/ui/InputWithLabel";
import { useAuthContext } from "@/lib/context/AuthContext";
import handleFirebaseError from "@/lib/firebase/handleFirebaseError";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, use } from "react";
import { signUpSchema } from "@/lib/constants/zodSchema";
import signUp from "@/lib/authentication/signUp";
import Checkbox from "@/app/components/ui/Checkbox";
import SignUpForm from "@/app/components/forms/SignUpForm";

export default function Page(props) {
    const params = use(props.params);

    const {
        lang
    } = params;

    const query = useSearchParams();
    const router = useRouter();
    const { isAuth } = useAuthContext();

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        error: null,
    });

    const [inputErrors, setInputErrors] = useState({
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        confirmPassword: null,
        terms: null,
    });

    const handleForm = async (event) => {

        event.preventDefault();
        setLoading(true);
        
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

            router.push("/customer/personal-information");
        

        } catch (error) {
                
            if (error.errors) {

                const errors = error.errors.reduce((acc, curr) => {

                    acc[curr.path[0]] = curr.message;
                    return acc;

                }, {});

                setInputErrors(prev => ({
                    ...prev,
                    firstName: errors.firstName,
                    lastName: errors.lastName,
                    email: errors.email,
                    password: errors.password,
                    confirmPassword: errors.confirmPassword,
                    terms: !!errors.terms ? true : false,
                }));

            } else if (error.code) {

                const formatError = handleFirebaseError(error.code);
                setForm(prev => ({ ...prev, error: formatError }));

            } else {

                setForm(prev => ({ ...prev, error: "An error occured. Please try again or come back later." }));

            };

        } finally {

            setLoading(false);

        };

    };

    return (

            <div className="h-screen w-full mt-16 pt-16 2md:grid grid-cols-4 gap-2">

                <div className="col-start-2 col-span-2 h-auto">

                    <div className="mx-2 mb-4">

                        <p className="capitalize text-lg">sign in</p>

                    </div>

                    <SignUpForm
                        lang={lang}
                        handleForm={handleForm}
                        errors={{
                            form: form.error,
                            firstName: inputErrors.firstName,
                            lastName: inputErrors.lastName,
                            email: inputErrors.email,
                            password: inputErrors.password,
                            confirmPassword: inputErrors.confirmPassword,
                            terms: inputErrors.terms
                        }}
                        loading={loading}
                        email={query.get('email') || null}
                    />

                </div>


            </div>

    );
};