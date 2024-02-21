import { NextRequest, NextResponse } from "next/server";
import * as jose from 'jose'

export async function middleware(request: NextRequest) {

    const requestHeaders = new Headers(request.headers);
    const token = request.cookies.get("token")?.value;
    if (request.nextUrl.pathname === '/login' && token) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    if (request.nextUrl.pathname !== '/' && !authRoutes.find((val) => request.nextUrl.pathname.startsWith(val))) {
        return NextResponse.next()
    }
    if (!token) {
        const response = NextResponse.redirect(new URL("/login", request.url))
        response.cookies.delete("token");
        return response
    }

    try {
        const secret = new TextEncoder().encode(
            process.env.JWT_SECRET
        );
        const { payload, protectedHeader } = await jose.jwtVerify(token, secret);
        if (!payload) {
            const response = NextResponse.redirect(new URL("/login", request.url))
            response.cookies.delete("token");
            return response
        }
        if (payload.role !== 'super-admin' && request.nextUrl.pathname === '/signup') {
            return NextResponse.redirect(new URL("/", request.url));
        }
        if ((payload.role === 'user-out-local' || payload.role === 'user-out-fuel-trade') && userOutRestrictedRoutes.find((val) => val === request.nextUrl.pathname)) {
            return NextResponse.redirect(new URL("/paktoiran", request.url));
        }
        if ((payload.role === 'user-in-local' || payload.role === 'user-in-fuel-trade') && userInRestrictedRoutes.find((val) => val === request.nextUrl.pathname)) {
            return NextResponse.redirect(new URL("/irantopak", request.url));
        }
        if (payload.role === 'user-in-out-local' && userInOutLocalRestrictedRoutes.find((val) => val === request.nextUrl.pathname)) {
            return NextResponse.redirect(new URL("/irantopak", request.url));
        }
        if (payload.role === 'admin' && adminRestrictedRoutes.find((val) => val === request.nextUrl.pathname)) {
            return NextResponse.redirect(new URL("/", request.url));
        }

        requestHeaders.set("verifiedJwt", JSON.stringify(payload));
        console.log("resData ==>> ", payload);
        const response = NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
        return response;

    }
    catch (err: any) {
        console.log('error ===>>> ', err);
        const response = NextResponse.redirect(new URL("/login", request.url))
        response.cookies.delete("token");
        return response
    }


}


const authRoutes = [
    // '/',
    '/api/whoami',
    '/tokendata',
    '/paktoiran',
    '/irantopak',
    '/status',
    '/manualentry',
    '/api/entry',
    '/api/entry/bulk',
    '/api/token',
    '/signup',
    '/api/signup',
]


const userOutRestrictedRoutes = [
    '/',
    '/irantopak',
    '/status',
    '/manualentry',
    '/api/entry/bulk',
    '/signup'
]

const userInRestrictedRoutes = [
    '/',
    '/paktoiran',
    '/status',
    '/manualentry',
    '/api/entry/bulk',
    '/signup'
]

const userInOutLocalRestrictedRoutes = [
    '/',
    '/status',
    // '/manualentry',
    '/api/entry/bulk',
    '/signup'
]
const adminRestrictedRoutes = [
    // '/manualentry',
    '/api/entry/bulk',
    '/signup'
]


export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}