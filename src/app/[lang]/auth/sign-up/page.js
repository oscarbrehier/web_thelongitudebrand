"use client"
import Button from "@/app/components/ui/Button";
import InputWithLabel from "@/app/components/ui/InputWithLabel";
import { useAuthContext } from "@/lib/context/AuthContext";
import handleFirebaseError from "@/lib/firebase/handleFirebaseError";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { signUpSchema } from "@/lib/constants/zodSchema";
import { signUp } from "@/lib/authentication/service";
import Checkbox from "@/app/components/ui/Checkbox";

export default function Page({
    params: {
        lang
    }
}) {

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
            router.push("/shop");

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

                    <form onSubmit={handleForm}>

                        <div className="space-y-2">

                            <div className="grid grid-cols-2 gap-2">

                                <InputWithLabel
                                    title="first name"
                                    required={true}
                                    error={inputErrors.firstName}
                                />

                                <InputWithLabel
                                    title="last name"
                                    required={true}
                                    error={inputErrors.lastName}
                                />

                            </div>

                            <InputWithLabel
                                title="email"
                                type="email"
                                required={true}
                                value={query.get("email") || null}
                                error={inputErrors.email}
                            />

                            <InputWithLabel
                                title="password"
                                type="password"
                                required={true}
                                error={inputErrors.password}
                            />

                            <InputWithLabel
                                title="confirm password"
                                type="password"
                                required={true}
                                error={inputErrors.confirmPassword}
                            />

                            {
                                form.error && <p className="text-error-red text-sm">{form.error}</p>
                            }

                        </div>

                        <div className="mt-4 space-y-2">

                            <div className="flex text-sm space-x-3">

                                <Checkbox
                                    type="checkbox"
                                    name="newsletter"
                                    size="4"
                                />

                                <p>Subscribe to our newsletter</p>

                            </div>

                            <div className="flex text-sm space-x-3">

                                <Checkbox
                                    type="checkbox"
                                    id="terms"
                                    name="terms"
                                    size="4"
                                />

                                <p className={inputErrors.terms && "text-error-red"}>
                                    By selecting "Sign Up", you are confirming that you have read and agree to thelongitudebrand's &nbsp;
                                    <Link className="underline" href="/legal/terms-conditions">Terms & Conditions</Link>
                                </p>

                            </div>


                        </div>

                        <div className="mt-4 space-y-2">

                            <Button
                                title="sign up"
                                size="w-full h-14"
                                type="submit"
                                loading={loading}
                            />

                            <div className="text-sm flex">

                                <p>
                                    Already have an account? &nbsp;
                                </p>

                                <Link href="/auth/sign-in" className="underline capitalize">sign in</Link>

                            </div>

                        </div>

                    </form>

                </div>


            </div>

    );

};