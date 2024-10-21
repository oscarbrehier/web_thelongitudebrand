'use client'
import { getProductById } from "@/lib/sanity/getProduct";
import { useEffect, useState } from "react";
import { StoreItem } from "./store/StoreItem";

export default function WishlistProductWrapper({
    productId
}) {

    const [content, setContent] = useState(null);
    
    useEffect(() => {

        const getContent = async () => {

            const res = await getProductById(productId);
            setContent(res);

        };

        getContent();

    }, []); 

    return (

        content && (<StoreItem data={content} />)

    );

};