"use server"
import { v4 as uuid } from "uuid"
import { logSession } from "./log";
import { storageKeys } from "@/lib/constants/settings.config";
import { setCookie } from "@/actions/setCookie";

export async function createAnalyticsSession(response = null) {

    const newSessionId = uuid();

    logSession(newSessionId, "create");

    if (response) {

        response.cookies.set(storageKeys.ANALYTICS_SESSION_ID, newSessionId);

    } else {

        await setCookie(storageKeys.ANALYTICS_SESSION_ID, newSessionId);

    };
    
    return newSessionId;

};