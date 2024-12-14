import { setCookie } from "@/actions/setCookie";
import { createAnalyticsSession } from "@/lib/analytics/sessions/create";
import { endAnalyticsSession } from "@/lib/analytics/sessions/end";
import { isDev, storageKeys } from "@/lib/constants/settings.config";
import { useEffect, useRef } from "react";
import { Cookies } from "react-cookie";

// Defaults:
//  -  end session after 1 minute of inactivity 
//  -  update last active cookie every 30 seconds

const cookies = new Cookies();

function debounce(func, delay) {

    let timeout;

    return function (...args) {

        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);

    };

};

export async function useAnalyticsSession(updateInterval = 10 * 1000) {

    const timeout = isDev
        ? 20 * 1000
        : process.env.NEXT_PUBLIC_ANALYTICS_SESSION_TIMEOUT * 60 * 1000;

    const sessionId = useRef(getSessionId() || null);
    const sessionEnded = useRef(false);

    const lastActiveRef = useRef(Date.now());
    const lastCookieValue = useRef(null);

    function getSessionId(set = false) {

        const sessionIdCookie = cookies.get(storageKeys.ANALYTICS_SESSION_ID) || null;

        if (set && sessionIdCookie) sessionId.current = sessionIdCookie;

        return sessionIdCookie;

    };

    useEffect(() => {

        console.log(sessionId)

        
        async function updateLastActive() {
            
            const currentSessionId = sessionId.current;
            
            if (!currentSessionId && !getSessionId() || sessionEnded.current) {
                
                const newSessionId = await createAnalyticsSession();
                sessionId.current = newSessionId;
                
            };
            
            if (sessionEnded.current) sessionEnded.current = false;

            lastActiveRef.current = Date.now();

            console.log("Activity detected");

        };

        async function updateLastActiveCookie() {

            if ((lastCookieValue.current !== lastActiveRef.current) && !sessionEnded.current) {

                await setCookie(storageKeys.ANALYTICS_LAST_ACTIVE, lastActiveRef.current);
                console.log(`Setting new value for cookie ${storageKeys.ANALYTICS_LAST_ACTIVE}`)

            };

        };

        const setCookieInterval = setInterval(() => {
            
            if (!sessionEnded.current) getSessionId(true);

        }, 10 * 1000);

        const updateCookieInterval = setInterval(updateLastActiveCookie, updateInterval);

        const handleInactivity = setInterval(async () => {

            const now = Date.now();

            const cookieLastActiveValue = cookies.get(storageKeys.ANALYTICS_LAST_ACTIVE) || 0;

            const lastActive = cookieLastActiveValue !== lastActiveRef.current
                ? Math.max(cookieLastActiveValue, lastActiveRef.current)
                : cookieLastActiveValue;

            console.log("lastActive", lastActive)

            if (now - lastActive > timeout) {

                const currentSessionId = sessionId.current;

                if (currentSessionId) {

                    await endAnalyticsSession(currentSessionId);
                    sessionEnded.current = true;

                    console.log(`Session ${currentSessionId} ended. Last active at ${lastActive}`)

                };

            };

        }, 10 * 1000);

        const debounceUpdateLastActive = debounce(updateLastActive, 1000);

        window.addEventListener("mousemove", debounceUpdateLastActive);
        window.addEventListener("scroll", debounceUpdateLastActive);
        window.addEventListener("keydown", debounceUpdateLastActive);

        return () => {

            window.removeEventListener("mousemove", debounceUpdateLastActive);
            window.removeEventListener("scroll", debounceUpdateLastActive);
            window.removeEventListener("keydown", debounceUpdateLastActive);

            clearInterval(setCookieInterval);
            clearInterval(updateCookieInterval);
            clearInterval(handleInactivity);

        };

    }, [timeout]);

};