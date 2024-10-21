/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.sanity.io",
                pathname: "**", // This allows all paths from the Sanity CDN
            },
        ],
    },
};

export default nextConfig;
