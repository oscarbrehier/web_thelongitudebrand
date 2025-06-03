// app/providers.tsx
'use client'

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, Suspense, useState } from "react"
import { usePostHog } from 'posthog-js/react'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { cookieConsentGiven } from "../cookies/consent"
import { captureException } from "@sentry/nextjs"

export function PostHogProvider({ children, posthogKey, posthogHost }) {

	const [posthogClient, setPosthogClient] = useState(null);

	useEffect(() => {

		const consent = cookieConsentGiven();
		if (!consent) return ;

		let parsedConsent;

		try {
			parsedConsent = JSON.parse(consent);
		} catch (err) {
			captureException(err);
		}

		
		if (!parsedConsent?.analytics) return ;
		console.log(parsedConsent)

		import("posthog-js").then((mod) => {

			const posthog = mod.default;

			posthog.init(posthogKey, {
				api_host: posthogHost || 'https://eu.i.posthog.com',
				person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
				capture_pageview: false, // Disable automatic pageview capture, as we capture manually,
				persistence: "localStorage+cookie",
			});
			
			posthog.opt_in_capturing();
			setPosthogClient(posthog);

		});


	}, [posthogKey, posthogHost])

	if (!posthogClient) return (children);

	return (
		<PHProvider client={posthogClient}>
			<SuspendedPostHogPageView />
			{children}
		</PHProvider>
	)
}

function PostHogPageView() {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const posthog = usePostHog()

	// Track pageviews
	useEffect(() => {
		if (pathname && posthog) {
			let url = window.origin + pathname
			if (searchParams.toString()) {
				url = url + "?" + searchParams.toString();
			}

			posthog.capture('$pageview', { '$current_url': url })
		}
	}, [pathname, searchParams, posthog])

	return null
}

// Wrap PostHogPageView in Suspense to avoid the useSearchParams usage above
// from de-opting the whole app into client-side rendering
// See: https://nextjs.org/docs/messages/deopted-into-client-rendering
function SuspendedPostHogPageView() {
	return (
		<Suspense fallback={null}>
			<PostHogPageView />
		</Suspense>
	)
}