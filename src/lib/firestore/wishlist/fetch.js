"use server"

import { adminFirestore } from "@/lib/firebase/admin";
import { captureException } from "@sentry/nextjs";

export async function wishlistFetch(userId) {

    const ref = adminFirestore
        .collection("wishlists")
        .doc(userId);

    try {

        const doc = await ref.get();

        return doc.exists ? doc.data().items : null;

    } catch (err) {

        captureException(err);

        return "wishlist_fetch_failed";

    };

};