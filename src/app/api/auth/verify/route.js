import { isUserAuthenticated } from "@/lib/authentication/sessionHelpers";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {

    const { session } = await request.json();

    const isAuth = await isUserAuthenticated(session);

    return NextResponse.json(
        {
            authenticated: isAuth
        },
        {
            status: 200
        }
    );

};