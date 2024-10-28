export default async function robots() {

    const baseUrl = "https://thelongitudebrand.com";

    return {
        rules: {
            userAgent: "*",
            allow: ["/","/en/shop", "/fr/shop"],
            disallow: ["/customer", "/password", "/auth", "/dev"],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };

};