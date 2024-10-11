import { client } from "./sanity/client";
import { deleteCart } from "./cart";
import { getCartItems } from "./cart";
import { doc, setDoc, Timestamp } from "@firebase/firestore";
import { database } from "./authentication/firebase";

const formatCart = (items) => {

    let cart = [];
    let total = 0;

    items.forEach((item) => {

        cart.push({
            productId: item.item_id,
            name: item.name,
            size: item.size,
            quantity: item.quantity,
            price: item.unit_price,
            cover: item.assets.image
        });

        total += item.price * item.quantity;

    });

    return { cart, total };

};

export const checkout = async (carts, cancel_url, user) => {
    
    let { stripe_cart, sanity_cart } = carts;

    // let { url, id } = await fetch('/api/checkout-session', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         cart: stripe_cart,
    //         cancel_url
    //     }),
    // }).then(res => res.json());

    // sanity_cart['stripe_checkout_id'] = id;

    try {

        const { cart, total } = formatCart(getCartItems());
        
        const cartRef = doc(database, 'carts', user.uid);

        await setDoc(cartRef, {
            items: cart,
            total: total,
            lastUpdated: Timestamp.now(),
        });

        // client.create(sanity_cart);
        // deleteCart();

    } catch (err) {

        console.error(err);

    };

    // return { url };

};