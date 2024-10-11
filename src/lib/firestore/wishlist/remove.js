import { database } from "@/lib/authentication/firebase";
import { arrayRemove, doc, Timestamp, updateDoc } from "@firebase/firestore";

export default async function removeFromWishlist(productId, userId) {

    const ref = doc(database, "wishlist", userId);

    try {

        await updateDoc(ref, {
            items: arrayRemove(productId),
            updatedAt: Timestamp.now(),
        });

    } catch (err) {

        console.error(err);

    };

};