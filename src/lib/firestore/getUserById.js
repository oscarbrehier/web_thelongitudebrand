"use server"

import { captureException } from "@sentry/nextjs";
import { adminFirestore } from "../firebase/admin"

export async function getUserById(userId, params) {

	const userDocRef = adminFirestore
		.collection("users")
		.doc(userId);

	try {

		const userSnapshot = await userDocRef.get();
		if (!userSnapshot) return (null);

		const userData = userSnapshot.data();

		if (params?.email) {


			const newsletterSnapshot = await adminFirestore
				.collection("newsletter")
				.doc(params.email)
				.get();

			userData.newsletterSubscriber = newsletterSnapshot.exists;
			
		} else {
			userData.newsletterSubscriber = false;
		};

		return (userData);

	} catch (err) {

		captureException(err);
		throw err;

	};

}