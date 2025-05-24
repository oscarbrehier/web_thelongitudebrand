import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revokeAllSessions } from "@/lib/authentication/sessionHelpers";
import { storageKeys } from "@/lib/constants/settings.config";

export async function GET() {

    const sessionCookie = (await cookies()).get(storageKeys.SESSION)?.value;

    if (!sessionCookie) {

        return NextResponse.json(
            { success: false, error: "Session not found." },
            { status: 400 }
        );

    };

    (await cookies()).delete(storageKeys.SESSION);

    await revokeAllSessions(sessionCookie);

    return NextResponse.json({
        success: true,
        data: "Signed out.",
    });

};