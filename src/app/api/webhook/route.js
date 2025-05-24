import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import handleCheckoutSuccess from "./handleCheckoutSuccess";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST);

const endpointSecret = process.env.WEBHOOK_SECRET;

export async function POST(req) {

    const rawBody = await req.text();
    const sig = (await headers()).get("stripe-signature");

    let event;

    try {

        event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);

    } catch (err) {

        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 400 });

    };

    switch (event.type) {

        case "checkout.session.completed":

            handleCheckoutSuccess(event);
            break;

        default:
            break;

    };

    return NextResponse.json({ status: 200 });

};