"use client"

import { authorizeSiteAccess } from "@/actions/authorizeSiteAccess";
import Button from "@/app/components/ui/Button";
import InputWithLabel from "@/app/components/ui/InputWithLabel";
import { captureException } from "@sentry/nextjs";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {

	const params = useParams();
	const { lang } = params;
	const router = useRouter();
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {

		e.preventDefault();
		setError(null);
		setLoading(true);

		try {

			const form = new FormData(e.target);
			const password = form.get("password") ?? null;

			console.log(password);
			await authorizeSiteAccess(password);
			router.push("/shop");

		} catch (err) {

			if (err instanceof Error && err.message === "invalid-password") {
				setError("invalid password");
				return;
			};

			setError("unexpected error");
			captureException(err);

		} finally {
			setLoading(false);
		};

	}

	return (

		<div className="h-screen w-full flex items-center justify-center px-4">

			<form onSubmit={handleSubmit} className="xl:w-1/3 lg:w-1/2 w-full h-auto flex flex-col space-y-2">

				<div className="w-full flex space-x-2">
					<InputWithLabel
						name="password"
						title="password"
						type="password"
						lang={lang}
						error={null}
						value={null}
					/>

					<Button
						type="submit"
						size="h-14 w-32"
						loading={loading}
					>
						enter
					</Button>
				</div>

				{error && <p className="text-error-red text-sm">{error}</p>}

			</form>

		</div>

	);

};