import { addDoc, collection, Timestamp } from "@firebase/firestore";
import { database } from "./firebase/client";
import createCheckoutSession from "./stripe/createCheckoutSession";
import generateOrderId from "./utils/generateOrderId";

export const checkout = async (data) => {

    const { userId, cart, total, cancelUrl } = data;

    try {

        const { url, id } = await createCheckoutSession(cart, cancelUrl);

        if (userId) {

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

        };

        return { url };

    } catch (err) {

        throw err;

    };

};