
const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
];
const COOKIE_NAME = 'utm_data';
const COOKIE_EXP_DAYS = 30;

export function getUtmsFromUrl(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const utms: Record<string, string> = {};
  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) utms[key] = value;
  });
  return utms;
}

export function saveUtmsToCookie(utms: Record<string, string>) {
  const expires = new Date(Date.now() + COOKIE_EXP_DAYS * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(utms))}; expires=${expires}; path=/`;
}

export function getUtmsFromCookie(): Record<string, string> | null {
  const match = document.cookie.match(new RegExp('(^| )' + COOKIE_NAME + '=([^;]+)'));
  if (match) {
    try {
      return JSON.parse(decodeURIComponent(match[2]));
    } catch {
      return null;
    }
  }
  return null;
}

import { useEffect } from 'react';
export function useUtmCapture() {
  useEffect(() => {
    const utms = getUtmsFromUrl();
    if (Object.keys(utms).length > 0) {
      saveUtmsToCookie(utms);
    }
  }, []);
}
