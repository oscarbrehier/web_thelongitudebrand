'use client'
import { useState, useEffect, createContext, useContext, useRef } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "../authentication/firebase";
import { setAuthCookie, deleteAuthCookie } from "@/actions/handleAuthCookie";

const auth = getAuth(firebase_app);

export const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, async (user) => {

            if (user) {

                await handleUserSignIn(user);
                handleTokenRefresh(user);

            } else {

                handleUserSignOut();

            };

        });

        return () => {
            unsubscribe();
            clearInterval(tokenRefreshInterval.current);    
        };

    }, []);

    const handleUserSignIn = async (user) => {

        setUser(user);
        setIsAuth(true);

        const token = await user.getIdToken(true);
        await setAuthCookie(token);

    };

    const handleUserSignOut = async () => {

        setUser(null);
        setIsAuth(false);

        await deleteAuthCookie();

    };

    const tokenRefreshInterval = useRef(null);

    const refreshToken = async (user) => {

        try {

            const token = await user.getIdToken(true);
            await setAuthCookie(token);
            console.log(`Token refreshed at: ${new Date()}`)

        } catch (error) {

            console.error(error);
            handleUserSignOut(); // Sign out the user if token refresh fails

        };

    };

    const handleTokenRefresh = (user) => {

        // Refresh the token every 50 minutes

        tokenRefreshInterval.current = setInterval(async () => {
            await refreshToken(user);
        }, 50 * 60 * 1000);

    };

    return (

        <AuthContext.Provider value={{ user, isAuth }}>
            {children}
        </AuthContext.Provider>

    );

};