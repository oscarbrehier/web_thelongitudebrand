import handleCheckoutSessionCompleted from "./handleCheckoutSessionCompleted";
import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs"
import { headers } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST);

const endpointSecret = process.env.WEBHOOK_SECRET;

export async function POST(req) {

    try {

        const rawBody = await req.text();
        const headerPayload = headers();

        const signature = headerPayload.get("stripe-signature");

        if (!signature) {
            throw new Error("Missing stripe-signature header");
        };

        const event = stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);

        switch (event.type) {

            case "checkout.session.completed":

                console.log("(stripe event) checkout.session.completed")

                await handleCheckoutSessionCompleted(event.data.object, headerPayload);
                break;

            default:
                break;

        };

        return NextResponse.json({ status: 200 });

    } catch (err) {

        console.log(err);

        Sentry.captureException(err);

        return NextResponse.json({
            message: "Something went wrong",
            ok: false
        }, {
            status: 500
        });

    };

};