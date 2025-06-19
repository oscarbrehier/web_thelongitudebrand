"use client"
import Input from "../ui/Input";
import { useEffect, useState } from "react";
import { useModalContext } from "@/lib/context/ModalContext";
import signIn from "@/lib/authentication/signIn";
import Button from "../ui/Button";
import handleFirebaseError from "@/lib/firebase/handleFirebaseError";
import ModalContainer from "./ModalContainer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/stores/useCartStore";
import posthog from "posthog-js";
import { trackEvent } from "@/lib/analytics/analytics";
import { signInSchema } from "@/lib/schema";
import { useTranslation } from "@/app/i18n/client";
import { tBulk } from "@/app/i18n/utils";
import { Trans } from "react-i18next";

const FORM_DEFAULT = {
    submit: false,
    error: null,
    email: "",
    password: "",
};

export default function SignInModal({
    lang
}) {

    const { t } = useTranslation(lang, ["auth", "error", "validation"]);
    const router = useRouter();
    const { activeModal, openModal, closeModal } = useModalContext();

    const [form, setForm] = useState(FORM_DEFAULT);
    const [loading, setLoading] = useState(false);

    const setCartSync = useCartStore((state) => state.setSynced);

    const handleFormSubmit = async (event) => {

        event.preventDefault();
        setLoading(true);
        setForm(prev => ({ ...prev, submit: true, error: null }));

        try {

            trackEvent("sign_in", { source: "modal" });

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
                closeModal();
            }

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

                const formatError = handleFirebaseError(error.code, t);
                setForm(prev => ({ ...prev, error: formatError }));

            } else {
                setForm(prev => ({ ...prev, error: tBulk(t, ["unexpected_error", "try_refresh_or_later"], { ns: "error" }) }));
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

        <ModalContainer title={t("sign_in.cta")}>

            <form onSubmit={handleFormSubmit} className="space-y-4">

                <div className="space-y-2 mt-8">

                    <Input
                        title='email'
                        type='email'
                        error={t(form.email, { ns: "validation" })}
                        lang={lang}
                    />

                    <Input
                        title='password'
                        type='password'
                        error={t(form.password, { ns: "validation" })}
                        lang={lang}
                    />

                </div>

                <div className="mt-4 space-y-2 w-full">

                    <Button
                        size="w-full h-10"
                        type="submit"
                        loading={loading}
                    >
                        {t("sign_in.cta")}
                    </Button>

                    <>
                        {
                            form.error && (
                                <p className="text-sm text-error-red w-full">{form.error}</p>
                            )
                        }
                    </>


                </div>

                <div className="text-sm mt-6 space-y-1">

                    <button
                        className="capitalize-first"
                        onClick={() => {
                            closeModal("sign_in");
                            router.push("/auth/reset-password");
                        }}
                    >
                        {t("forgot_password_prompt")}
                    </button>
                    <p className="text-neutral-500 capitalize-first">
                        <Trans i18nKey="sign_in.no_account_prompt" t={t} components={{
                            Span: <span className="cursor-pointer capitalize-first underline" onClick={() => openModal('sign_up')}>&nbsp;{t("sign_up.cta")}</span>
                        }} />
                    </p>

                </div>

            </form>

        </ModalContainer>

    );

};