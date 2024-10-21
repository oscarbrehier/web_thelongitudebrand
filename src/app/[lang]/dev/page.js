// import { isUserAuthenticated } from "@/lib/authentication/firebaseAdmin";
// import { cookies, headers } from "next/headers"
"use client"

import { deleteAuthCookie } from "@/actions/handleAuthCookie"
import { useEffect } from "react"

export default function Page({ params: { lang } }) {

    // const cookieStore = cookies();
    // console.log(cookieStore.get("user-id")?.value)

    // const isAuth = await isUserAuthenticated();
    // console.log("is authed", isAuth);

    const handleButtonClick = async () => {

        await deleteAuthCookie();

    };

    return (

        <div>
            {/* {isAuth && "logout"} */}
            <button onClick={handleButtonClick}>delete</button>
        </div>

    )

}