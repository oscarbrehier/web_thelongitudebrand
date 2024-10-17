import { client } from "@/lib/sanity/client";
import { NextResponse } from "next/server";

export async function POST(request, response) {

    const { userId, productId } = await request.json();

    try {

        await client
            .patch(userId)
            .unset([`wishlist[_ref == "${productId}"]`])
            .commit();

        return NextResponse.json({ status: 200 });

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            { error: "Failed to update wishlist." }, 
            { status: 500 }
        );

    };

}