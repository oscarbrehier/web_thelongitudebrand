import { persist } from "zustand/middleware";
import { create } from "zustand";
import getCartFromDb from "../firestore/getCartFromDb";
import updateCartInFirestore from "@/actions/addToCart";
import { storageKeys } from "../constants/settings.config";

const updateError = () => console.error('Failed to update cart in Firebase. Saving to local storage');

export const useCartStore = create(
    persist(
        (set, get) => ({
            cart: [],
            total: 0,

            cartLength: () => get().cart.length,

            clearCart: () => set({ cart: [], total: 0 }),

            getCart: async (user) => {
                
                if (user) {
                    
                    try {

                        const { items } = await getCartFromDb(user);
                        set({ cart: items.length !== 0 ? items : [] });
                        localStorage.setItem(storageKeys.CART, JSON.stringify(items));

                    } catch (err) {

                        console.error('Failed to fetch cart from Firebase');
                        const savedCart = JSON.parse(localStorage.getItem(storageKeys.CART)) || [];
                        set({ cart: savedCart });

                    };

                } else {
                    
                    const savedCart = JSON.parse(localStorage.getItem(storageKeys.CART)) || [];
                    set({ cart: savedCart });

                };

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


                if (user) {

                    try {

                        await updateCartInFirestore(cart, user);

                    } catch (err) {

                        updateError();
                        localStorage.setItem(storageKeys.CART, JSON.stringify(cart));

                    };

                } else {

                    localStorage.setItem(storageKeys.CART, JSON.stringify(cart));

                };

                set({ cart });
                get().calculateTotal();

            },

            removeFromCart: async (productId, user) => {

                const cart = [...get().cart];

                const updatedCart = cart.filter(
                    (cartItem) => cartItem.productId !== productId
                );

                if (user) {

                    try {

                        await updateCartInFirestore(updatedCart, user.uid);

                    } catch (err) {

                        updateError();
                        localStorage.setItem(storageKeys.CART, JSON.stringify(updatedCart));
                        
                    };
                    
                } else {
                    
                    localStorage.setItem(storageKeys.CART, JSON.stringify(updatedCart));

                };

                set({ cart: updatedCart });
                get().calculateTotal();

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

                if (user) {

                    try {

                        await updateCartInFirestore(cart, user.uid);

                    } catch (err) {

                        updateError();
                        localStorage.setItem(storageKeys.CART, JSON.stringify(cart));

                    };

                } else {

                    localStorage.setItem(storageKeys.CART, JSON.stringify(cart));

                };

                set({ cart });
                get().calculateTotal();

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
            name: "cart-storage",
        },

    ),
);