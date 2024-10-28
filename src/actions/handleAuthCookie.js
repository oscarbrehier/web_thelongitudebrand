"use server"
import { cookies } from "next/headers";
import { storageKeys } from "@/lib/constants/settings.config";

async function deleteAuthCookie() {

    cookies().delete(storageKeys.SESSION);

};

async function setAuthCookie(token) {

    cookies().set(storageKeys.SESSION, token, {
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

