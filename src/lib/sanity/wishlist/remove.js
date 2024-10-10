import getUserByFirebaseId from "../getUserByFirebaseId";

export default async function removeFromWishlist(firebaseUserId, productId) {

    const sanityUser = await getUserByFirebaseId(firebaseUserId);

    const res = await fetch("/api/sanity/wishlist/delete", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: sanityUser._id,
            productId: productId,
        }),
    });

    return res;

};