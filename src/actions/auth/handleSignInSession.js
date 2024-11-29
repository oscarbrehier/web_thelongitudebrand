"use server"

import { storageKeys } from "@/lib/constants/settings.config";
import { setCache } from "@/lib/redis";
import { captureException } from "@sentry/nextjs"
import { cookies } from "next/headers";

export async function handleSignInSession() {

    try {

        const sessionId = cookies().get(storageKeys.SESSION_ID)?.value;

        if (!sessionId) return [true];

        await setCache(`user-${sessionId}`, true);

        return [null, true];

    } catch (err) {

        captureException(err);
        return [true];

    };

}