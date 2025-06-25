"use client"
import handleFirebaseError from "@/lib/firebase/handleFirebaseError";
import { useRouter, useSearchParams } from "next/navigation";
import SignInForm from "@/app/components/forms/SignInForm";
import { useCartStore } from "@/lib/stores/useCartStore";
import signIn from "@/lib/authentication/signIn";
import { useState, use } from "react";
import posthog from "posthog-js";
import { trackEvent } from "@/lib/analytics/analytics";
import { signInSchema } from "@/lib/schema";
import { useTranslation } from "@/app/i18n/client";
import { tBulk } from "@/app/i18n/utils";

const FORM_DEFAULT = {
    error: null,
    email: null,
    password: null
};

export default function Page(props) {

    const params = use(props.params);
    const { lang } = params;

    const { t } = useTranslation(lang, ["auth", "error", "validation"]);

    const setCartSync = useCartStore((state) => state.setSynced);

    const query = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState("idle");
    const [form, setForm] = useState(FORM_DEFAULT);

    const handleForm = async (event) => {

        event.preventDefault();
        setStatus("loading");
        setForm(prev => ({ ...prev, error: null }));

        try {

            trackEvent("sign_in_click", { source: "modal" });

            const formData = new FormData(event.target);
            const data = {
                email: formData.get("email"),
                password: formData.get("password"),
            };

            signInSchema.parse(data);
            const { result, user } = await signIn(data.email, data.password, setCartSync);

            if (result) {
                posthog.identify(user.uid, {
                    email: user.email
                });
                setStatus("success");
                router.push("/customer/personal-information");
            }

        } catch (error) {

            setStatus("error");

            if (error.errors) {

                const errors = error.errors.reduce((acc, curr) => {

                    acc[curr.path[0]] = curr.message;
                    return acc;

                }, {});

                setForm(prev => ({
                    ...prev,
                    email: errors.email || null,
                    password: errors.password || null,
                }));

            } else if (error.code) {

                const formatError = handleFirebaseError(error.code, t);
                setForm({ ...FORM_DEFAULT, error: formatError });

            } else {
                setForm({ ...FORM_DEFAULT, error: ["unexpected_error", "try_refresh_or_later"] });
            };

        };

    };

    return (

        <div className="h-screen w-full mt-16 pt-16 2md:grid grid-cols-4 gap-2">

            <div className="col-start-2 col-span-2 h-auto">

                <div className="mx-2 mb-4">

                    <p className="capitalize-first text-lg">{t("sign_in.cta")}</p>

                </div>

                <SignInForm
                    lang={lang}
                    handleForm={handleForm}
                    errors={{
                        email: form.email,
                        password: form.password,
                        form: tBulk(t, form.error, { ns: "error" })
                    }}
                    status={status}
                    email={query.get("email") || null}
                />

            </div>


        </div>

    );
};