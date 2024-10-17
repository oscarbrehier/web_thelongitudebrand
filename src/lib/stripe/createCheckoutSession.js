import createCart from "./createCart";

export default async function createCheckoutSession(items, cancelUrl) {

    const { cart } = createCart(items);

    try {

        let { url, id } = await fetch('/api/checkout-session', {
            method: 'POST',
            body: JSON.stringify({
                cart: cart,
                cancelUrl
            }),
        }).then(res => res.json());
    
        return {
            url,
            id
        };
    
    } catch (err) {

        console.error("Error while creating checkout session:", err);
        return null;

    };

};