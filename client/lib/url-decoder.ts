/**
 * Decodes double-encoded Firebase Storage URLs
 * Fixes URLs that have been incorrectly double-encoded
 */
export function decodeFirebaseUrl(url: string): string {
  if (!url || !url.includes("firebasestorage.googleapis.com")) {
    return url;
  }

  try {
    let decodedUrl = url;

    // Handle double-encoded URLs by converting them to single-encoded
    if (
      url.includes("%252F") ||
      url.includes("%253F") ||
      url.includes("%2526")
    ) {
      // Replace double-encoded patterns with single-encoded
      decodedUrl = decodedUrl
        .replace(/%252F/g, "%2F") // %252F -> %2F
        .replace(/%253F/g, "?") // %253F -> ?
        .replace(/%253D/g, "=") // %253D -> =
        .replace(/%2526/g, "&"); // %2526 -> &
    }

    // Handle query parameters that should be decoded
    decodedUrl = decodedUrl
      .replace(/%3F/g, "?") // %3F -> ?
      .replace(/%3D/g, "=") // %3D -> =
      .replace(/%26/g, "&"); // %26 -> &

    return decodedUrl;
  } catch (error) {
    console.warn("Error decoding Firebase URL:", error, "Original URL:", url);
    return url;
  }
}
