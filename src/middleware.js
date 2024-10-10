import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import verifyFirebaseJwt from './lib/authentication/verifyFirebaseJwt';

const authRoutes = [
    "/customer",
];

export async function middleware(request) {

    const cookieStore = cookies();
    const pathname = request.nextUrl.pathname;
    const isLocked = process.env.SITE_LOCKED === "true";

    const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

    const token = cookieStore.get("authToken")?.value || null;

    if (!token) {

        console.log(isLocked && !pathname.startsWith("/password"))

        if (isLocked && !pathname.startsWith("/password")) {
            
            return NextResponse.redirect(new URL("/password", request.url));
            
        };

        if (isAuthRoute) {

            return NextResponse.redirect(new URL('/shop', request.url));

        };

    } else {

        try {

            await verifyFirebaseJwt(token);

        } catch (e) {

            console.log(e)
            return NextResponse.redirect(new URL('/shop', request.url));

        };

    };

    return NextResponse.next({

    });

};

export const config = {
    matcher: '/((?!api|_next/static|_next/image|.*\\.png$|password).*)',
};
