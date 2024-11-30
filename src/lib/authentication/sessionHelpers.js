import "server-only";
import { cookies } from "next/headers";
import { adminAuth } from "../firebase/admin";
import { storageKeys } from "../constants/settings.config";

export async function isUserAuthenticated(session) {

    const _session = session ?? (await getSession());
    if (!_session) return false;

    try {

        const isRevoked = !(await adminAuth.verifySessionCookie(_session, true));
        return !isRevoked;

    } catch (error) {

        console.log(error);
        return false;

    };

};

export async function getCurrentUser() {

    const session = await getSession();

    if (!(await isUserAuthenticated(session))) {
        return null;
    };

    const decodedIdToken = await adminAuth.verifySessionCookie(session);
    const currentUser = await adminAuth.getUser(decodedIdToken.uid);

    return currentUser;

};

export async function getSession() {

    try {

        return cookies().get(storageKeys.SESSION)?.value;

    } catch (error) {

        return undefined;

    };

};

export async function createSessionCookie(idToken, sessionCookieOptions) {

    return adminAuth.createSessionCookie(idToken, sessionCookieOptions);

};

export async function revokeAllSessions(session) {

    const decodeIdToken = await adminAuth.verifySessionCookie(session);
    return await adminAuth.revokeRefreshTokens(decodeIdToken.sub);

};