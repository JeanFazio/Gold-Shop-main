/**
 * Simple image cache to avoid repeated failed requests
 */

interface CacheEntry {
  status: "loading" | "success" | "error";
  timestamp: number;
  attempts: number;
}

class ImageCache {
  private cache = new Map<string, CacheEntry>();
  private readonly maxAge = 5 * 60 * 1000; // 5 minutes
  private readonly maxAttempts = 3;

  isLoadingOrFailed(url: string): boolean {
    const entry = this.cache.get(url);
    if (!entry) return false;

    // Remove expired entries
    if (Date.now() - entry.timestamp > this.maxAge) {
      this.cache.delete(url);
      return false;
    }

    return (
      entry.status === "loading" ||
      (entry.status === "error" && entry.attempts >= this.maxAttempts)
    );
  }

  markAsLoading(url: string): void {
    const existing = this.cache.get(url);
    this.cache.set(url, {
      status: "loading",
      timestamp: Date.now(),
      attempts: existing ? existing.attempts + 1 : 1,
    });
  }

  markAsSuccess(url: string): void {
    this.cache.set(url, {
      status: "success",
      timestamp: Date.now(),
      attempts: 0,
    });
  }

  markAsError(url: string): void {
    const existing = this.cache.get(url);
    this.cache.set(url, {
      status: "error",
      timestamp: Date.now(),
      attempts: existing ? existing.attempts + 1 : 1,
    });
  }

  shouldRetry(url: string): boolean {
    const entry = this.cache.get(url);
    return !entry || entry.attempts < this.maxAttempts;
  }

  clear(): void {
    this.cache.clear();
  }

  getStats(): {
    total: number;
    success: number;
    error: number;
    loading: number;
  } {
    const stats = { total: 0, success: 0, error: 0, loading: 0 };

    for (const entry of this.cache.values()) {
      stats.total++;
      stats[entry.status]++;
    }

    return stats;
  }
}

export const imageCache = new ImageCache();
