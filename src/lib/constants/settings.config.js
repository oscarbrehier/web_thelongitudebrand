const isDev = process.env.NODE_ENV === "development" || !process.env.NODE_ENV;

export const authRoutes = [
    "/customer",
];

export const storageKeys = {
    CART: "cart-storage",
    SESSION: "__session",
    SESSION_ID: "__session_id",
    ANALYTICS_SESSION_ID: "__analytics_session_id",
    ANALYTICS_LAST_ACTIVE: "__analytics_last_active",
    AUTH_TOKEN: "__auth_token",
    LANGUAGE: "i18next"
};

export const guestRoutes = [
    "/auth/action",
    "/auth/reset-password",
    "/auth/sign-in",
    "/auth/sign-up",
];

export const origin = isDev
    ? "http://localhost:3000"
    : "https://www.thelongitudebrand.com";