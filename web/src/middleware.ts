import axios from "axios";
import Cookies from "js-cookie";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
    const isAdminLoginPage = request.nextUrl.pathname === "/admin/login";
    const isPartnerRoute = request.nextUrl.pathname.includes("/[entity]/");
    const isBusinessLoginPage = request.nextUrl.pathname === "/login";

    // Get the maintenance and coming soon settings
    let isMaintenanceEnabled = false;
    let isComingSoonEnabled = false;

    // try {
    //     const response = await axios.get(
    //         "http://localhost:8020/backend/settings"
    //     );
    //     isMaintenanceEnabled = response.data.isMaintenanceEnabled;
    //     isComingSoonEnabled = response.data.isComingSoonEnabled;
    // } catch (error) {
    //     console.error("Error fetching settings:", error);
    // }

    // Skip redirects for maintenance and coming-soon pages themselves
    if (
        request.nextUrl.pathname === "/maintenance" ||
        request.nextUrl.pathname === "/coming-soon"
    ) {
        return NextResponse.next();
    }

    // If maintenance mode is enabled, handle redirects
    if (isMaintenanceEnabled) {
        // If trying to access partner routes or business sign-in, redirect to maintenance
        if (isPartnerRoute || isBusinessLoginPage) {
            // Clear the auth cookie if it exists
            const response = NextResponse.redirect(
                new URL("/maintenance", request.url)
            );
            if (request.cookies.get("qmaster-auth-business")) {
                response.cookies.delete("qmaster-auth-business");
            }
            return response;
        }

        // For the landing page
        if (request.nextUrl.pathname === "/") {
            return NextResponse.redirect(new URL("/maintenance", request.url));
        }
    }

    // Regular auth checks (only if maintenance mode is not enabled)
    if (!isMaintenanceEnabled) {
        // Get auth status from cookie
        const isAdminAuthenticated = request.cookies.get("qmaster-auth")?.value;
        const isBusinessAuthenticated = request.cookies.get(
            "qmaster-auth-business"
        )?.value;

        // If trying to access admin routes (except login) without auth
        if (isAdminRoute && !isAdminAuthenticated && !isAdminLoginPage) {
            const loginUrl = new URL("/admin/login", request.url);
            loginUrl.searchParams.set("from", request.nextUrl.pathname);
            return NextResponse.redirect(loginUrl);
        }

        // If trying to access partner routes (except login) without auth
        if (
            isPartnerRoute &&
            !isBusinessAuthenticated &&
            !isBusinessLoginPage
        ) {
            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("from", request.nextUrl.pathname);
            return NextResponse.redirect(loginUrl);
        }

        // If authenticated admin user tries to access login page
        if (isAdminLoginPage && isAdminAuthenticated) {
            return NextResponse.redirect(
                new URL("/admin/dashboard", request.url)
            );
        }

        // Coming soon only affects the landing page
        if (isComingSoonEnabled && request.nextUrl.pathname === "/") {
            return NextResponse.redirect(new URL("/coming-soon", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*",
        "/",
        "/maintenance",
        "/coming-soon",
        "/login",
        "/:entity/:path*", // Add this to catch all partner routes
    ],
};
