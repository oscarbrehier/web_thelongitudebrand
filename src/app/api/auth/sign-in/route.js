import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createSessionCookie } from "@/lib/authentication/sessionHelpers";
import { storageKeys } from "@/lib/constants/settings.config";

const isDevelopment = (process.env.NODE_ENV || 'production') === 'development';

export async function POST(request) {
    
    const reqBody = await request.json();
    const idToken = reqBody.idToken;

    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    const sessionCookie = await createSessionCookie(idToken, { expiresIn });

    cookies().set(storageKeys.SESSION, sessionCookie, {
        maxAge: expiresIn,
        httpOnly: !isDevelopment,
        secure: !isDevelopment,
    });

    return NextResponse.json({
        success: true,
        data: "Signed in."
    });

};