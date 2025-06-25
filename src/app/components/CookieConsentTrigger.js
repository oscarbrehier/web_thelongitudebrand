"use client"
import { useModalContext } from "@/lib/context/ModalContext";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function CookieConsentTrigger({ children }) {
	
	const { openModal } = useModalContext();
	const pathname = usePathname();

	useEffect(() => {

		const hasConsent = Cookies.get("cookie_consent");
		if (!hasConsent) {
			openModal("cookie_consent", { preventClose: true });
		};

}, [pathname, openModal]);

	return (
		<>
			{children}
		</>
	);

};