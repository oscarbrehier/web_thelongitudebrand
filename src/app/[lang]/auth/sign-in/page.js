"use client"
import Button from "@/app/components/ui/Button";
import InputWithLabel from "@/app/components/ui/InputWithLabel";
import signIn from "@/lib/authentication/signIn";
import { useAuthContext } from "@/lib/context/AuthContext";
import handleFirebaseError from "@/lib/firebase/handleFirebaseError";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, use } from "react";
import { signInSchema } from "@/lib/constants/zodSchema";
import SignInForm from "@/app/components/forms/SignInForm";

export default function Page(props) {
    const params = use(props.params);

    const {
        lang
    } = params;

    const query = useSearchParams();
    const router = useRouter();
    const { isAuth } = useAuthContext();

    const [status, setStatus] = useState("idle");
    const [form, setForm] = useState({
        error: null,
    });
    const [inputErrors, setInputErrors] = useState({
        email: null,
        password: null
    });

    const handleForm = async (event) => {

        event.preventDefault();
        setStatus("loading");

        try {

            const formData = new FormData(event.target);
            const data = {
                email: formData.get("email"),
                password: formData.get("password"),
            };

            signInSchema.parse(data);
            await signIn(data.email, data.password);
            
            setStatus("success");
            router.push("/customer/personal-information");

        } catch (error) {

            console.log(error)

            if (error.errors) {

                const errors = error.errors.reduce((acc, curr) => {

                    acc[curr.path[0]] = curr.message;
                    return acc;

                }, {});

                setInputErrors(prev => ({
                    ...prev,
                    email: errors.email || null,
                    password: errors.password || null,
                }));

            } else if (error.code) {

                const formatError = handleFirebaseError(error.code);
                setForm(prev => ({ ...prev, error: formatError }));

            } else {

                setForm(prev => ({ ...prev, error: "An error occured. Please try again or come back later." }));

            };

            setStatus("error");

        };

    };

    return (

            <div className="h-screen w-full mt-16 pt-16 2md:grid grid-cols-4 gap-2">

                <div className="col-start-2 col-span-2 h-auto">

                    <div className="mx-2 mb-4">

                        <p className="capitalize text-lg">sign in</p>

                    </div>

                    {/* <form onSubmit={handleForm}>

                        <div className="space-y-2">

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

                            {
                                form.error && <p className="text-error-red text-sm">{form.error}</p>
                            }

                        </div>

                        <div className="mt-4 space-y-2">

                            <Button
                                title="sign in"
                                size="w-full h-14"
                                type="submit"
                                loading={status == "loading"}
                            />

                            <div>

                                <Link
                                    className="text-sm"
                                    href="/auth/reset-password"
                                >
                                    Forgot your password?
                                </Link>

                            </div>

                        </div>

                    </form> */}

                    <SignInForm
                        lang={lang}
                        handleForm={handleForm}
                        errors={{
                            email: inputErrors.email,
                            password: inputErrors.password,
                            form: form.error
                        }}
                        status={status}
                        email={query.get("email") || null}
                    />

                </div>


            </div>

    );
};