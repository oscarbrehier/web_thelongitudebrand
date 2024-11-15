import { doc, getDoc } from "@firebase/firestore";
import { database } from "../firebase/client";
import * as Sentry from "@sentry/nextjs";

export default async function getCartFromDb(userId) {

    const ref = doc(database, 'carts', userId);
    
    try {

        const snapshot = await getDoc(ref);
        return snapshot.exists ? snapshot.data() : null;

    } catch (err) {

        Sentry.captureException(err, { extra: { userId }});
        throw new Error("Failed to fetch user's cart from database");

    };

};