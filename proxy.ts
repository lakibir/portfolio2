import { NextResponse, type NextRequest } from "next/server";

function unauthorizedResponse() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin Area"',
    },
  });
}

export function proxy(request: NextRequest) {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  // In production, hide admin if credentials are not configured yet.
  if ((!username || !password) && process.env.NODE_ENV === "production") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // In local dev, allow access without credentials for faster iteration.
  if (!username || !password) {
    return NextResponse.next();
  }

  const authorization = request.headers.get("authorization");

  if (!authorization) {
    return unauthorizedResponse();
  }

  const [scheme, encoded] = authorization.split(" ");

  if (scheme !== "Basic" || !encoded) {
    return unauthorizedResponse();
  }

  try {
    const decoded = atob(encoded);
    const separatorIndex = decoded.indexOf(":");

    if (separatorIndex === -1) {
      return unauthorizedResponse();
    }

    const inputUser = decoded.slice(0, separatorIndex);
    const inputPass = decoded.slice(separatorIndex + 1);

    if (inputUser === username && inputPass === password) {
      return NextResponse.next();
    }
  } catch {
    return unauthorizedResponse();
  }

  return unauthorizedResponse();
}

export const config = {
  matcher: ["/admin/:path*"],
};
