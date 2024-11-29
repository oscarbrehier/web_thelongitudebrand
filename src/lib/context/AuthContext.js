'use client'
import { useState, useEffect, createContext, useContext } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "../firebase/client";
import { useCartStore } from "../stores/useCartStore";

const auth = getAuth(firebase_app);

export const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {

    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(null);
    const [loadingCart, setLoadingCart] = useState(true);

    const getCart = useCartStore((state) => state.getCart);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, async (user) => {

            setUser(user);
            setIsAuth(!!user);

            setLoadingCart(true);
            await getCart(user?.uid);
            setLoadingCart(false);

        });

        return () => {
            unsubscribe();
        };

    }, []);

    return (

        <AuthContext.Provider value={{ user, isAuth, loadingCart }}>
            {children}
        </AuthContext.Provider>

    );

};
