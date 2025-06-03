"use client"
import { useModalContext } from "@/lib/context/ModalContext";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";

export default function Page() {

	// const cookies = new Cookies();
	// const { openModal } = useModalContext();

	// useEffect(() => {
	// 	const cookieConsent = cookies.get("cookie_consent");
	// 	if (!cookieConsent) openModal("cookie_consent");
	// }, []);

	return (

		<div className="h-screen w-full flex items-center justify-center">
			<button onClick={() => openModal("cookie_consent")}>open modal</button>
		</div>

	)

};