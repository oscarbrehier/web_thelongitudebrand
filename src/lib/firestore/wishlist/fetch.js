import { database } from "@/lib/authentication/firebase";
import { doc, getDoc } from "@firebase/firestore";

export default async function fetchUserWishlist(userId) {

    const ref = doc(database, "wishlist", userId);

    try {

        const wishlist = await getDoc(ref);
        return wishlist.exists() ? wishlist.data().items : null;

    } catch (err) {

        console.log(err);
        return null;

    };

};