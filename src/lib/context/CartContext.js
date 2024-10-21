'use client'

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useAuthContext } from "./AuthContext";
import getCartFromDb from "../firestore/getCartFromDb";
import { doc, setDoc, Timestamp, updateDoc } from "@firebase/firestore";
import { database } from "../authentication/firebase";
import updateCartInFirestore from "@/actions/addToCart";

export const CartContext = createContext();
export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    const { user } = useAuthContext();

    useEffect(() => {

        if (user) {

            getCart(user.uid);

        } else {

            getCartFromLocalStorage();

        };

    }, [user]);

    useEffect(() => {

        if (cart.length !== 0) {

            calculateTotal();

        } else {

            setTotal(0);

        };

    }, [cart]);

    useEffect(() => {

        const handleStorageChange = () => {

            const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
            setCart(savedCart);

        };

        window.addEventListener('cartupdate', handleStorageChange);

        return () => {
            window.removeEventListener("cartupdate", handleStorageChange);
        };

    }, []);

    const getIndexOfItem = (data, item) => {

        const existsIndex = data.findIndex(
            (cartItem) => cartItem.productId === item.productId && cartItem.size === item.size
        );

        return existsIndex;

    };

    const updateCartInDb = async (items) => {

        // let error;

        // try {

        //     const cartRef = doc(database, "carts", user.uid);

        //     await updateDoc(cartRef, {
        //         items,
        //         updatedAt: Timestamp.now()
        //     });

        //     setCart(items);

        // } catch (err) {

        //     error = err;

        // };

        // return {
        //     error: error || false
        // }

        let error;

        try {

            await updateCartInFirestore(items, user.uid);

        } catch (err) {

            error = err; 

        };

        return {
            error: error || false
        };

    };

    const saveCartToLocalStorage = (items) => {

        localStorage.setItem("cart", JSON.stringify(items));

        const event = new Event("cartupdate");
        window.dispatchEvent(event);

    };

    const getCartFromLocalStorage = () => {

        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);

    };

    const calculateTotal = () => {

        const total = cart.reduce((accumulator, item) => {
            return accumulator + (item.price * item.quantity);
        }, 0);

        setTotal(total);

    };

    const getCart = async (userId) => {

        const { items } = await getCartFromDb(userId);
        setCart(items || []);

    };

    const addToCart = async (item) => {

        let temp = [...cart];

        const existsIndex = getIndexOfItem(temp, item);

        if (existsIndex !== -1) {

            temp[existsIndex] = {
                ...temp[existsIndex],
                quantity: temp[existsIndex].quantity += 1
            };

        } else {

            temp.push({ ...item, quantity: 1 });

        };

        if (user) {

            const { error } = await updateCartInDb(temp);
            if (error) console.log(error);
            setCart(temp);

        } else {

            saveCartToLocalStorage(temp);

        };

    };

    const removeFromCart = async (productId) => {

        const temp = [...cart];

        const itemIndex = temp.findIndex(
            (cartItem) => cartItem.productId === productId
        );

        temp.splice(itemIndex, 1);

        if (user) {

            const { error } = await updateCartInDb(temp);
            if (error) console.log(error);
            setCart(temp);

        } else {

            saveCartToLocalStorage(temp);

        };


    };

    const editItemQuantity = async (productId, direction) => {

        const temp = [...cart];

        const itemIndex = temp.findIndex(
            (cartItem) => cartItem.productId === productId
        );

        direction == "up"
            ? temp[itemIndex].quantity += 1
            : temp[itemIndex].quantity -= 1;

        setCart(temp);

        if (user) {

            const { error } = await updateCartInDb(temp);
            if (error) console.log(error);
            setCart(temp);

        } else {

            saveCartToLocalStorage(temp);

        };

    };

    const cartLength = useMemo(() => cart ? cart.length : 0, [cart]);

    const contextValues = useMemo(() => ({
        cart,
        total,
        cartLength,
        addToCart,
        removeFromCart,
        editItemQuantity
    }), [cart, total, cartLength])

    return (

        <CartContext.Provider value={contextValues}>
            {children}
        </CartContext.Provider>

    );

};