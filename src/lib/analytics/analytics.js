import posthog from "posthog-js";

export const trackEvent = (event, properties = {}) => {
	if (typeof window !== 'undefined' && posthog) {
		posthog.capture(event, properties);
	};
};