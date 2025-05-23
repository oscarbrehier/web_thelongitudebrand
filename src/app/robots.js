export default async function robots() {

    const baseUrl = "https://www.longitudebrand.com";

    return {
        rules: {
            userAgent: "*",
            allow: ["/","/en/shop", "/fr/shop"],
            disallow: ["/customer", "/password", "/auth", "/dev"],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };

};