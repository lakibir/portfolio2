import { NextRequest, NextResponse } from "next/server";

import { sendContactEmail } from "@/lib/mail";
import { contactSchema } from "@/lib/validations/contact";

const RATE_LIMIT_WINDOW = 60_000;
const MAX_REQUESTS = 5;
const requestMap = new Map<string, { count: number; timestamp: number }>();

function getClientKey(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "anonymous";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const entry = requestMap.get(key);

  if (!entry || now - entry.timestamp > RATE_LIMIT_WINDOW) {
    requestMap.set(key, { count: 1, timestamp: now });
    return false;
  }

  if (entry.count >= MAX_REQUESTS) {
    return true;
  }

  requestMap.set(key, { count: entry.count + 1, timestamp: entry.timestamp });
  return false;
}

export async function POST(request: NextRequest) {
  const clientKey = getClientKey(request);

  if (isRateLimited(clientKey)) {
    return NextResponse.json({ message: "Too many submissions. Please try again later." }, { status: 429 });
  }

  try {
    const payload = await request.json();
    const result = contactSchema.safeParse(payload);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Invalid form submission.",
          issues: result.error.flatten(),
        },
        { status: 400 },
      );
    }

    if (result.data.company) {
      return NextResponse.json({ message: "Submission received." }, { status: 200 });
    }

    await sendContactEmail(result.data);

    return NextResponse.json({ message: "Message sent successfully." }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error.";

    return NextResponse.json(
      {
        message: message.includes("Email credentials")
          ? "Email delivery is not configured. Set EMAIL_USER and EMAIL_PASS."
          : "Unable to send message right now.",
      },
      { status: 500 },
    );
  }
}
