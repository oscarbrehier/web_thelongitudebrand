"use server"
import { captureException } from "@sentry/nextjs";
import { adminFirestore } from "../firebase/admin";
import admin from "firebase-admin";
import { handleNewsletterSubscription } from "../firestore/newsletter";

export default async function updateUserProfile(userId, newEntries, entries) {

    if (!userId || typeof newEntries !== "object") throw new Error("Invalid parameters provided to updateUserProfile");

    const docRef = adminFirestore
        .collection("users")
        .doc(userId)

    try {

        handleNewsletterSubscription(entries.email, entries.newsletterSubscriber);

        if (newEntries.email) delete newEntries.email;

        await docRef
        .update({
            ...data,
            updatedAt: admin.firestore.Timestamp.now()
        });

    } catch (err) {
        captureException(err);
        throw err;
    }

};