import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**", // ✅ allow all domains
            },
            {
                protocol: "http",
                hostname: "**", // ✅ allow http too
            },
        ],
    },
};

export default nextConfig;
