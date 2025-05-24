'use client'
import { useState, useEffect, createContext, useContext, useRef } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "../firebase/client";
import { useCartStore } from "../stores/useCartStore";

const auth = getAuth(firebase_app);

export const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {

    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [loadingCart, setLoadingCart] = useState(true);

    const getCart = useCartStore((state) => state.getCart);
    const hasMountedRef = useRef(null);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, async (user) => {

            const isFirstMount = hasMountedRef.current;
            hasMountedRef.current = true;

            setUser(user);
            setIsAuth(!!user);

            const force = !isFirstMount && user;
            
            setLoadingCart(true);
            await getCart(user?.uid, !!force);
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