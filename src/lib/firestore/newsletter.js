"use server"
import { captureException } from "@sentry/nextjs";
import { adminFirestore } from "../firebase/admin"
import admin from "firebase-admin";

/**
 * Subscribe or unsubscribe a user from the newsletter
 * @param {string} email
 * @param {boolean} subscribe - true to subscribe, false to unsubscribe
 * @param {object} [data] - User data for subscribing (first and last name)
 */
export async function handleNewsletterSubscription(email, subscribe, data = {}) {

	try {
		
		const newsletterDocRef = adminFirestore.collection("newsletter").doc(email);

		if (subscribe) {

			await newsletterDocRef.set({
				email,
				firstName: data.firstName ?? "",
				lastName: data.lastName ?? "",
				subscribedAt: admin.firestore.Timestamp.now(),
			});

		} else {

			await newsletterDocRef.delete();

		};
		
	} catch (err) {
		captureException(err);
		throw err;
	};

};