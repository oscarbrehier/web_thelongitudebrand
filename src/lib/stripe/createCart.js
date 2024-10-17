export default function createCart(items) {

	const cart = items.map((item) => {

        const sizeLabel = ['XS', 'S', 'M', 'L'][item.size];

		return {
			price_data: {
				currency: 'eur',
				unit_amount: item.price * 100,
				product_data: {
					name: `${item.name.toUpperCase()} - ${sizeLabel}`,
					images: [item.cover]
				},
			},
			quantity: item.quantity,
		};

	});

    return { cart };

};