export default async function getCheckoutData(checkoutId) {

	const isDev = process.env.NODE_ENV === "development";
	const baseRoute = isDev ? "http://localhost:3000" : "https://thelongitudebrand.com";

	console.log(baseRoute)

	try {

		let res = await fetch(`${baseRoute}/api/checkout/session`, {
			method: 'GET',
			headers: {
				'session-id': checkoutId
			}
		}).then(res => res.json());

		return res.result;

	} catch (err) {

		console.error(err);
		throw new Error("ERROR_FETCH_STRIPE_CHECKOUT");

	};

};