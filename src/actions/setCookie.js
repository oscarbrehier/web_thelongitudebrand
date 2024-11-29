"use server";

import { cookies } from "next/headers";

export async function setCookie(name, value, options = {}) {

    try {

        const cookieStore = cookies();
        cookieStore.set(name, value, { secure: true, ...options });

        return [null, false];

    } catch (err) {

        console.error("Error setting cookie:", err);
        return [true];

    };

};

