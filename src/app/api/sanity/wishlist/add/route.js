import { NextResponse } from "next/server";
import { client } from "@/lib/sanity/client";
import { v4 as uuidv4 } from 'uuid';

export async function POST(request, response) {

    const { userId, productId } = await request.json();

    try {

        await client
            .patch(userId)
            .setIfMissing({ wishlist: [] })
            .insert('after', 'wishlist[-1]', [{
                _type: 'reference',
                _ref: productId,
                _key: uuidv4()
            }])
            .commit();

            return NextResponse.json({ status: 200 });

    } catch (error) {

        console.error(error);
        return NextResponse.json({ error: "Failed to update wishlist" }, { status: 500 });

    };

};
