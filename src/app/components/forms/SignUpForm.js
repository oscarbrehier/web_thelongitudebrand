"use client"
import Button from "../ui/Button";
import InputWithLabel from "../ui/InputWithLabel";
import Link from "next/link";
import Checkbox from "../ui/Checkbox";
import { useTranslation } from "@/app/i18n/client";
import { Trans } from "react-i18next";

export default function SignUpForm({
    lang = null,
    handleForm = null,
    handleActions = null,
    errors = null,
    loading = null,
    email = null,
}) {

    const { t } = useTranslation(lang, ["auth", "error", "validation", "common", "newsletter"]);

    return (

        <form onSubmit={handleForm}>

            <div className="space-y-2">

                <div className="grid grid-cols-2 gap-2">

                    <InputWithLabel
                        name="firstName"
                        title={t("first_name")}
                        required={true}
                        error={t(errors?.firstName, { ns: "validation" })}
                        lang={lang}
                    />

                    <InputWithLabel
                        name="lastName"
                        title={t("last_name")}
                        required={true}
                        error={t(errors?.lastName, { ns: "validation" })}
                        lang={lang}
                    />

                </div>

                <InputWithLabel
                    name="email"
                    title="email"
                    required={true}
                    value={email}
                    error={t(errors?.email, { ns: "validation" })}
                    lang={lang}
                />

                <InputWithLabel
                    name="password"
                    title={t("password")}
                    type="password"
                    required={true}
                    error={t(errors?.password, { ns: "validation" })}
                    lang={lang}
                />

                <InputWithLabel
                    name="confirmPassword"
                    title={t("confirm_password")}
                    type="password"
                    required={true}
                    error={t(errors?.confirmPassword, { ns: "validation" })}
                    lang={lang}
                />

            </div>

            <div className="mt-4 space-y-2">

                <div className="flex text-sm space-x-3">

                    <Checkbox
                        type="checkbox"
                        name="newsletter"
                        size="4"
                    />

                    <p className="capitalize-first">{t("cta.title", { ns: "newsletter" })}</p>

                </div>

                <div className="flex text-sm space-x-3">

                    <Checkbox
                        type="checkbox"
                        id="terms"
                        name="terms"
                        size="4"
                    />

                    <p className={`${errors.terms && "text-error-red"}`}>
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

            <div className="mt-6 space-y-2">

                <Button
                    size="w-full h-14"
                    type="submit"
                    loading={loading}
                >
                    {t("sign_up.cta")}
                </Button>

                {
                    errors?.error && <p className="text-error-red text-sm">{errors.error}</p>
                }

            </div>

            <div className="mt-4 text-sm flex">

                <p className="text-neutral-500 capitalize-first">
                    <Trans
                        i18nKey="sign_up.has_account_prompt"
                        t={t}
                        components={{
                            Span: <Link href="/auth/sign-in" className="cursor-pointer underline text-black" />
                        }}
                    />
                </p>

            </div>

        </form>

    );

};