import getUserCustomerId from "../firestore/getUserCustomerId";

export default async function getCheckoutData(checkoutId, userId) {

	const isDev = process.env.NODE_ENV === "development";
	const baseRoute = isDev ? "http://localhost:3000" : "https://www.thelongitudebrand.com";

	try {

		const customerId = await getUserCustomerId(userId);

		if (!customerId) {

			return {
				error: "customer-fetch/failed",
			};

		};

		let res = await fetch(`${baseRoute}/api/checkout/session`, {
			method: 'GET',
			headers: {
				'session-id': checkoutId
			}
		}).then(res => res.json());

		if (!res.result || res.result.customer !== customerId) {

			return {
                error: "checkout-fetch/not-found",
            };

		};

		return res.result;

	} catch (err) {

		console.error(err);
		return {
			error: "checkout-fetch/failed",
		};

	};

};