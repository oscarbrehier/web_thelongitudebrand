"use server"
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST);

export default async function createCustomer(name, email) {

    try {

        const customer = await stripe.customers.create({
            name, email
        });

        return customer;

    } catch (err) {

        console.error(err);
        return {
            errors: "stripe-create-customer/failed"
        };

    };

};