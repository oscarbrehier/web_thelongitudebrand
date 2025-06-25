"use client"
import InputWithLabel from "../ui/InputWithLabel"
import Button from "../ui/Button"
import Link from "next/link"
import { Trans } from "react-i18next";
import { useTranslation } from "@/app/i18n/client";

export default function SignInForm({
    lang,
    handleForm = null,
    errors = null,
    status = null,
    email = null,
}) {

    const { t } = useTranslation(lang, ["auth", "error", "validation"]);

    return (

        <form onSubmit={handleForm}>

            <div className="space-y-2">

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
                    title="password"
                    type="password"
                    required={true}
                    error={t(errors?.password, { ns: "validation" })}
                    lang={lang}
                />

            </div>

            <div className="mt-6 space-y-2">

                <Button
                    size="w-full h-14"
                    type="submit"
                    loading={status == "loading"}
                >
                    {t("sign_in.cta")}
                </Button>

                {
                    errors?.form && <p className="text-error-red text-sm">{errors?.form}</p>
                }

            </div>

            <div className="w-full flex flex-col text-sm space-y-2 mt-4">

                <Link
                    className="text-sm capitalize-first"
                    href="/auth/reset-password"
                >
                    {t("forgot_password_prompt")}
                </Link>

                <div className="flex">

                    <p className="text-neutral-500 capitalize-first">
                        <Trans
                            i18nKey="sign_in.no_account_prompt"
                            t={t}
                            components={{
                                Span: <Link href="/auth/sign-up" className="cursor-pointer underline text-black" />
                            }} />
                    </p>

                </div>

            </div>

        </form>

    )

}