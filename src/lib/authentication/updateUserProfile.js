"use server"
import { adminFirestore } from "../firebase/admin";

export default async function updateUserProfile(userId, data) {

    if (!userId || typeof data !== "object") throw new Error("Invalid parameters provided to updateUserProfile");

    try {

        const docRef = adminFirestore
            .collection("users")
            .doc(userId);

        await docRef.update(data);

    } catch (err) {

        console.error(`Failed to update information for user with ID: ${userId}`)
        console.error(err);
        throw new Error("Failed to update user information");

    };

};
