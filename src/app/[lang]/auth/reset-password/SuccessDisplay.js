"use client"
import Button from "@/app/components/ui/Button";
import Hyperlink from "@/app/components/ui/Hyperlink";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";

export function SuccessDisplay({ 
	email 
}) {

	const [error, setError] = useState(null);

	const handleResendEmail = async () => {
		setError(false);
		sendPasswordResetEmail(auth, email).catch(err => setError(true));
	};

	return (

		<>

			<div className="mx-2 mb-4">

				<p className="capitalize text-lg">check your email</p>

				<p className="text-sm text-neutral-600">
					A password reset link has been sent to your email address. Please check your inbox.
				</p>

			</div>

			<div className="space-y-2">

				<Hyperlink
					size="w-full h-14"
					to="/auth/sign-in"
				>
					sign in
				</Hyperlink>


				<div>

					<p className="text-sm">
						Didn't receive the email? {" "}
						<span
							onClick={handleResendEmail}
							className="underline cursor-pointer"
						>
							Resend
						</span>
					</p>

					{error && <p className="text-sm text-error-red">An error occured. Please try again or come back later.</p>}

				</div>

			</div>

		</>

	);

};