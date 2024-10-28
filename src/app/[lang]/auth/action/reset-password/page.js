"use client"
import { PageContainer } from "@/app/components/container/PageContainer";
import InputWithLabel from "@/app/components/ui/InputWithLabel";
import getPasswordStrength from "@/lib/utils/getPasswordStrength";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/app/components/ui/Button";
import { Suspense, useEffect, useState } from "react";
import { z } from "zod";
import resetPassword from "@/lib/authentication/resetPassword";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { auth } from "@/lib/firebase/client";

const formSchema = z.object({
    password: z.string()
        .min(6, { message: "New password" })
        .refine(getPasswordStrength, {
            message: "Password is too weak. Choose a password with at least 6 characters, including a mix of letters, numbers, and symbols"
        }),
    confirmPassword: z.string()
        .min(1, { message: "Please confirm your new password " })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});

export default function Page({ params: { lang } }) {

    const params = useSearchParams();
    const router = useRouter();

    const code = params.get("code");

    const [form, setForm] = useState({
        password: null,
        confirmPassword: null,
        error: null
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleForm = async (formData) => {

        setLoading(true);

        try {

            const data = {
                password: formData.get("password"),
                confirmPassword: formData.get("confirmPassword")
            };

            formSchema.parse(data);

            await confirmPasswordReset(auth, code, data.password);
            router.push("/auth/sign-in");

        } catch (error) {

            console.log("error from catch", error);

            if (error.errors) {

                const errors = error.errors.reduce((acc, curr) => {

                    acc[curr.path[0]] = curr.message;
                    return acc;

                }, {});

                setForm(prev => ({
                    ...prev,
                    password: errors.password,
                    confirmPassword: errors.confirmPassword
                }));

                return;

            };

            setForm(prev => ({ ...prev, error: "An error occured. Please try again or come back later." }));

        } finally {

            setLoading(false);

        };

    };

    useEffect(() => {

        const verifyCode = async () => {

            try {

                await verifyPasswordResetCode(auth, code);

            } catch (err) {

                if (err.code && (err.code === "auth/invalid-action-code" || "auth/expired-action-code")) {

                    router.push("/auth/reset-password?error=true");
                    return;

                };

                setError("An error occured. Please try again or come back later.")

            };

        };

        verifyCode();

    }, []);

    return (

        <Suspense>

            <PageContainer lang={lang}>

                <div className="h-screen w-full mt-16 md:pt-16 pt-24 2md:grid grid-cols-4 gap-2">

                    <div className="col-start-2 col-span-2 h-auto">

                        <p className="capitalize mx-2 my-1">reset your password</p>

                        {error ? (

                            <div className="w-full">
                                <p className="text-error-red">{error}</p>
                            </div>

                        ) : (

                            <form action={handleForm}>

                                <div className="space-y-2">

                                    <InputWithLabel
                                        title='password'
                                        type='password'
                                        required={true}
                                        error={form.password}
                                    />

                                    <InputWithLabel
                                        title='confirm password'
                                        type='password'
                                        required={true}
                                        error={form.confirmPassword}
                                    />

                                    {form.error !== "" && (
                                        <p className="text-sm text-error-red">{form.error}</p>
                                    )}

                                </div>


                                <div className="mt-4 space-y-2">

                                    <Button
                                        title="reset password"
                                        size="w-full h-14"
                                        type="submit"
                                        loading={loading}
                                    />

                                </div>

                            </form>

                        )}

                    </div>


                </div>

            </PageContainer>

        </Suspense>

    )

}

