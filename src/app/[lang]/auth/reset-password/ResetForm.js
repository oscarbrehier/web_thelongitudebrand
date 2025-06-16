"use client"
import Button from "@/app/components/ui/Button";
import InputWithLabel from "@/app/components/ui/InputWithLabel";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { resetPasswordSchema } from "@/lib/schema";
import { SuccessDisplay } from "./SuccessDisplay";

export function ResetForm({
	lang,
	globalError,
	initialEmail
}) {

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

			if (error.errors) {
				setFieldError(prev => ({ ...prev, field: error.errors[0].message }));
			};

			setStatus("error");

		};

	};

	if (status == "success") {
		return (
			<SuccessDisplay email={email} />
		);
	};

	return (

		<>
			<div className="mx-2 mb-4">

				<p className="capitalize text-lg">reset your password</p>

				{

					globalError ? (

						<div className="mt-1">
							<p className="text-sm text-error-red">
								{globalError}
							</p>

							<p className="text-sm text-neutral-600">
								It looks like the link you clicked is no longer active. Don't worry, you can request a new password reset link by entering your email below.
							</p>
						</div>

					) : (

						<p className="text-sm text-neutral-600">
							Enter the email address associated to your account to receive a password reset link.
						</p>

					)

				}

			</div>

			<form action={handleForm}>

				<div className="space-y-2">

					<InputWithLabel
						name="email"
						title="email"
						type="email"
						error={fieldError}
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
						send reset link
					</Button>

				</div>

			</form>
		</>

	);

};