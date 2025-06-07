"use server"
import { captureException } from "@sentry/nextjs";
import { adminFirestore } from "../firebase/admin"
import admin from "firebase-admin";

export async function updateNewsletterSubscriber(email, data) {

	try {

		if (data.newsletterSubscriber) {

			await adminFirestore
				.collection("newsletter")
				.doc(email)
				.set({
					email,
					firstName: data.firstName,
					lastName: data.lastName,
					subscribedAt: admin.firestore.Timestamp.now(),
				});

		} else {

			const newsletterDocRef = adminFirestore
				.collection("newsletter")
				.doc(email);

			await newsletterDocRef.delete();

		};

	} catch (err) {
		captureException(err);
		throw err;
	}

};