"use server"

import { adminFirestore } from "@/lib/firebase/admin";
import admin from "firebase-admin";

export default async function updateCartInFirestore(items, userId) {

    try {

        const docRef = adminFirestore.collection("carts").doc(userId);
        await docRef.update({
            items,
            updatedAt: admin.firestore.Timestamp.now()
        });

    } catch (err) {

        console.log(err);
        throw new Error("ERROR_UPDATE_CART");

    };

};