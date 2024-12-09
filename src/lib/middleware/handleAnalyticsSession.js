import { captureException } from "@sentry/nextjs";
import { storageKeys } from "../constants/settings.config";
import { v4 as uuid } from "uuid";

async function logSession(sessionId, action) {

    try {

        let payload = {
            distinctId: sessionId
        };

        
        payload[action == "create" ? "startTime" : "endTime"] = new Date();

        if (action == "create") {

            console.log("creating new session", sessionId, payload)

        } else {

            console.log("setting end time to last session", sessionId, payload)

        }
        
        const res = await fetch(`${process.env.ANALYTICS_API_URL}/sessions`, {
            method: action == "create" ? "POST": "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.ANALYTICS_API_KEY}`
            },
            body: JSON.stringify(payload),
        });

        const data = await res.json();

        console.log(data);

    } catch (err) {

        console.log(err);

        captureException(err);

    };

};

export async function handleAnalyticsSession(cookies, response) {

    let analyticsSessionId = cookies.get(storageKeys.ANALYTICS_SESSION_ID)?.value;

    const lastActive = parseInt(cookies.get(storageKeys.ANALYTICS_LAST_ACTIVE)?.value, 10);
    const now = Date.now();

    const sessionTimeout = 1 * 60 * 1000;
    
    if (!analyticsSessionId || !lastActive) {

        // Create a new session

        const newSessionId = uuid();

        logSession(newSessionId, "create");

        response.cookies.set(storageKeys.ANALYTICS_SESSION_ID, newSessionId);
        
        analyticsSessionId = newSessionId;

    } else if (now - lastActive > sessionTimeout) {

        // Expired session: End the current session and start a new one

        const newSessionId = uuid();

        if (analyticsSessionId) {

            logSession(analyticsSessionId, "end");

        };

        logSession(newSessionId, "create");

        response.cookies.set(storageKeys.ANALYTICS_SESSION_ID, newSessionId);

        analyticsSessionId = newSessionId;

    };

    response.cookies.set(storageKeys.ANALYTICS_LAST_ACTIVE, now);

    return analyticsSessionId;

};