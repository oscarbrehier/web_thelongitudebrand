"use client"
import { createContext, useEffect } from "react";
import { useModalContext } from "./ModalContext";

export const CookieConsentContext = createContext();

export default function CookieConsentProvider({ children, consent }) {

	const { openModal } = useModalContext();

	useEffect(() => {

		if (!consent || consent !== "true" && consent !== true) {

			try {

				const parsedConsent = JSON.parse(consent);

				if (typeof parsedConsent === "object") {

					const hasContent = Object.values(parsedConsent).some(value => value);
					if (!hasContent) {
						openModal("cookie_preferences");
					}

				} else if (parsedConsent != true) {
					openModal("cookie_preferences");
				}

			} catch (err) {

				openModal("cookie_preferences");

			}

		}
	}, [consent, openModal]);

	return (children);

};