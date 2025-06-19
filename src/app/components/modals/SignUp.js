"use client"
import { useModalContext } from "@/lib/context/ModalContext";
import Input from "../ui/Input";
import { useState, useEffect } from "react";
import signUp from "@/lib/authentication/signUp";
import Button from "../ui/Button";
import handleFirebaseError from "@/lib/firebase/handleFirebaseError";
import ModalContainer from "./ModalContainer";
import Link from "next/link";
import Checkbox from "../ui/Checkbox";
import { trackEvent } from "@/lib/analytics/analytics";
import { signUpSchema } from "@/lib/schema";
import { useTranslation } from "@/app/i18n/client";
import { Trans } from "react-i18next";

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

export default function SignUpModal({
    lang
}) {

    const { t } = useTranslation(lang, ["auth", "error", "validation", "common", "newsletter"]);

    const { activeModal, openModal, closeModal } = useModalContext();

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState(FORM_DEFAULT);

    const handleFormSubmit = async (event) => {

        event.preventDefault();
        setLoading(true);
        setForm(prev => ({ ...prev, error: null, submit: true }));

        try {

            const formData = new FormData(event.target);

            const data = {
                firstName: formData.get("firstName") ?? "",
                lastName: formData.get("lastName") ?? "",
                email: formData.get("email") ?? "",
                password: formData.get("password") ?? "",
                confirmPassword: formData.get("confirmPassword") ?? "",
                newsletter: !!formData.get("newsletter"),
                terms: formData.get("terms") !== null
            };

            await signUpSchema.parseAsync(data);
            await signUp(data);

            trackEvent("sign_up", {
                method: "email",
                newsletterSubscriber: data.newsletter,
                source: "modal",
            });

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

                setForm(prev => ({ ...prev, error: tBulk(t, ["unexpected_error", "try_refresh_or_later"], { ns: "error" }) }));

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

            <form onSubmit={handleFormSubmit} className="space-y-4">

                <div className="space-y-2 mt-8">

                    <div className="grid grid-cols-2 gap-2">

                        <Input
                            title={t("first_name")}
                            type='text'
                            error={t(form.firstName, { ns: "validation" })}
                            lang={lang}
                        />

                        <Input
                            title={t("last_name")}
                            type='text'
                            error={t(form.lastName, { ns: "validation" })}
                            lang={lang}
                        />

                    </div>

                    <Input
                        title='email'
                        type='email'
                        error={t(form.email, { ns: "validation" })}
                        lang={lang}
                    />

                    <Input
                        title={t("password")}
                        type='password'
                        error={t(form.password, { ns: "validation" })}
                        lang={lang}
                    />

                    <Input
                        title={t("confirm_password")}
                        type='password'
                        error={t(form.confirmPassword, { ns: "validation" })}
                        lang={lang}
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

                        <p className="capitalize-first">{t("cta.title", { ns: "newsletter" })}</p>

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
                            <Trans
                                i18nKey="consent_notice"
                                ns="common"
                                t={t}
                                values={{ cta: t("sign_up.cta") }}
                                components={{
                                    Span: <span className="capitalize" />,
                                    Link: <Link className="underline" href="/legal/terms-conditions" />
                                }}
                            />
                        </p>

                    </div>

                </div>

                <div className="mt-4 space-y-2 w-full">

                    <Button
                        type="submit"
                        size="w-full h-10"
                        loading={loading}
                    >
                        {t("sign_up.cta")}
                    </Button>

                    <>
                        {
                            form.error && (
                                <p className="text-sm text-error-red w-full">{form.error}</p>
                            )
                        }
                    </>

                </div>

                <div className="text-sm mt-6 space-y-2">

                    <p className="text-neutral-500 capitalize-first">
                        <Trans
                            i18nKey="sign_up.has_account_prompt"
                            t={t}
                            components={{
                                Span: <span className="cursor-pointer capitalize-first underline" onClick={() => openModal('sign_in')}>{t("sign_in.cta")}</span>
                            }}
                        />
                    </p>

                </div>

            </form>

        </ModalContainer>

    );

};