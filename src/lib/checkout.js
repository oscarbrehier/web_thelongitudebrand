import { deleteCart } from "./cart";
import { addDoc, collection, Timestamp } from "@firebase/firestore";
import { database } from "./firebase/firebase";
import createCheckoutSession from "./stripe/createCheckoutSession";
import generateOrderId from "./generateOrderId";

export const checkout = async (userId, cart, total, cancelUrl) => {

    try {

        const { url, id } = await createCheckoutSession(cart, cancelUrl);

        const cartRef = collection(database, "orders");

        const orderId = generateOrderId(userId);

        await addDoc(cartRef, {
            userId,
            items: cart,
            total,
            orderId,
            checkoutId: id,
            at: Timestamp.now(),
        });

        // deleteCart();

        return { url };

    } catch (err) {

        console.error(err);
        return null;

    };

};