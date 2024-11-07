"use server"
import { adminFirestore } from "../firebase/admin";
import admin from "firebase-admin";
import * as Sentry from "@sentry/nextjs";

export default async function createUser(userId, data) {

    if (!userId || typeof data !== "object") throw new Error("Invalid parameters provided to createUser");

    try {

        await adminFirestore
            .collection("users")
            .doc(userId)
            .set(data);

        await adminFirestore
            .collection("carts")
            .doc(userId)
            .set({
                items: [],
                updatedAt: admin.firestore.Timestamp.now(),
            });

    } catch (err) {

        console.log("Failed to create user in Firestore");
        console.error(err);
        Sentry.captureException(err);

    };

};