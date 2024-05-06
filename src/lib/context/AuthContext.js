'use client'
import { useState, useEffect, createContext, useContext } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "../authentication/firebase";

const auth = getAuth(firebase_app);

export const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {

            if (user) {
                setUser(user);
            };

            setLoading(false);

        });

        return () => unsubscribe();

    }, []);

    return (

        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>

    );

};