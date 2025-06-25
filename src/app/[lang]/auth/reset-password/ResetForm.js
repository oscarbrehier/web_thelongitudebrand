"use client"
import Button from "@/app/components/ui/Button";
import InputWithLabel from "@/app/components/ui/InputWithLabel";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { resetPasswordSchema } from "@/lib/schema";
import { SuccessDisplay } from "./SuccessDisplay";
import { useTranslation } from "@/app/i18n/client";

export function ResetForm({
	lang,
	globalError,
	initialEmail
}) {

	const { t } = useTranslation(lang, ["auth", "error", "validation"]);

	const [status, setStatus] = useState("idle");
	const [email, setEmail] = useState(initialEmail);
	const [fieldError, setFieldError] = useState(null);

	const handleForm = async (formData) => {

		setStatus("loading");

		try {

			const email = formData.get("email");
			resetPasswordSchema.parse({ email });

			await sendPasswordResetEmail(auth, email);

			setEmail(email);
			setStatus("success");

		} catch (error) {

			const errors = error.errors.reduce((acc, curr) => {

				acc[curr.path[0]] = curr.message;
				return acc;

			}, {});

			if (error.errors) {
				setFieldError(errors?.email || "");
			};

			setStatus("error");

		};

	};

	if (status == "success") {
		return (
			<SuccessDisplay
				email={email}
				lang={lang}
			/>
		);
	};

	return (

		<>
			<div className="mx-2 mb-4">

				<p className="capitalize-first text-lg">{t("reset_password.cta")}</p>

				{

					globalError ? (

						<div className="mt-1">
							<p className="text-sm text-error-red">
								{t(globalError)}
							</p>

							<p className="text-sm text-neutral-600">
								{t("reset_password.error_expired_link_description")}
							</p>
						</div>

					) : (

						<p className="text-sm text-neutral-600">
							{t("reset_password.email_instruction")}
						</p>

					)

				}

			</div>

			<form action={handleForm}>

				<div className="space-y-2">

					<InputWithLabel
						name="email"
						title="email"
						error={t(fieldError, { ns: "validation" })}
						required={true}
						value={initialEmail || null}
						lang={lang}
					/>

				</div>

				<div className="mt-4 space-y-2">

					<Button
						size="w-full h-14"
						type="submit"
						loading={status == "loading"}
					>
						{t("reset_password.send_link_cta")}
					</Button>

				</div>

			</form>
		</>

	);

};