"use server"

import { revokeAllSessions } from "@/lib/authentication/sessionHelpers";
import { storageKeys } from "@/lib/constants/settings.config"
import { setCache } from "@/lib/redis";
import { captureException } from "@sentry/nextjs";
import { cookies } from "next/headers"

export async function handleSignOutSession() {
    
    try {
        
        const cookieStore = cookies();
        
        const sessionCookie = cookieStore.get(storageKeys.SESSION)?.value;
        const sessionIdCookie = cookieStore.get(storageKeys.SESSION_ID)?.value;
        
        if (!sessionCookie || !sessionCookie) {
                
            return [true];
            
            
        };
        
        cookieStore.delete(storageKeys.SESSION);
        await revokeAllSessions(sessionCookie);

        await setCache(`user-${sessionIdCookie}`, false);

        return [null, true];

    } catch (err) {

        console.log(err);

        captureException(err);
        return [true];

    };

};