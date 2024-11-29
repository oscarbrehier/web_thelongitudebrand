"use server"
import getCheckoutData from "../stripe/getCheckoutData";
import getOrder from "./getOrder";
import getOrderProcess from "./getOrderProcess";

const fetchFailedError = {
    code: "fetch-failure",
    error: "Something went wrong while retrieving your order details. Please refresh the page or try again later."
};

const handleError = () => fetchFailedError;

export default async function getOrderDetails(orderId, userId) {

    if (!orderId || typeof orderId !== "string" || !userId || typeof userId !== "string") {

        return {
            code: "invalid-parameters",
            error: "Invalid parameter provided to getOrderDetails",
        };

    };

    try {

        const order = await getOrder(orderId, userId);
        if (order?.error) return handleError();

        const [orderProcess, checkout] = await Promise.all([
            getOrderProcess(orderId, userId),
            getCheckoutData(order.stripeCheckoutId, userId)
        ]);

        if (orderProcess?.error || checkout?.error) {
            return handleError();
        };

        return {
            order,
            orderProcess,
            checkout
        }

    } catch (err) {

        console.error(err);
        return handleError();

    };

};