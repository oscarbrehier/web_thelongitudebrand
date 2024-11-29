"use server";

import { headers } from "next/headers";
import { getCurrentUser } from "../authentication/sessionHelpers";
import { Analytics } from "./Analytics";
import { captureException } from "@sentry/nextjs";

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
            propreties: payload.propreties,
            ...payload,
            path: get("x-pathname") || null,
            referer: get("referer") || null,
            userAgent: get("user-agent"),
            ...(currentUser?.uid && {
                user: {
                    id: currentUser.uid
                },
            }),
        };

        const result = await client.makeRequest("/events", {
            method: "POST",
            body: JSON.stringify(sendPayload),
        });

    } catch (err) {

        captureException(err);

    };

};