"use client"
import Cookies from "js-cookie";

export function cookieConsentGiven() {

	const consent = Cookies.get("cookie_consent");
	return (
		!consent ? false : consent
	);

};