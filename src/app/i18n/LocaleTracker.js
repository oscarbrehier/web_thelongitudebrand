"use client"
import { trackEvent } from "@/lib/analytics/analytics";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function LocaleTracker() {

	const params = useParams();
	const lang = params?.lang;
	const previousLang = useRef(lang);

	useEffect(() => {

		if (lang && previousLang.current && lang !== previousLang.current) {
			const method = sessionStorage.getItem("flag_langChangeMethod") || "direct_url";
			trackEvent("language_changed", {
				from: previousLang.current,
				to: lang,
				method
			});
		};
		sessionStorage.removeItem("flag_langChangeMethod");
		previousLang.current = lang;

	}, [lang]);

	return null;

};