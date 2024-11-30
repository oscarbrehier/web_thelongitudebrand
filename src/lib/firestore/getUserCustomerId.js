"use server"
import { doc, getDoc } from "@firebase/firestore";
import { database } from "../firebase/client";
import { adminFirestore } from "../firebase/admin";

export default async function getUserCustomerId(userId) {

    if (!userId) throw new Error("Invalid parameter `userId` for getUserCustomerId");

    const docRef = adminFirestore
        .collection("users")
        .doc(userId);

    try {

        const user = await docRef.get();
        return user.exists ? user.data().stripeCustomerId : null;

    } catch (err) {

        throw new Error("Could not retrieve user customer ID");

    };

};