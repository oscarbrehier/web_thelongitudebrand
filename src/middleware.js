import { NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';
import acceptLanguage from 'accept-language';
import { fallbackLng, languages, cookieName } from './app/i18n/settings';
import verifyFirebaseSessionJwt from './lib/authentication/verifyFirebaseJwt';
import { authRoutes, guestRoutes } from './lib/constants/settings.config';
import { storageKeys } from './lib/constants/settings.config';
import { captureException } from '@sentry/nextjs';
import { jwtVerify } from 'jose';

acceptLanguage.languages(languages);

function isStaticRequest(pathname) {

    return ['/sitemap.xml', '/robots.txt', '/monitoring'].includes(pathname)
        || pathname.includes("icon")
        || pathname.includes("chrome");

};

function getLanguage(cookieStore, headers) {
    const cookieLng = cookieStore.get(cookieName)?.value;
    const headerLng = headers.get("Accept-Language");
    return acceptLanguage.get(cookieLng || headerLng) || fallbackLng;
};

export async function middleware(request) {

    if (request.nextUrl.pathname.startsWith('/ingest/')) {

        const url = request.nextUrl.clone()
        const hostname = url.pathname.startsWith('/ingest/static/')
            ? 'eu-assets.i.posthog.com'
            : 'eu.i.posthog.com'

        const requestHeaders = new Headers(request.headers)
        requestHeaders.set('host', hostname)

        url.protocol = 'https'
        url.hostname = hostname
        url.port = 443
        url.pathname = url.pathname.replace(/^\/ingest/, '')

        return NextResponse.rewrite(url, {
            headers: requestHeaders,
        })
    }

    let isAuth = false;

    const cookieStore = await cookies();
    const response = NextResponse.next();
    const headersList = request.headers;

    const languageRegex = new RegExp(`^/(${languages.join('|')})`);

    const fullPathname = request.nextUrl.pathname;
    const pathSegments = fullPathname.split('/').filter(Boolean);
    const pathname = request.nextUrl.pathname.replace(languageRegex, "");

    response.headers.set('x-pathname', pathname || "home");

    const session = cookieStore.get(storageKeys.SESSION)?.value;

    // Handle static paths
    if (isStaticRequest(fullPathname)) return response;
    if (pathname.startsWith("/locked")) return NextResponse.redirect(new URL('/shop', request.url));

    // Determine and persist language
    const lng = getLanguage(cookieStore, headersList);
    response.headers.set("x-language", lng);

    if (!cookieStore.get(cookieName)?.value) response.cookies.set(cookieName, lng);

    const firstSegment = pathSegments[0];
    const restPath = '/' + pathSegments.slice(1).join('/');

    if (languages.includes(firstSegment)) {
        response.headers.set('x-pathname', restPath || "home");
    } else {

        if (!languages.some(loc => fullPathname.startsWith(`/${loc}`)) && !fullPathname.startsWith("/_next")) {
            return NextResponse.redirect(new URL(`/${lng}${pathname}${request.nextUrl.search}`, request.url));
        };

    }


    // Site lock handling
    if (process.env.SITE_LOCKED) {

        const siteAuthToken = cookieStore.get(storageKeys.SITE_AUTH)?.value;

        try {

            const secret = new TextEncoder().encode(process.env.SITE_SECRET);
            const { payload } = await jwtVerify(siteAuthToken, secret);
            if (payload?.access === "granted" && pathname.startsWith("/password")) {
                return NextResponse.redirect(new URL("/shop", request.url));
            }

        } catch (err) {
            console.log(pathname)

            if (!(pathname === "/" || pathname.startsWith("/password"))) {
                return NextResponse.redirect(new URL("/password", request.url));
            }

        }

    };

    // Referer locale sync
    if (headersList.has("referer")) {

        const refererUrl = new URL(headersList.get("referer"));
        const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));

        if (lngInReferer) {
            response.cookies.set(cookieName, lngInReferer);
        };

    };

    // Skip auth checks for public pages
    if (pathname.startsWith("/") || pathname.startsWith("/password")) {
        return response;
    };

    // Auth verification
    if (session) {

        try {

            await verifyFirebaseSessionJwt(session);
            isAuth = true;

        } catch (err) {

            captureException(err);

            if (session && !pathname.includes("/auth/action/sign-out")) {
                return NextResponse.redirect(new URL("/auth/action/sign-out", request.url));
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
    matcher: '/((?!api|_next/static|_next/image|.*\\.png$|favicon.ico|images|fonts).*)',
};
