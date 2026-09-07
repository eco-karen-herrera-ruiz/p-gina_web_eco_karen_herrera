/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    reactStrictMode: true,
    poweredByHeader: false,
    experimental: {
        serverComponentsExternalPackages: ['isomorphic-dompurify', 'jsdom'],
    },
    images: {
        domains: ['iygxeephcxbxtrtbfmrl.supabase.co'],
    },
    // Content-Security-Policy is set per-request (with a nonce) in src/middleware.ts,
    // since the App Router needs a nonce/'strict-dynamic' for its own inline hydration
    // scripts — a static script-src 'self' here would block them. The rest of the
    // security headers are static and safe to set here.
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "Strict-Transport-Security",
                        value: "max-age=63072000; includeSubDomains; preload",
                    },
                    {
                        key: "X-Frame-Options",
                        value: "DENY",
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                    {
                        key: "Permissions-Policy",
                        value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
                    },
                    {
                        key: "Cross-Origin-Opener-Policy",
                        value: "same-origin",
                    },
                    {
                        key: "Cross-Origin-Resource-Policy",
                        value: "same-origin",
                    }
                ],
            },
        ];
    },
};

module.exports = nextConfig;
