import { NextResponse, userAgent } from 'next/server';
import { cookies } from 'next/headers';
import acceptLanguage from 'accept-language';
import { fallbackLng, languages, cookieName } from './app/i18n/settings';
import verifyFirebaseSessionJwt from './lib/authentication/verifyFirebaseJwt';
import { authRoutes, guestRoutes, storageKeys } from './lib/constants/settings.config';
import { v4 as uuid } from 'uuid';
import { RequestCookies, ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { Analytics } from './lib/analytics/Analytics';
import { captureException } from '@sentry/nextjs';

acceptLanguage.languages(languages);

const analytics = new Analytics({
    apiKey: process.env.ANALYTICS_API_KEY,
    baseUrl: process.env.ANALYTICS_API_URL
});

const isDev = (process.env.NODE_ENV || "production") === "development";

// Helper function to hash the current path
async function hashPath(path) {

    const encoder = new TextEncoder();
    const data = encoder.encode(path);

    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert ArrayBuffer to byte array

    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    return hashHex;

};

// Helper function to check static assets or special paths
function isStaticPath(pathname) {

    return [
        '/sitemap.xml',
        '/robots.txt',
        '/monitoring',
    ].some((staticPath) => pathname === staticPath) ||
        pathname.includes('icon') ||
        pathname.includes('chrome');

};

// Helper function to get or set the language cookie
function resolveLanguage(cookieStore, headers, response) {

    let lng = cookieStore.has(cookieName)
        ? acceptLanguage.get(cookieStore.get(cookieName).value)
        : acceptLanguage.get(headers.get('Accept-Language'));

    if (!lng) lng = fallbackLng;

    if (!cookieStore.has(cookieName)) {
        response.cookies.set(cookieName, lng);
    };

    return lng;

};

// Helper function to handle redirects for language prefix
function handleLanguageRedirect(request, pathname, lng) {

    const fullPathname = request.nextUrl.pathname;

    if (!languages.some((loc) => fullPathname.startsWith(`/${loc}`)) && !fullPathname.startsWith('/_next')) {
        return NextResponse.redirect(new URL(`/${lng}${pathname}${request.nextUrl.search}`, request.url));
    };

    return null;

};

// Helper function to manage analytics cookies
function manageAnalyticsCookies(cookieStore, response) {

    let analyticsSessionId = cookieStore.get(storageKeys.ANALYTICS_SESSION_ID)?.value;

    const lastActive = parseInt(cookieStore.get(storageKeys.ANALYTICS_LAST_ACTIVE)?.value, 10);
    const now = Date.now();

    const sessionTimeout = 10 * 60 * 1000;

    if (!analyticsSessionId || !lastActive || now - lastActive > sessionTimeout) {

        analyticsSessionId = uuid();
        response.cookies.set(storageKeys.ANALYTICS_SESSION_ID, analyticsSessionId);

    };

    response.cookies.set(storageKeys.ANALYTICS_LAST_ACTIVE, now);

    return analyticsSessionId

};

// Helper function to manage session cookies
function manageSessionCookies(cookieStore, response) {

    const sessionId = cookieStore.get(storageKeys.SESSION_ID)?.value;
    if (sessionId) return;

    response.cookies.set(storageKeys.SESSION_ID, uuid());

};

// User route tracking function for analytics
async function handleAnalyticsRouteTracking(data, request, headers) {

    await analytics.captureEventServerSide("page view", {
        distinctId: data.sessionId,
        propreties: {
            "client-ip": headers.get("x-real-ip") || null
        },
        ...data,
    });

};



// Middleware function
export async function middleware(request) {

    const response = NextResponse.next();
    const cookieStore = cookies();
    const now = new Date();
    const headersList = request.headers;

    const fullPathname = request.nextUrl.pathname;
    const pathname = fullPathname.replace(new RegExp(`^/(${languages.join('|')})`), '');
    const userAgents = userAgent(request);

    response.headers.set('x-pathname', pathname || 'home');
    response.headers.set('x-user-agent', userAgents);

    console.log("Navigation to", pathname);

    // Skip static paths
    if (isStaticPath(fullPathname)) {
        return response;
    };

    // Authentication checks
    const session = cookieStore.get(storageKeys.SESSION)?.value;

    let isAuth = false;
    let userId = null;

    if (session) {

        try {

            userId = await verifyFirebaseSessionJwt(session);
            isAuth = true;

        } catch {

            if (!pathname.includes('/auth/sign-out')) {
                return NextResponse.redirect(new URL('/auth/sign-out', request.url));
            };

        };

    };

    if (authRoutes.some((route) => pathname.startsWith(route)) && !isAuth) {
        return NextResponse.redirect(new URL('/shop', request.url));
    };

    if (isAuth && guestRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/customer/personal-information', request.url));
    };

    // Manage analytics
    const analyticsSessionId = manageAnalyticsCookies(cookieStore, response);

    try {

        await handleAnalyticsRouteTracking({
            sessionId: analyticsSessionId,
            referer: headersList.get("referer"),
            userAgent: userAgents.ua,
            path: pathname,
            user: {
                id: userId
            }
        }, request, headersList);

    } catch (err) {

        console.log(err);
        captureException(err);

    };

    // Redirect locked paths
    if (pathname.startsWith('/locked')) {
        return NextResponse.redirect(new URL('/shop', request.url));
    };

    // Resolve language
    const lng = resolveLanguage(cookieStore, headersList, response);
    response.headers.set('x-language', lng);

    // Handle language prefix redirects
    const langRedirect = handleLanguageRedirect(request, pathname, lng);
    if (langRedirect) return langRedirect;

    // Referer-based language updates
    const referer = headersList.get('referer');

    if (referer) {

        const refererLng = languages.find((l) => new URL(referer).pathname.startsWith(`/${l}`));
        if (refererLng) response.cookies.set(cookieName, refererLng);

    };

    // Skip specific routes
    if (pathname.startsWith('/shop') || pathname.startsWith('/password')) {
        return response;
    };

    // Manage session
    manageSessionCookies(cookieStore, response);

    applySetCookie(request, response);

    return response;
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|.*\\.png$|.*\\.ico$|password).*)',
};


function applySetCookie(req, res) {

    const setCookies = new ResponseCookies(res.headers);
    const newReqHeaders = new Headers(req.headers);
    const newReqCookies = new RequestCookies(newReqHeaders);

    setCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));

    const response = NextResponse.next({ request: { headers: newReqHeaders } });
    response.headers.forEach((value, key) => {
        if (key === 'x-middleware-override-headers' || key.startsWith('x-middleware-request-')) {
            res.headers.set(key, value);
        }
    });

};
