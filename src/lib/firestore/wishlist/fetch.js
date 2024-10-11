import { database } from "@/lib/authentication/firebase";
import { doc, getDoc } from "@firebase/firestore";

export default async function fetchUserWishlist(userId) {

    const ref = doc(database, "wishlist", userId);

    try {

        const wishlist = await getDoc(ref);

        if (wishlist.exists()) {

            return wishlist.data().items;

        } else {

            return null;

        };

    } catch (err) {

        return null;

    };

};