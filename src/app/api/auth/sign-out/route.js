import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revokeAllSessions } from "@/lib/authentication/firebaseAdmin";

export async function GET() {

    const sessionCookie = cookies().get("__session")?.value;

    if (!sessionCookie) {

        return NextResponse.json(
            { success: false, error: "Session not found." },
            { status: 400 }
        );

    };

    cookies().delete("__session");

    await revokeAllSessions(sessionCookie);

    return NextResponse.json({
        success: true,
        data: "Signed out.",
    });

};