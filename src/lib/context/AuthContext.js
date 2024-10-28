'use client'
import { useState, useEffect, createContext, useContext } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "../firebase/client";
import { useCartStore } from "../stores/useCartStore";

const auth = getAuth(firebase_app);

export const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);

    const getCart = useCartStore((state) => state.getCart);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, async (user) => {

            setUser(user);
            setIsAuth(!!user);
            
            if (user) {

                await getCart(user.uid);

            };

        });

        return () => {
            unsubscribe();
        };

    }, []);

    return (

        <AuthContext.Provider value={{ user, isAuth }}>
            {children}
        </AuthContext.Provider>

    );

};