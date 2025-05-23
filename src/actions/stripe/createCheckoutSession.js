"use server"
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST);

export default async function createCheckoutSession(data) {

	// if (!data || typeof data !== "object" || data.length === 0) {
	// 	throw new Error("Invalid parameters provided to createCheckoutSession");
	// };

	const { stripeCart, customerId, orderId, userId } = data;

	const isDev = process.env.NODE_ENV === "development";
	const origin = isDev ? "http://localhost:3000" : "https://www.longitudebrand.com";

	try {	

		const sessionData = {
			success_url: userId ? `${origin}/checkout/success/{CHECKOUT_SESSION_ID}` : `${origin}/checkout/success/{CHECKOUT_SESSION_ID}?cart=delete`,
			cancel_url: origin + "/cart",
			line_items: stripeCart,
			mode: 'payment',
			allow_promotion_codes: true,
			shipping_address_collection: {
				allowed_countries: ['FR', 'GR', 'GB', 'DK', 'TR', 'AU']
			},
			billing_address_collection: "required",
			metadata: {
				orderId,
				userId,
			}
		};

		if (customerId) sessionData.customer = customerId;

		const session = await stripe.checkout.sessions.create(sessionData);

		return{ url: session.url, id: session.id };

	} catch (err) {

		console.error(err);
		return {
			errors: "checkout-create/failed",
		};

	};

};