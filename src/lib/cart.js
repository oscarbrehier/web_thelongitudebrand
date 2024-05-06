import { v4 as uuidv4 } from 'uuid';

const getCartItem = (id) => {

	const cart = getCartItems();
	return cart.filter((item) => item.item_id == id)[0];

};

export const getCartItems = () => {
	const cartItemsFromStorage = localStorage.getItem('longitudeCart');
	return cartItemsFromStorage ? JSON.parse(cartItemsFromStorage) : [];
};

export const getCartLength = () => {

	const cart = getCartItems();
	let numItems = 0;

	cart.forEach((item) => {
		numItems += item.quantity;
	});

	return numItems;

};

export const addToCart = (item) => {

	const cartItems = getCartItems();

	const exists = cartItems.find((cartItem) =>
		cartItem.item_id === item.item_id && cartItem.size === item.size
	);

	if (exists) {

		exists.quantity += 1;
		exists.price = exists.unit_price * exists.quantity;
		localStorage.setItem('longitudeCart', JSON.stringify(cartItems));

	} else {

		const updatedCartItems = [...cartItems, item];
		localStorage.setItem('longitudeCart', JSON.stringify(updatedCartItems));

	}

	window.dispatchEvent(new Event('storage_new_item'));


};

export const removeFromCart = (id) => {

	const cartItems = getCartItems();

	const updatedCartItems = cartItems.filter((item) => item.item_id != id);
	localStorage.setItem('longitudeCart', JSON.stringify(updatedCartItems));

	return updatedCartItems;
	
};

export const editCartItem = (id, property, value) => {


	const cart = getCartItems();

	cart.map((item) => {

		if (item.item_id == id && property == 'quantity') {

			item['quantity'] = parseInt(value);
			item['price'] = item.quantity * item.unit_price; 

		} else if (item.item_id == id) {
			item[property] = value;
		}

	});

	localStorage.setItem('longitudeCart', JSON.stringify(cart));
	window.dispatchEvent(new Event('storage_new_item'));

	return cart;

};

export const editItemQuantity = (id, direction) => {

	return getCartItem(id);

}

export const getCartPrice = () => {

	const cart = getCartItems();
	let result = 0;

	cart.map((item) => {
		result += item.price;
	});

	return result;

};

export const stripeCartFormat = () => {

	const cart = getCartItems();
	let result = [];

	cart.forEach((item) => {

		result.push({
			price_data: {
				currency: 'eur',
				unit_amount: item.unit_price * 100,
				product_data: {
					name: `${item.name.toUpperCase()} - ${['XS', 'S', 'M', 'L'].filter((size, index) => index == item.size)}`,
					images: [item.assets.image]
				},
			},
			quantity: item.quantity,
		});

	});

	return result;

};

export const sanityCartFormat = () => {

	const cart = getCartItems();

	let doc = {
		_type: 'order',
		total: 0,
		products: []
	};

	cart.forEach((item) => {

		doc.products.push({
			_key: uuidv4(),
			// title: `${item.name.toUpperCase()} - ${['XS', 'S', 'M', 'L'].filter((size, index) => index == item.size)}`,
			// price: item.price
			_type: 'product',
			product: {
				_type: 'reference',
				_ref: item.item_id.slice(0, -7),
			},
			size: ['XS', 'S', 'M', 'L'].filter((size, index) => index == item.size).toString(),
			quantity: item.quantity,
			unit_price: item.unit_price,
		});

		doc.total += item.price;

	});

	return doc;

};

export const deleteCart = () => {

	return localStorage.removeItem('longitudeCart');

};