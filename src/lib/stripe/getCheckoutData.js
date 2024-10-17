export default async function getCheckoutData(checkoutId) {

	const { origin } = window.location;

	try {

		let res = await fetch(`${origin}/api/checkout-session`, {
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