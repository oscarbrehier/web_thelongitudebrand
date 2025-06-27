"use client"

import Button from "@/app/components/ui/Button";
import InputWithLabel from "@/app/components/ui/InputWithLabel";
import { useTranslation } from "@/app/i18n/client";
import { tBulk } from "@/app/i18n/utils";
import { handleNewsletterSubscription } from "@/lib/firestore/newsletter";
import { useState } from "react";
import { z } from "zod";

export function Newsletter({
	lang
}) {

	const { t } = useTranslation(lang, ["newsletter", "validation", "error"]);
	const [isComplete, setIsComplete] = useState(false);
	const [loading, setLoading] = useState(false);
	const [formFeedback, setFormFeedback] = useState({
		message: null,
		type: null
	});

	async function handleFormSubmit(e) {

		e.preventDefault();
		setLoading(true);
		setFormFeedback({ message: null, type: null });

		try {

			const form = new FormData(e.target);
			const email = form.get("email");

			z.object({
				email: z.string()
					.min(1, { message: t("invalid_email", { ns: "validation" }) })
					.email(t("invalid_email", { ns: "validation" }))
			}).parse({ email });

			await handleNewsletterSubscription(email, true)

			setFormFeedback({
				message: t("messages.success"),
				type: "success"
			});

		} catch (err) {


			if (err.errors) {

				const errors = err.errors.reduce((acc, curr) => {

					acc[curr.path[0]] = curr.message;
					return acc;

				}, {});

				setFormFeedback({
					message: errors.email,
					type: "error"
				});

			} else {
				setFormFeedback({
					message: tBulk(t, ["unexpected_error", "try_refresh_or_later"], { ns: "error" }),
					type: "error"
				});
			}

		} finally {
			setLoading(false);
		}

	};

	return (

		<section className="h-screen w-full flex items-center justify-center p-4">

			<div className="xl:w-1/3 lg:w-1/2 w-full lg:py-0 py-4  h-auto space-y-2">

				<header className="space-y-2">
					<h2 className="capitalize font-times-roman text-4xl italic">{t("title")}</h2>
					<h3 className="w-full text-xs">{t("cta.full")}</h3>
				</header>

				<form
					onSubmit={handleFormSubmit}
					className="w-full flex flex-col space-y-2"
					aria-label="Newsletter subscription form"
				>

					<div className="w-full flex md:flex-row flex-col md:space-x-2 md:space-y-0 space-y-2">

						<InputWithLabel
							type="text"
							name="email"
							title="email"
							value={""}
							onChange={(e) => setIsComplete(e.target.value !== "")}
							aria-describedby="email-newsletter"
						/>

						<Button
							size="h-14 md:w-32"
							loading={loading}
							disabled={!isComplete}
							type="submit"
							aria-label="Subscribe"
						>
							{t("cta.short")}
						</Button>

					</div>

					{
						formFeedback && (
							<p
								className={`text-xs ${formFeedback.type === "error" ? "text-error-red" : "black"}`}
								role={formFeedback.type === "error" ? "alert" : "status"}
								aria-live="polite"
							>
								{formFeedback.message}
							</p>
						)
					}

				</form>

			</div>

		</section>

	);

};