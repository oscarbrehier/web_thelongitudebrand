"use server";

import { cookies, headers } from "next/headers";
import { getCurrentUser } from "../authentication/sessionHelpers";
import { Analytics } from "./Analytics";
import { captureException } from "@sentry/nextjs";
import { storageKeys } from "../constants/settings.config";

const client = new Analytics({
    apiKey: process.env.ANALYTICS_API_KEY,
    baseUrl: process.env.ANALYTICS_API_URL
});

export async function captureEvent(eventType, payload) {

    try {

        let { get } = headers();

        if (!eventType) {

            return {
                errors: {
                    code: "missing/event-type"
                },
            };

        };

        const currentUser = await getCurrentUser();

        const sendPayload = {
            eventType,
            propreties: payload.propreties || {},
            ...payload,
            path: get("x-pathname") || null,
            referer: get("referer") || null,
            userAgent: get("x-user-agent") || null,
            ...(currentUser?.uid && {
                user: { id: currentUser.uid },
            }),
        };

        await client.makeRequest("/events", {
            method: "POST",
            body: JSON.stringify(sendPayload),
        });

        console.log("logged and made request for event", eventType);

    } catch (err) {

        console.error(err);

        captureException(err);

    };

};

export async function captureNavigation() {

    const cookieStore = cookies();
    const headersList = headers();

    try {

        const payload = {
            distinctId: cookieStore.get(storageKeys.ANALYTICS_SESSION_ID)?.value,
            propreties: {
                clientIp: headersList.get("x-real-ip"),
            },
        };

        await captureEvent("page view", payload);

        console.log("logged event");

    } catch (err) {

        console.log(err);

        captureException(err);

    };

};