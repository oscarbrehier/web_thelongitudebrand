'use client'
import { useAuthContext } from "@/lib/context/AuthContext";
import { useEffect, useState } from "react";
import { StoreItem } from "@/components/store/StoreItem";
import fetchUserWishlist from "@/lib/sanity/wishlist/fetch";

export default function Page() {

    const [data, setData] = useState(null);
    const { user, isAuth } = useAuthContext();

    useEffect(() => {

        const fetchData = async () => {

            const res = await fetchUserWishlist(user.uid);
            setData(res);

        };

        if (isAuth) {

            fetchData();

        };

    }, [isAuth]);

    return (

        <div className="mt-16">

            <p className="capitalize mx-2 my-1">your wishlist</p>

            <div className="h-auto w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">

                {data && data.map((item, index) => (
                    <StoreItem key={index} data={item} />
                ))}

            </div>

        </div>

    );

};