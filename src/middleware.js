import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { headers } from 'next/headers';
import acceptLanguage from 'accept-language';
import { fallbackLng, languages, cookieName } from './app/i18n/settings';
import verifyFirebaseSessionJwt from './lib/authentication/verifyFirebaseJwt';
import { authRoutes } from './lib/settings';

acceptLanguage.languages(languages);

export async function middleware(request) {

    let lng;
    let isAuth = false;
    
    const cookieStore = cookies();
    const headersList = headers();
    const response = NextResponse.next();
    
    const languageRegex = new RegExp(`^/(${languages.join('|')})`);
    const fullPathname = request.nextUrl.pathname;
    const pathname = request.nextUrl.pathname.replace(languageRegex, "");

    const isLocked = process.env.SITE_LOCKED === "true";

    const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

    const session = cookieStore.get("__session")?.value;

    if (request.nextUrl.pathname.indexOf("icon") > -1 || request.nextUrl.pathname.indexOf("chrome") > -1) return NextResponse.next();

    if (cookieStore.has(cookieName)) lng = acceptLanguage.get(cookieStore.get(cookieName).value);
    if (!lng) lng = acceptLanguage.get(headersList.get("Accept-Language"));
    if (!lng) lng = fallbackLng;

    if (!cookieStore.get(cookieName)?.value) NextResponse.next().cookies.set(cookieName, lng);

    if (!languages.some(loc => fullPathname.startsWith(`/${loc}`)) && !fullPathname.startsWith("/_next")) {
        return NextResponse.redirect(new URL(`/${lng}${pathname}${request.nextUrl.search}`, request.url));
    };

    if (headersList.has("referer")) {

        const refererUrl = new URL(headersList.get("referer"));
        const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
        const res = NextResponse.next();

        if (lngInReferer) res.cookies.set(cookieName, lngInReferer);

        return res;

    };

    if (pathname.startsWith("/shop") || pathname.startsWith("/password")) {
        return NextResponse.next();
    };

    console.log(session)

    if (session) {

        try {

            await verifyFirebaseSessionJwt(session);
            isAuth = true;
    
        } catch (err) {
            
            if (session && !pathname.includes("/auth/sign-out")) return NextResponse.redirect(new URL("/auth/sign-out", request.url));

        };

    }

    if (isAuthRoute && !isAuth) {

        return NextResponse.redirect(new URL('/shop', request.url));

    };

    if (isAuth && (pathname.startsWith("/auth/sign-in") || pathname.startsWith("/auth/sign-up"))) {

        console.log('hello')
        return NextResponse.redirect(new URL("/customer/personal-information", request.url));

    }

    return response;

};

export const config = {
    matcher: '/((?!api|_next/static|_next/image|.*\\.png$|password).*)',
};
