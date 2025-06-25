"use client"
import Button from "@/app/components/ui/Button";
import Hyperlink from "@/app/components/ui/Hyperlink";
import { tBulk } from "@/app/i18n/utils";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";

export function SuccessDisplay({
	lang,
	email 
}) {

	const { t } = useTranslation(lang, ["auth", "error"]);

	const [error, setError] = useState(null);

	const handleResendEmail = async () => {
		setError(false);
		sendPasswordResetEmail(auth, email).catch(err => setError(true));
	};

	return (

		<>

			<div className="mx-2 mb-4">

				<p className="capitalize-first text-lg">{t("reset_password.check_email_title")}</p>

				<p className="text-sm text-neutral-600">
					{t("reset_password.check_email_description")}
				</p>

			</div>

			<div className="space-y-2">

				<Hyperlink
					size="w-full h-14"
					to="/auth/sign-in"
				>
					{t("sign_in.cta")}
				</Hyperlink>


				<div>

					<p className="text-sm">
						{/* Didn't receive the email? {" "}
						<span
							onClick={handleResendEmail}
							className="underline cursor-pointer"
						>
							Resend
						</span> */}
						<Trans
							t={t}
							i18nKey="reset_password.no_email_prompt"
							components={{
								Span: <span onClick={handleResendEmail} className="underline cursor-pointer capitalize" />
							}}
						/>
					</p>

					{error && (
						<p className="text-sm text-error-red">
							{tBulk(t, ["unexpected_error", "try_refresh_or_later"], { ns: "error" })}
						</p>
					)}

				</div>

			</div>

		</>

	);

};