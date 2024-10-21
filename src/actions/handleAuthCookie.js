"use server"
import { cookies } from "next/headers";

async function deleteAuthCookie() {

    cookies().delete("__session");

};

async function setAuthCookie(token) {

    cookies().set("__session", token, {
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

