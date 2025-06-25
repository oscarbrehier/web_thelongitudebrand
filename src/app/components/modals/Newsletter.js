"use client"
import { useModalContext } from "@/lib/context/ModalContext";
import { useState, useEffect } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import handleFirebaseError from "@/lib/firebase/handleFirebaseError";
import ModalContainer from "./ModalContainer";
import Checkbox from "../ui/Checkbox";
import { trackEvent } from "@/lib/analytics/analytics";
import { newsletterSchema } from "@/lib/schema";
import { handleNewsletterSubscription } from "@/lib/firestore/newsletter";
import { useTranslation } from "@/app/i18n/client";
import { Trans } from "react-i18next";
import Link from "next/link";
import { tBulk } from "@/app/i18n/utils";

const FORM_DEFAULT = {
    error: "",
    firstName: "",
    lastName: "",
    email: "",
    terms: false,
    termsError: "",
    success: false
};

export default function NewsletterModal({
    lang
}) {

    const { t } = useTranslation(lang, ["newsletter", "common", "auth"]);

    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState(FORM_DEFAULT);

    const { activeModal, closeModal, value } = useModalContext();

    useEffect(() => {

        if (activeModal === "newsletter") {

            if (form.success) {

                const interval = setInterval(() => {

                    setProgress((oldProgress) => {

                        if (oldProgress === 100) {

                            clearInterval(interval);
                            closeModal();

                            return oldProgress;

                        };
                        return Math.min(oldProgress + 1, 100);

                    });

                }, 50);

                return () => {
                    clearInterval(interval);
                };

            };

        };


    }, [activeModal, form]);

    const handleFormSubmit = async (event) => {

        event.preventDefault();
        setLoading(true);
        setForm(prev => ({
            ...prev,
            firstName: null,
            lastName: null,
            email: null,
            termsError: null,
            error: null
        }));

        try {

            const formData = new FormData(event.target);
            const data = {
                firstName: formData.get("firstName"),
                lastName: formData.get("lastName"),
                email: formData.get("email"),
                terms: formData.get("terms") !== null,
            };

            newsletterSchema.parse(data);
            handleNewsletterSubscription(data.email, true, data);

            setForm(prev => ({ ...prev, success: true }));

            trackEvent("newsletter_subscribed", {
                email: data.email,
                source: "footer"
            });

        } catch (error) {

            if (error.errors) {

                const errors = error.errors.reduce((acc, curr) => {

                    acc[curr.path[0]] = curr.message;
                    return acc;

                }, {});

                setForm(prev => ({
                    ...prev,
                    firstName: errors.firstName || null,
                    lastName: errors.lastName || null,
                    email: errors.email || null,
                    termsError: !!errors.terms ? true : false,
                }));

            } else if (error.code) {

                const response = handleFirebaseError(error.code);
                setForm(prev => ({ ...prev, error: response }));

            } else {

                setForm(prev => ({
                    ...prev,
                    error: err ? "" : ["unexpected_error", "try_refresh_or_later"],
                }));

            };

        } finally {

            setLoading(false);

        };

    };

    useEffect(() => {

        if (activeModal === "newsletter") {

            setForm(FORM_DEFAULT);
            setProgress(0);

        };

    }, [activeModal]);

    return (

        <ModalContainer title={t("title")}>

            <form onSubmit={handleFormSubmit} className={`space-y-4 ${form.success && 'hidden'}`}>

                <p className="text-sm">{t("description")}</p>

                <div className="mt-8 space-y-2">

                    <div className="w-full grid grid-cols-2 gap-2">

                        <Input
                            name="firstName"
                            title={t("first_name", { ns: "auth" })}
                            // reset={resetInputs}
                            error={form.firstName}
                            lang={lang}
                        />

                        <Input
                            name="lastName"
                            title={t("last_name", { ns: "auth" })}
                            // reset={resetInputs}
                            error={form.lastName}
                            lang={lang}
                        />

                    </div>

                    <Input
                        name="email"
                        title="email"
                        // reset={resetInputs}
                        value={value && value}
                        error={form.email}
                        lang={lang}
                    />



                </div>

                <div className="flex items-center text-xs space-x-4">

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
                            t={t}
                            ns="common"
                            values={{ cta: t("cta.short") }}
                            components={{
                                Span: <span className="capitalize" />,
                                Link: <Link className="underline" href="/legal/terms-conditions" />
                            }} />
                    </p>

                </div>

                <div className="mt-4 space-y-4">

                    <Button
                        type="submit"
                        size="w-full h-10"
                        loading={loading}
                    >
                        {t("cta.short")}
                    </Button>

                    <>
                        {
                            form.error && (
                                <p className="text-sm text-error-red w-full">
                                    {tBulk(t, form.error)}
                                </p>
                            )
                        }
                    </>

                </div>

            </form>

            <section className={`${!form.success && 'hidden'} mt-4 space-y-4`}>

                <p>{t("messages.success")}</p>

                <div className="relative w-full">
                    <div className="w-full h-1 bg-neutral-200 absolute"></div>
                    <div style={{ width: `${progress}%` }} className="h-1 bg-neon-green absolute"></div>
                </div>

            </section>

        </ModalContainer>

    );

};