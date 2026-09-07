import { NextRequest, NextResponse } from 'next/server';

function generateNonce(): string {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
}

export function middleware(request: NextRequest) {
    const nonce = generateNonce();
    const isDev = process.env.NODE_ENV !== 'production';

    const cspHeader = [
        "default-src 'self'",
        isDev
            ? `script-src 'self' 'unsafe-eval' 'nonce-${nonce}'`
            : `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' blob: data: https:",
        "font-src 'self'",
        "frame-src 'self' https://www.youtube.com https://youtube.com",
        "connect-src 'self' https://iygxeephcxbxtrtbfmrl.supabase.co https://api.groq.com https://api.elevenlabs.io",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        "upgrade-insecure-requests",
    ].join('; ');

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-nonce', nonce);
    requestHeaders.set('Content-Security-Policy', cspHeader);

    const response = NextResponse.next({
        request: { headers: requestHeaders },
    });
    response.headers.set('Content-Security-Policy', cspHeader);

    return response;
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
