/**
 * Debug utilities for image URL processing
 */

export function debugImageUrl(originalUrl: string, processedUrl: string) {
  if (process.env.NODE_ENV === "development") {
    console.group("🖼️ Image URL Debug");
    console.log("Original URL:", originalUrl);
    console.log("Processed URL:", processedUrl);
    console.log(
      "Is Firebase URL:",
      originalUrl.includes("firebasestorage.googleapis.com"),
    );
    console.log("Has alt=media:", processedUrl.includes("alt=media"));
    console.groupEnd();
  }
}

export function logImageError(url: string, error: Event) {
  if (process.env.NODE_ENV === "development") {
    const target = error.target as HTMLImageElement;

    // Analyze URL structure for debugging
    const urlAnalysis = analyzeImageUrl(url);

    // Log detailed error information without network requests
    console.error("🚨 Image Load Error:", {
      url,
      currentSrc: target?.currentSrc,
      naturalWidth: target?.naturalWidth,
      naturalHeight: target?.naturalHeight,
      complete: target?.complete,
      errorType: error.type,
      timestamp: new Date().toISOString(),
      urlAnalysis,
    });

    // Provide helpful debugging tips
    console.group("💡 Debugging Tips:");
    if (urlAnalysis.isFirebase) {
      console.log("- Firebase URL detected");
      console.log("- Check if token is valid and not expired");
      console.log("- Verify Firebase Storage rules allow read access");
      if (!urlAnalysis.hasAltMedia) {
        console.warn("- Missing alt=media parameter");
      }
    } else {
      console.log("- External URL detected");
      console.log("- Check CORS settings on the source server");
      console.log("- Verify the URL is accessible");
    }
    console.groupEnd();
  }
}

// Analyze URL structure without making network requests
function analyzeImageUrl(url: string) {
  try {
    const urlObj = new URL(url);
    return {
      isFirebase: url.includes("firebasestorage.googleapis.com"),
      hasAltMedia: url.includes("alt=media"),
      hasToken: url.includes("token="),
      protocol: urlObj.protocol,
      hostname: urlObj.hostname,
      pathname: urlObj.pathname,
      searchParams: Object.fromEntries(urlObj.searchParams.entries()),
    };
  } catch (error) {
    return {
      isFirebase: false,
      hasAltMedia: false,
      hasToken: false,
      malformed: true,
      error: error instanceof Error ? error.message : "Unknown URL error",
    };
  }
}

export function logImageSuccess(url: string) {
  if (process.env.NODE_ENV === "development") {
    console.log("✅ Image Loaded Successfully:", url);
  }
}

/**
 * Validate URL format without making network requests
 */
export function validateImageUrl(url: string): {
  isValid: boolean;
  reason?: string;
} {
  try {
    const urlObj = new URL(url);

    // Check for common image URL patterns
    const isValidProtocol = ["http:", "https:", "data:"].includes(
      urlObj.protocol,
    );
    if (!isValidProtocol) {
      return { isValid: false, reason: "Invalid protocol" };
    }

    // Check for data URLs
    if (urlObj.protocol === "data:") {
      const isImageData = urlObj.href.startsWith("data:image/");
      return {
        isValid: isImageData,
        reason: isImageData ? undefined : "Not an image data URL",
      };
    }

    // Check for Firebase Storage URLs
    if (url.includes("firebasestorage.googleapis.com")) {
      const hasRequiredParams = url.includes("alt=media");
      return {
        isValid: hasRequiredParams,
        reason: hasRequiredParams ? undefined : "Missing alt=media parameter",
      };
    }

    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      reason: error instanceof Error ? error.message : "Malformed URL",
    };
  }
}
