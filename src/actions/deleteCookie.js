"use server";

import { cookies } from "next/headers";

export async function deleteCookie(name) {

    try {

        const cookieStore = cookies();
        cookieStore.delete(name);

        return [null, false];

    } catch (err) {

        console.error("Error setting cookie:", err);
        return [true];

    };

};

