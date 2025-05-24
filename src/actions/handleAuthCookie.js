"use server"
import { cookies } from "next/headers";
import { storageKeys } from "@/lib/constants/settings.config";

async function deleteAuthCookie() {

    (await cookies()).delete(storageKeys.SESSION);

};

async function setAuthCookie(token) {

    (await cookies()).set(storageKeys.SESSION, token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
    });

};

export {
    setAuthCookie,
    deleteAuthCookie,
};

