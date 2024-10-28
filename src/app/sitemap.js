import getProductSlugs from "@/lib/sanity/getProductSlugs";
import { languages } from "./i18n/settings";

export default async function sitemap() {

    const baseUrl = "https://thelongitudebrand.com";
    const staticRoutes = ["", "cart"];

    const response = await getProductSlugs();

    const staticPages = staticRoutes.flatMap((route) => 
        languages.map((language) => ({
            url: `${baseUrl}/${language}/${route}`,
            lastModified: new Date(),
        })),
    );

    const productPages = response?.flatMap((slug) => {
        return languages.map((language) => ({
            url: `${baseUrl}/${language}/shop/${slug}`,
            lastModified: new Date(),
        }));
    });

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
        },
        ...staticPages,
        ...productPages
    ];

};