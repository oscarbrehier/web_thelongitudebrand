import { client } from "../client";

export default async function fetchUserWishlist(userId, key, value) {

    const res = await client.fetch(`
        *[_type == "user" && firebaseId == $userId]
        {
            wishlist[] -> {
                title, images, _type, _id, category ->  { _ref, _type, title }, price, slug
            }
        }`,
        { userId }
    );

    if (key) {

        let data = [];

        res[0].wishlist.map((item, index) => {
            
            if (item[key] == value) {

                data.push(item);

            };

        });

        return data;

    };

    return res[0].wishlist;

};