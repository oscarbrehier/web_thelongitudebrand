import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createSessionCookie } from "@/lib/authentication/firebaseAdmin";

const isDevelopment = (process.env.NODE_ENV || 'production') === 'development';

export async function POST(request) {
    
    const reqBody = await request.json();
    const idToken = reqBody.idToken;

    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    const sessionCookie = await createSessionCookie(idToken, { expiresIn });

    cookies().set("__session", sessionCookie, {
        maxAge: expiresIn,
        // httpOnly: true,
        // secure: true,
        httpOnly: !isDevelopment,
        secure: !isDevelopment,
    });

    return NextResponse.json({
        success: true,
        data: "Signed in."
    });

};