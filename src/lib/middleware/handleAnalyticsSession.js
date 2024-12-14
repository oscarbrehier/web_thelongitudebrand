import { storageKeys } from "../constants/settings.config";
import { createAnalyticsSession } from "../analytics/sessions/create";
import { endAnalyticsSession } from "../analytics/sessions/end";

export async function handleAnalyticsSession(cookies, response) {

    let analyticsSessionId = cookies.get(storageKeys.ANALYTICS_SESSION_ID)?.value;

    const lastActive = parseInt(cookies.get(storageKeys.ANALYTICS_LAST_ACTIVE)?.value, 10);
    const now = Date.now();

    const sessionTimeout = process.env.NEXT_PUBLIC_ANALYTICS_SESSION_TIMEOUT * 60 * 1000;
    
    if (!analyticsSessionId || !lastActive) {

        // Create a new session

        console.log("creating new session-")
        analyticsSessionId = await createAnalyticsSession(response);

    } else if (now - lastActive > sessionTimeout) {

        // Expired session: End the current session and start a new one

        if (analyticsSessionId) {
            await endAnalyticsSession(analyticsSessionId);
        };

        analyticsSessionId = await createAnalyticsSession(response);

    };

    response.cookies.set(storageKeys.ANALYTICS_LAST_ACTIVE, now);

    return analyticsSessionId;

};