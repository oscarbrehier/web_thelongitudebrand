"use server"
import { cookies } from "next/headers";
import posthog from "posthog-js";

export default async function setCookieConsent(preferences) {

	const cookieStore = await cookies();

	if (preferences?.analytics) {
		posthog.opt_out_capturing();
	};

	const cookieValue = JSON.stringify(preferences);
	const cookieOptions = {
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: 60 * 60 * 24 * 365
	};

	cookieStore.set("cookie_consent", cookieValue, cookieOptions);

};