"use server"
import { cookies } from "next/headers";

export default async function setCookieConsent(preferences) {

	const cookieStore = await cookies();

	const cookieValue = JSON.stringify(preferences);
	const cookieOptions = {
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: 60 * 60 * 24 * 365
	};

	cookieStore.set("cookie_consent", cookieValue, cookieOptions);

};