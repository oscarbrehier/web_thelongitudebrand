"use server"
import { captureException } from "@sentry/nextjs";
import getCheckoutData from "../stripe/getCheckoutData";
import getOrder from "./getOrder";
import getOrderProcess from "./getOrderProcess";

const fetchFailedError = {
    code: "fetch-failure",
    error: "Something went wrong while retrieving your order details. Please refresh the page or try again later."
};

const handleError = () => fetchFailedError;

export default async function getOrderDetails(orderId) {

    if (!orderId || typeof orderId !== "string") {

        return {
            code: "invalid-parameters",
            error: "Invalid parameter provided to getOrderDetails",
        };

    };

    try {

        const [order, orderProcess] = await Promise.all([
            getOrder(orderId),
            getOrderProcess(orderId),
        ]);

        const checkout = await getCheckoutData(order.stripeCheckoutId);

        if (order?.error || orderProcess?.error || checkout?.error) {
            return handleError();
        };

        return {
            order,
            orderProcess,
            checkout
        }

    } catch (err) {

        captureException(err);
        return handleError();

    };

};