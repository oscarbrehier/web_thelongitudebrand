"use server"
import { cookies } from "next/headers";

async function deleteAuthCookie() {

    cookies().delete("authToken");

};

async function setAuthCookie(token) {

    cookies().set("authToken", token, {
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