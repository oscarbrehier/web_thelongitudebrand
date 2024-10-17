import { NextResponse } from 'next/server';
import verifyFirebaseJwt from './lib/authentication/verifyFirebaseJwt';
import { cookies } from 'next/headers';
import { headers } from 'next/headers';
import acceptLanguage from 'accept-language';
import { fallbackLng, languages, cookieName } from './app/i18n/settings';

acceptLanguage.languages(languages);

const authRoutes = [
    "/customer",
];

export async function middleware(request) {

    const cookieStore = cookies();
    const headersList = headers();
    const pathname = request.nextUrl.pathname;
    let lng;

    const isLocked = process.env.SITE_LOCKED === "true";
    const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

    const token = cookieStore.get("authToken")?.value || null;

    if (request.nextUrl.pathname.indexOf("icon") > -1 || request.nextUrl.pathname.indexOf("chrome") > -1) return NextResponse.next();

    if (cookieStore.has(cookieName)) lng = acceptLanguage.get(cookieStore.get(cookieName).value);
    if (!lng) lng = acceptLanguage.get(headersList.get("Accept-Language"));
    if (!lng) lng = fallbackLng;

    if (!cookieStore.get(cookieName).value) NextResponse.next().cookies.set(cookieName, lng);

    if (
        !languages.some(loc => pathname.startsWith(`/${loc}`))
        && !pathname.startsWith("/_next")
    ) {
        return NextResponse.redirect(new URL(`/${lng}${pathname}${request.nextUrl.search}`, request.url));
    };

    if (headersList.has("referer")) {

        const refererUrl = new URL(headersList.get("referer"));
        const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
        const res = NextResponse.next();

        if (lngInReferer) res.cookies.set(cookieName, lngInReferer);

        return res;

    };
    
    if (pathname === "/shop" || pathname === "/password") {
        return NextResponse.next();
    };

    if (!token) {

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

            return NextResponse.redirect(new URL('/shop', request.url));

        };

    };

    return NextResponse.next({

    });

};

export const config = {
    matcher: '/((?!api|_next/static|_next/image|.*\\.png$|password).*)',
};
