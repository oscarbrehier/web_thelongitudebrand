import { persist } from "zustand/middleware";
import { create } from "zustand";
import getCartFromDb from "../firestore/getCartFromDb";
import updateCartInFirestore from "@/actions/updateCartInFirestore";

const throwUpdateError = () => console.error('Failed to update cart in Firebase.');

export const useCartStore = create(
    persist(
        (set, get) => ({
            cart: [],
            total: 0,
            loadingCart: true,

            cartLength: () => get().cart.length,

            clearCart: async (user, database = false) => {

                if (user && database) {

                    const result = await updateCartInFirestore([], user.uid);

                    if (result?.errors) throwUpdateError();

                };

                set({ cart: [], total: 0 })

            },

            getCart: async (user, force = false) => {

                set({ loadingCart: true });
                force && console.log("force loading cart");

                if (user) {

                    try {
                        
                        // const { items } = await getCartFromDb(user);
                        // set({ cart: items.length !== 0 ? items : [] });

                        const { items: dbCart } = await getCartFromDb(user);
                        const localCart = get().cart;

                        if (force && dbCart.length == 0)
                        {
                            const result = await updateCartInFirestore(localCart, user);
                            if (result?.errors) throwUpdateError();
                            
                        }
                        else
                        {
                            set({ cart: dbCart.length !== 0 ? dbCart : [] });
                        }

                    } catch (err) {

                        throw err;

                    }

                }

                set({ loadingCart: false });
                get().calculateTotal();
            },

            addToCart: async (item, user) => {

                const cart = [...get().cart];

                const existsIndex = cart.findIndex(
                    (cartItem) =>
                        cartItem.productId === item.productId && cartItem.size === item.size
                );

                if (existsIndex !== -1) {
                    cart[existsIndex].quantity += 1;
                } else {
                    cart.push({ ...item, quantity: 1 });
                };

                set({ cart });
                get().calculateTotal();

                if (user) {

                    const result = await updateCartInFirestore(cart, user);
                    if (result?.errors) throwUpdateError();

                };


            },

            removeFromCart: async (productId, user) => {
                const updatedCart = get().cart.filter(
                    (cartItem) => cartItem.productId !== productId
                );

                set({ cart: updatedCart });
                get().calculateTotal();

                if (user) {
                    const result = await updateCartInFirestore(updatedCart, user.uid);
                    if (result?.errors) throwUpdateError();
                }
            },

            editItemQuantity: async (productId, direction, user) => {

                const cart = [...get().cart];
                const itemIndex = cart.findIndex(
                    (cartItem) => cartItem.productId === productId
                );

                if (direction === 'up') {
                    cart[itemIndex].quantity += 1;
                } else if (direction === 'down' && cart[itemIndex].quantity > 1) {
                    cart[itemIndex].quantity -= 1;
                };

                set({ cart });
                get().calculateTotal();

                if (user) {

                    const result = await updateCartInFirestore(cart, user);
                    if (result?.errors) throwUpdateError();
                    
                };


            },

            calculateTotal: () => {

                const total = get().cart.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                );

                set({ total });

            },
        }),
        {
            name: "cart-storage", // Key for local storage
        }
    ),
);
