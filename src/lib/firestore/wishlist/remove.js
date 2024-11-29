"use server"

import { adminFirestore } from "@/lib/firebase/admin"
import { delCache } from "@/lib/redis";
import { firestore } from "firebase-admin";

export async function wishlistRemove(productTitle, userId) {

    const ref = adminFirestore
        .collection("wishlists")
        .doc(userId);

    try {

        await ref.update({
            items: firestore.FieldValue.arrayRemove(productTitle),
            updatedAt: firestore.Timestamp.now(),
        });

        await delCache(`wishlist-${productTitle}-${userId}`);

        return [null, false];

    } catch (err) {

        return [true, true];

    };

};