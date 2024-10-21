import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { headers } from 'next/headers';
import acceptLanguage from 'accept-language';
import { fallbackLng, languages, cookieName } from './app/i18n/settings';
import verifyFirebaseSessionJwt from './lib/authentication/verifyFirebaseJwt';

acceptLanguage.languages(languages);

const authRoutes = [
    "/customer",
];

export async function middleware(request) {

    let lng;
    
    const cookieStore = cookies();
    const headersList = headers();
    const pathname = request.nextUrl.pathname;
    const { origin } = request.nextUrl;
    const response = NextResponse.next();

    const isLocked = process.env.SITE_LOCKED === "true";

    const languageRegex = new RegExp(`^/(${languages.join('|')})`);
    const isAuthRoute = authRoutes.some((route) => pathname.replace(languageRegex, "").startsWith(route));

    const session = cookieStore.get("__session")?.value;

    if (request.nextUrl.pathname.indexOf("icon") > -1 || request.nextUrl.pathname.indexOf("chrome") > -1) return NextResponse.next();

    if (cookieStore.has(cookieName)) lng = acceptLanguage.get(cookieStore.get(cookieName).value);
    if (!lng) lng = acceptLanguage.get(headersList.get("Accept-Language"));
    if (!lng) lng = fallbackLng;

    if (!cookieStore.get(cookieName).value) NextResponse.next().cookies.set(cookieName, lng);

    if (!languages.some(loc => pathname.startsWith(`/${loc}`)) && !pathname.startsWith("/_next")) {
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

    if (isAuthRoute) {

        if (session) {

            try {

                await verifyFirebaseSessionJwt(session);
        
            } catch (err) {
                
                if (session && !pathname.includes("/auth/sign-out")) return NextResponse.redirect(new URL("/auth/sign-out", request.url));
        
            };

        } else {

            return NextResponse.redirect(new URL('/shop', request.url));

        };

    };

    return response;

};

export const config = {
    matcher: '/((?!api|_next/static|_next/image|.*\\.png$|password).*)',
};
