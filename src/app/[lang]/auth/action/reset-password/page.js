"use client"
import InputWithLabel from "@/app/components/ui/InputWithLabel";
import getPasswordStrength from "@/lib/utils/getPasswordStrength";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/app/components/ui/Button";
import { Suspense, use, useEffect, useState } from "react";
import { z } from "zod";
import resetPassword from "@/lib/authentication/resetPassword";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { useTranslation } from "@/app/i18n/client";
import { tBulk } from "@/app/i18n/utils";

const formSchema = z.object({
    password: z.string()
        .refine(async (val) => await getPasswordStrength(val), {
            message: "Password is too weak. Choose a password with at least 6 characters, including a mix of letters, numbers, and symbols"
        }),
    confirmPassword: z.string()
        .min(1, { message: "Please confirm your new password " })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});

export default function Page(props) {

    const params = use(props.params)
    const { lang } = params;
    const { t } = useTranslation(lang, ["auth", "error"]);

    const code = useSearchParams().get("code");

    const router = useRouter();

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

            await formSchema.parseAsync(data);

            await confirmPasswordReset(auth, code, data.password);
            router.push("/auth/sign-in");

        } catch (error) {

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

            setForm(prev => ({ ...prev, error: tBulk(t, ["unexpected_error", "try_refresh_or_later"], { ns: "error" }) }));

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

                    router.push("/auth/reset-password?error=reset-link/invalid-expired");
                    return;

                };

                setError(tBulk(t, ["unexpected_error", "try_refresh_or_later"], { ns: "error" }));

            };

        };

        verifyCode();

    }, []);

    return (

        <Suspense>

            <div className="h-screen w-full mt-16 pt-16 2md:grid grid-cols-4 gap-2">

                <div className="col-start-2 col-span-2 h-auto">

                    <p className="capitalize-first mx-2 my-1">{t("reset_password.title")}</p>

                    {error ? (

                        <div className="w-full">
                            <p className="text-error-red">{error}</p>
                        </div>

                    ) : (

                        <form action={handleForm}>

                            <div className="space-y-2">

                                <InputWithLabel
                                    lang={lang}
                                    name="password"
                                    title={t("password")}
                                    type='password'
                                    required={true}
                                    error={form.password}
                                />

                                <InputWithLabel
                                    lang={lang}
                                    name="confirmPassword"
                                    title={t("confirm_password")}
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
                                    size="w-full h-14"
                                    type="submit"
                                    loading={loading}
                                >
                                    {t("reset_password.cta")}
                                </Button>

                            </div>

                        </form>

                    )}

                </div>


            </div>

        </Suspense>

    )

}

