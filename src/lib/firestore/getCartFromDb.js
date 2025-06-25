import { doc, getDoc } from "@firebase/firestore";
import { database } from "../firebase/client";
import * as Sentry from "@sentry/nextjs";

export default async function getCartFromDb(userId) {

    const ref = doc(database, 'carts', userId);
    
    try {

        const snapshot = await getDoc(ref);
        if (snapshot.exists()) {
            
            const data = snapshot.data();
            return data ?? { items: [] };

        } else {
            return { items: [] };
        }

    } catch (err) {

        Sentry.captureException(err, { extra: { userId }});
        throw new Error("Failed to fetch user's cart from database");

    };

};