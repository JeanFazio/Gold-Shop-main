/**
 * Configuration for image loading and optimization
 */

// Firebase Storage configuration
export const FIREBASE_STORAGE_CONFIG = {
  projectId: "gold-spell",
  bucket: "gold-spell.firebasestorage.app",
  allowedDomains: [
    "firebasestorage.googleapis.com",
    "firebase.google.com",
    "gold-spell.firebasestorage.app",
  ],
};

/**
 * Generates optimized Firebase Storage URL with proper parameters
 */
export function optimizeFirebaseUrl(
  url: string,
  options?: {
    width?: number;
    height?: number;
    quality?: number;
  },
): string {
  if (!url || !url.includes("firebasestorage.googleapis.com")) {
    return url;
  }

  try {
    const urlObj = new URL(url);

    // Add cache control
    urlObj.searchParams.set("alt", "media");

    // Add optimization parameters if available
    if (options?.width) {
      urlObj.searchParams.set("w", options.width.toString());
    }

    if (options?.height) {
      urlObj.searchParams.set("h", options.height.toString());
    }

    if (options?.quality) {
      urlObj.searchParams.set("q", options.quality.toString());
    }

    return urlObj.toString();
  } catch (error) {
    console.warn("Error optimizing Firebase URL:", error);
    return url;
  }
}

/**
 * Check if URL is from a trusted Firebase domain
 */
export function isFirebaseUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return FIREBASE_STORAGE_CONFIG.allowedDomains.some((domain) =>
      urlObj.hostname.includes(domain),
    );
  } catch {
    return false;
  }
}

/**
 * Get appropriate CORS settings for image element
 */
export function getImageCorsSettings(url: string): { crossOrigin?: string } {
  if (isFirebaseUrl(url)) {
    return { crossOrigin: "anonymous" };
  }
  return {};
}
