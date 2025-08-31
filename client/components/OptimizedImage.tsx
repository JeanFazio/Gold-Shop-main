import { useState } from "react";
import { decodeFirebaseUrl } from "../lib/url-decoder";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: "lazy" | "eager";
  decoding?: "async" | "sync" | "auto";
  fallbackSrc?: string;
  quality?: number;
  fallbackType?: "product" | "brand" | "avatar";
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  loading = "lazy",
  decoding = "async",
  fallbackSrc = "/placeholder.svg",
}: OptimizedImageProps) {
  const [hasError, setHasError] = useState(false);

  // Simple URL processing - just decode Firebase URLs
  const processedSrc = src ? decodeFirebaseUrl(src) : fallbackSrc;

  const handleError = (event: any) => {
    setHasError(true);
  };

  const handleLoad = () => {
    setHasError(false);
  };

  return (
    <img
      alt={alt}
      loading={loading}
      width={width}
      height={height}
      decoding={decoding}
      className={`${className}`}
      src={hasError ? fallbackSrc : processedSrc}
      onError={handleError}
      onLoad={handleLoad}
    />
  );
}
