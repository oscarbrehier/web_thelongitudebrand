import createCheckoutSession from "@/actions/stripe/createCheckoutSession";
import createCart from "./stripe/createCart";
import getUserCustomerId from "./firestore/getUserCustomerId";
import createOrder from "./firestore/createOrder";
import generateOrderId from "./utils/generateOrderId";
import { v4 as uuid } from "uuid";

export default async function checkout(user = null, items, total) {

    if (!Array.isArray(items) || items.length === 0 || typeof total !== "number") {
        throw new Error("Invalid parameters provided to checkout");
    };

    try {

        const { cart } = createCart(items);
        const customerId = user ? await getUserCustomerId(user?.uid) : null;
        const orderId = generateOrderId(user?.uid || uuid());

        const { url } = await createCheckoutSession({
            stripeCart: cart,
            cartItems: items,
            customerId, 
            orderId, 
            userId: user?.uid || null
        });

        return url;

    } catch (err) {

        console.error(err);
        throw new Error("Checkout creation failed. Please try again later.");

    };

};