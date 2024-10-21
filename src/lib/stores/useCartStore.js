import { persist } from "zustand/middleware";
import { create } from "zustand";
import getCartFromDb from "../firestore/getCartFromDb";
import updateCartInFirestore from "@/actions/addToCart";
import { useAuthContext } from "../context/AuthContext";

export const useCartStore = create(
    persist(
        (set, get) => ({
            cart: [],
            total: 0,

            cartLength: () => get().cart.length,

            clearCart: () => set({ cart: [], total: 0 }),

            getCart: async (user) => {
                
                if (user) {
                    
                    const { items } = await getCartFromDb(user);
                    
                    if (items.length !== 0) {

                        set({ cart: items });
                        localStorage.setItem('cart', JSON.stringify(items));

                    } else {

                        set({ cart: [] });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
  
                    };

                } else {
                    
                    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
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

                    await updateCartInFirestore(cart, user);

                } else {

                    localStorage.setItem('cart', JSON.stringify(cart));

                };

                set({ cart });
                get().calculateTotal();

            },

            removeFromCart: async (productId) => {

                const cart = [...get().cart];
                const { user } = useAuthContext();

                const updatedCart = cart.filter(
                    (cartItem) => cartItem.productId !== productId
                );

                if (user) {

                    await updateCartInFirestore(updatedCart, user.uid);

                } else {

                    localStorage.setItem('cart', JSON.stringify(updatedCart));

                };

                set({ cart: updatedCart });
                get().calculateTotal();

            },

            editItemQuantity: async (productId, direction) => {

                const cart = [...get().cart];
                const { user } = useAuthContext();

                const itemIndex = cart.findIndex(
                    (cartItem) => cartItem.productId === productId
                );

                if (direction === 'up') {

                    cart[itemIndex].quantity += 1;

                } else if (direction === 'down' && cart[itemIndex].quantity > 1) {

                    cart[itemIndex].quantity -= 1;

                };

                if (user) {

                    await updateCartInFirestore(cart, user.uid);

                } else {

                    localStorage.setItem('cart', JSON.stringify(cart));

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