import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST);
import { headers } from "next/headers";
import { captureException } from "@sentry/nextjs";

export async function POST(request, response) {

	let { cart, success_url, cancel_url } = await request.json();

	try {

		const session = await stripe.checkout.sessions.create({
			success_url,
			cancel_url,
			line_items: cart,
			mode: 'payment',
			allow_promotion_codes: true,
			shipping_address_collection: {
				allowed_countries: ['FR', 'GR', 'GB', 'DK', 'TR', 'AU']
			},
			billing_address_collection: "required",
		});

		return NextResponse.json({ url: session.url, id: session.id }, { status: 200 });

	} catch (err) {

		captureException(err);
		return NextResponse.json({ status: 500 });

	};

};

export async function GET(request, response) {

	const headersList = await headers();
	const session_id = headersList.get('session-id');

	try {

		const session = await stripe.checkout.sessions.retrieve(session_id);
		return NextResponse.json({ result: session }, { status: 200 });

	} catch (err) {

		captureException(err);
		return NextResponse.json({ result: null }, { status: '500' });

	}

};