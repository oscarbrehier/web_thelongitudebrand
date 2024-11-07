import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import acceptLanguage from 'accept-language';
import { fallbackLng, languages, cookieName } from './app/i18n/settings';
import verifyFirebaseSessionJwt from './lib/authentication/verifyFirebaseJwt';
import { authRoutes, guestRoutes } from './lib/constants/settings.config';
import { storageKeys } from './lib/constants/settings.config';

acceptLanguage.languages(languages);

export async function middleware(request) {

    let lng;
    let isAuth = false;

    const cookieStore = cookies();
    const response = NextResponse.next();
    const headersList = request.headers;

    const languageRegex = new RegExp(`^/(${languages.join('|')})`);
    const fullPathname = request.nextUrl.pathname;
    const pathname = request.nextUrl.pathname.replace(languageRegex, "");

    response.headers.set('x-pathname', pathname || "home");

    const session = cookieStore.get(storageKeys.SESSION)?.value;

    if (fullPathname === "/sitemap.xml" || fullPathname === "/robots.txt" || fullPathname.includes("icon") || fullPathname.includes("chrome") || fullPathname === "/monitoring") {
        return response;
    };

    if (pathname.startsWith("/locked")) return NextResponse.redirect(new URL('/shop', request.url));
 
    if (cookieStore.has(cookieName)) {
        lng = acceptLanguage.get(cookieStore.get(cookieName).value);
    } else {
        lng = acceptLanguage.get(headersList.get("Accept-Language"));
    };

    if (!lng) lng = fallbackLng;

    response.headers.set('x-language', lng);

    if (!cookieStore.get(cookieName)?.value) {

        response.cookies.set(cookieName, lng);

    };

    // Redirect if the language prefix is missing
    if (!languages.some(loc => fullPathname.startsWith(`/${loc}`)) && !fullPathname.startsWith("/_next")) {
        return NextResponse.redirect(new URL(`/${lng}${pathname}${request.nextUrl.search}`, request.url));
    };

    if (headersList.has("referer")) {

        const refererUrl = new URL(headersList.get("referer"));
        const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));

        if (lngInReferer) {
            response.cookies.set(cookieName, lngInReferer);
        };

    };

    if (pathname.startsWith("/shop") || pathname.startsWith("/password")) {
        return response;
    };

    if (session) {

        try {
            
            await verifyFirebaseSessionJwt(session);
            isAuth = true;
            
        } catch (err) {

            console.log(err);

            if (session && !pathname.includes("/auth/sign-out")) {
                return NextResponse.redirect(new URL("/auth/sign-out", request.url));
            };

        };
    };

    if (authRoutes.some((route) => pathname.startsWith(route)) && !isAuth) {
        return NextResponse.redirect(new URL('/shop', request.url));
    };

    if (isAuth && guestRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/customer/personal-information", request.url));
    };

    return response;
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|.*\\.png$|password).*)',
};
