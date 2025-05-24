import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createSessionCookie } from "@/lib/authentication/sessionHelpers";
import { storageKeys } from "@/lib/constants/settings.config";
import { captureException } from "@sentry/nextjs";

const isDevelopment = (process.env.NODE_ENV || 'production') === 'development';

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const idToken = reqBody.idToken;

        if (!idToken) {
            console.error("No ID token provided in request");
            return NextResponse.json(
                { success: false, error: "No ID token provided" },
                { status: 400 }
            );
        }

        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

        console.log("Creating session cookie");
        const sessionCookie = await createSessionCookie(idToken, { expiresIn });
        console.log("Session cookie created successfully");

        const cookieOptions = {
            maxAge: expiresIn,
            httpOnly: !isDevelopment,
            secure: !isDevelopment,
            path: "/",
            sameSite: "lax"
        };

        console.log("Setting cookie with options:", cookieOptions);
        (await cookies()).set(storageKeys.SESSION, sessionCookie, cookieOptions);
        console.log("Cookie set successfully");

        return NextResponse.json({
            success: true,
            data: "Signed in."
        });

    } catch (error) {
        console.error("Error in sign-in API route:", error);
        captureException(error);
        
        return NextResponse.json(
            { 
                success: false, 
                error: "Failed to sign in",
                details: error.message 
            },
            { status: 500 }
        );
    }
}