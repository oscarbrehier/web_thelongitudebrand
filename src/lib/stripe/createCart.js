export default function createCart(items) {

	const cart = items.map((item) => {

		return {
			price_data: {
				currency: 'eur',
				unit_amount: item.price * 100,
				product_data: {
					name: `${item.name.toUpperCase()} - ${item.size}`,
					images: [item.cover]
				},
			},
			quantity: item.quantity,
		};

	});

    return { cart };

};