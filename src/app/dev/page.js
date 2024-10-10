'use client'

import { useAuthContext } from "@/lib/context/AuthContext"
import { useEffect } from "react"

export default function Page() {

    const { user } = useAuthContext();

    // useEffect(() => {

    //     const getUser = async () => {

    //         const token = await user.getIdToken();
    //         console.log(token);

    //         setCookie("user", token);

    //     };

    //     if (user) getUser();

    // }, [user]);

    const handleButton = async () => {

      

    };

    return (

        <div>
            <button onClick={handleButton}>
                refresh token
            </button>
        </div>

    )

}