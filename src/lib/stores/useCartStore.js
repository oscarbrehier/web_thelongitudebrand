import { persist } from "zustand/middleware";
import { create } from "zustand";
import getCartFromDb from "../firestore/getCartFromDb";
import updateCartInFirestore from "@/actions/addToCart";

const updateError = () => console.error('Failed to update cart in Firebase.');

export const useCartStore = create(
    persist(
        (set, get) => ({
            cart: [],
            total: 0,
            loadingCart: true,

            cartLength: () => get().cart.length,

            clearCart: () => set({ cart: [], total: 0 }),

            getCart: async (user) => {

                set({ loadingCart: true });

                if (user) {

                    try {
                        const { items } = await getCartFromDb(user);
                        set({ cart: items.length !== 0 ? items : [] });

                    } catch (err) {

                        console.error('Failed to fetch cart from Firebase');

                    };
                };

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

                    try {
                        await updateCartInFirestore(cart, user);
                    } catch (err) {
                        updateError();
                    };

                };


            },

            removeFromCart: async (productId, user) => {

                const updatedCart = get().cart.filter(
                    (cartItem) => cartItem.productId !== productId
                );

                set({ cart: updatedCart });
                get().calculateTotal();

                if (user) {

                    try {
                        await updateCartInFirestore(updatedCart, user.uid);
                    } catch (err) {
                        updateError();
                    };

                };


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

                    try {
                        await updateCartInFirestore(cart, user.uid);
                    } catch (err) {
                        updateError();
                    };

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
