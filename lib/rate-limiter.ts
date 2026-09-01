import { RateLimiterMemory, IRateLimiterOptions } from "rate-limiter-flexible";
import { headers } from "next/headers";

// Default rate limiting configuration
const DEFAULT_OPTIONS: IRateLimiterOptions = {
  points: 10, // 10 requests
  duration: 60, // per 60 seconds
};

// Create a rate limiter instance
const rateLimiter = new RateLimiterMemory(DEFAULT_OPTIONS);

// Function to extract IP address from headers
export function extractIpAddress(headersInfo: Headers): string {
  // Try to get IP from common proxy headers
  const xForwardedFor = headersInfo.get("x-forwarded-for");
  const xRealIp = headersInfo.get("x-real-ip");
  const cfConnectingIp = headersInfo.get("cf-connecting-ip");
  const forwarded = headersInfo.get("forwarded");

  if (xForwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    const ips = xForwardedFor.split(",");
    return ips[0].trim();
  }

  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  if (xRealIp) {
    return xRealIp;
  }

  if (forwarded) {
    // Parse forwarded header format: "for=192.0.2.60;proto=http;by=203.0.113.43"
    const match = forwarded.match(/for=([^;]+)/);
    if (match) {
      return match[1].trim();
    }
  }

  // Fallback to a default key
  return "unknown-ip";
}

// Rate limiting middleware
export async function rateLimit(
  pointsToConsume: number = 1,
  customKey?: string,
): Promise<{ success: boolean; ipAddress: string; error?: string }> {
  const headersInfo = await headers();
  const ipAddress = extractIpAddress(headersInfo);
  
  // Use custom key if provided, otherwise use IP address
  const key = customKey || ipAddress;

  try {
    await rateLimiter.consume(key, pointsToConsume);
    return { success: true, ipAddress };
  } catch (error) {
    console.log("Rate limit exceeded for key:", key);
    return { 
      success: false, 
      ipAddress,
      error: "Too many requests" 
    };
  }
}

// Helper to check remaining points
export async function getRateLimitInfo(key?: string): Promise<{
  remainingPoints: number;
  msBeforeNext: number;
  consumedPoints: number;
}> {
  const headersInfo = await headers();
  const ipAddress = extractIpAddress(headersInfo);
  const limiterKey = key || ipAddress;

  try {
    const res = await rateLimiter.get(limiterKey);
    return {
      remainingPoints: res?.remainingPoints || 0,
      msBeforeNext: res?.msBeforeNext || 0,
      consumedPoints: res?.consumedPoints || 0,
    };
  } catch (error) {
    return {
      remainingPoints: DEFAULT_OPTIONS.points || 10,
      msBeforeNext: 0,
      consumedPoints: 0,
    };
  }
}

// Create a custom rate limiter with different options
export function createRateLimiter(options: IRateLimiterOptions) {
  return new RateLimiterMemory(options);
}