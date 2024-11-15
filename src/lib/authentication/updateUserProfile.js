"use server"
import { getSession } from "./sessionHelpers";

const apiPath = process.env.API_PATH;

export default async function updateUserProfile(userId, data) {

    if (!userId || typeof data !== "object") throw new Error("Invalid parameters provided to updateUserProfile");

    const sessionToken = await getSession();

    const res = await fetch(`${apiPath}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionToken}`
        },
        body: JSON.stringify({
            userId,
            data
        }),
    });

    
    if (!res.ok) {
        
        const result = await res.json();

        return {
            errors: result.errors.code,
        };

    };

};