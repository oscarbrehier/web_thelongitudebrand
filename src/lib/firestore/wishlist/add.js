"use server"

import { adminFirestore } from "@/lib/firebase/admin";
import { setCache } from "@/lib/redis";
import { captureException } from "@sentry/nextjs";
import { firestore } from "firebase-admin";

export async function wishlistAdd(productTitle, userId) {

    const ref = adminFirestore
        .collection("wishlists")
        .doc(userId);

    try {

        const snapshot = await ref.get();

        if (snapshot.exists) {

            await ref.update({
                items: firestore.FieldValue.arrayUnion(productTitle),
                updatedAt: firestore.Timestamp.now(),
            });

        } else {

            await ref.set({
                items: [productTitle],
                updatedAt: firestore.Timestamp.now(),
            });

        };

        await setCache(`wishlist-${productTitle}-${userId}`, true);

        return [null, true];

    } catch (err) {

        captureException(err);
        
        return [true, false];

    };

};