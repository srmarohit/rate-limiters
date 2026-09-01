import { NextResponse } from "next/server";
import { rateLimit } from "../../../lib/rate-limiter";

// Helper function for rate-limited requests
async function handleRateLimitedRequest(
  request: Request | null,
  method: string,
) {
  const limitResult = await rateLimit(2); // Consume 2 points per request

  if (!limitResult.success) {
    return NextResponse.json(
      {
        message: "Too many requests",
        ip: limitResult.ipAddress,
        error: limitResult.error,
      },
      { status: 429 },
    );
  }

  let body = {};
  if (request) {
    // Parse request body if needed
    body = await request.json().catch(() => ({}));
  }

  return NextResponse.json(
    {
      message: `${method} request received`,
      ip: limitResult.ipAddress,
      data: body,
      timestamp: new Date().toISOString(),
    },
    { status: 200 },
  );
}

export async function GET() {
  const limitResult = await rateLimit(2); // Consume 2 points per GET request

  if (!limitResult.success) {
    return NextResponse.json(
      {
        message: "Too many requests",
        ip: limitResult.ipAddress,
        error: limitResult.error,
      },
      { status: 429 },
    );
  }

  return NextResponse.json(
    {
      message: "Hello World",
      ip: limitResult.ipAddress,
      timestamp: new Date().toISOString(),
    },
    { status: 200 },
  );
}

export async function POST(request: Request) {
  return handleRateLimitedRequest(request, "POST");
}

export async function PUT(request: Request) {
  return handleRateLimitedRequest(request, "PUT");
}

export async function DELETE(request: Request) {
  return handleRateLimitedRequest(request, "DELETE");
}

export async function PATCH(request: Request) {
  return handleRateLimitedRequest(request, "PATCH");
}

// Optional: Add a HEAD method for checking rate limit status
export async function HEAD() {
  const limitResult = await rateLimit(0); // Check without consuming points

  const headers = new Headers();
  headers.set("X-RateLimit-IP", limitResult.ipAddress);
  headers.set("X-RateLimit-Success", limitResult.success.toString());

  if (!limitResult.success) {
    headers.set("X-RateLimit-Error", limitResult.error || "Limited");
    return new NextResponse(null, { status: 429, headers });
  }

  return new NextResponse(null, { status: 200, headers });
}
