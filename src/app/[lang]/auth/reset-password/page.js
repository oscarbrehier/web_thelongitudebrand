"use client"

import { useSearchParams } from "next/navigation";
import { PageContainer } from "@/app/components/container/PageContainer";
import Button from "@/app/components/ui/Button";
import InputWithLabel from "@/app/components/ui/InputWithLabel";
import { useEffect, useState } from "react";
import { z } from "zod";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/client";

const formSchema = z.object({
    email: z.string()
        .min(1, { message: "Email is required" })
        .email("Please enter a valid email address")
});

export default function Page({ params: { lang } }) {

    const params = useSearchParams();

    const [status, setStatus] = useState("idle");
    const [email, setEmail] = useState(null);
    const [error, setError] = useState({
        message: null,
        type: null,
        field: null
    });

    useEffect(() => {

        const error = params.get("error");

        if (error) setError(prev => ({
            ...prev,
            type: "page"
        }));

    }, []);

    const handleForm = async (formData) => {

        setStatus("loading");

        try {

            const email = formData.get("email");
            formSchema.parse({ email });

            await sendPasswordResetEmail(auth, email);

            setEmail(email);
            setStatus("success");

        } catch (error) {

            console.error(error);

            if (error.errors) {

                setError(prev => ({ ...prev, field: error.errors[0].message }));

            };

            setStatus("error");

        };

    };

    return (

        <PageContainer lang={lang}>

            <div className="h-screen w-full mt-16 md:pt-16 pt-24 2md:grid grid-cols-4 gap-2">

                <div className="col-start-2 col-span-2 h-auto">

                    {status == "success" ? (

                        <SuccessMessage email={email} />

                    ) : (

                        <>

                            <div className="mx-2 mb-4">

                                <p className="capitalize text-lg">reset your password</p>

                                {

                                    error.type == "page" ? (

                                        <div className="mt-1">
                                            <p className="text-sm text-error-red">
                                                Oops! Your password reset link has expired or is invalid.
                                            </p>

                                            <p className="text-sm text-neutral-600">
                                                It looks like the link you clicked is no longer active. Don’t worry, you can request a new password reset link by entering your email below.
                                            </p>
                                        </div>

                                    ) : (

                                        <p className="text-sm text-neutral-600">
                                            Enter the email address associated to your account to receive a password reset link.
                                        </p>

                                    )

                                }

                            </div>

                            <form action={handleForm}>

                                <div className="space-y-2">

                                    <InputWithLabel
                                        title="email"
                                        type="email"
                                        error={error.field}
                                        required={true}
                                        value={params.get("email") || null}
                                    />

                                    {/* {error !== "" && (
<p className="text-sm text-error-red">{error}</p>
)} */}

                                </div>

                                <div className="mt-4 space-y-2">

                                    <Button
                                        title="send reset link"
                                        size="w-full h-14"
                                        type="submit"
                                        loading={status == "loading"}
                                    />

                                </div>

                            </form>

                        </>

                    )}

                </div>

            </div>

        </PageContainer>

    );

};

function SuccessMessage({ email }) {

    const [error, setError] = useState(null);

    const handleResendEmail = async () => {

        setError(false);
        sendPasswordResetEmail(auth, email).catch(err => setError(true));

    };

    return (

        <>

            <div className="mx-2 mb-4">

                <p className="capitalize text-lg">check your email</p>

                <p className="text-sm text-neutral-600">
                    A password reset link has been sent to your email address. Please check your inbox.
                </p>

            </div>

            <div className="space-y-2">

                <Button
                    title="sign in"
                    size="w-full h-14"
                />


                <div>

                    <p className="text-sm">
                        Didn't receive the email? {" "}
                        <span
                            onClick={handleResendEmail}
                            className="underline cursor-pointer"
                        >
                            Resend
                        </span>
                    </p>
                    
                    {error && <p className="text-sm text-error-red">An error occured. Please try again or come back later.</p>}

                </div>

            </div>

        </>

    );

};