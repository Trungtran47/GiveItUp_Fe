// middleware.js
import { NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login", "/register", "/"]; // các trang được phép truy cập không cần login

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const userCookie = request.cookies.get("user")?.value;

  // Nếu là trang public thì cho qua
  const PUBLIC_PATHS = ["/login", "/register", "/"];
  if (PUBLIC_PATHS.includes(pathname)) return NextResponse.next();

  // Nếu không có cookie user => redirect login
  if (!userCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Parse token từ cookie
  let token;
  try {
    const user = JSON.parse(userCookie);
    token = user?.Token;
  } catch (err) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Nếu không có token => redirect login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Chặn tất cả route trừ API, static, image và public
    "/((?!api|_next/static|_next/image|favicon.ico|image|assets|logo|icons).*)",
  ],
};
