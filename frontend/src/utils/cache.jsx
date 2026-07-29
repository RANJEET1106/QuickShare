const CACHE_PREFIX = "quick-share-pin-";

export function getCachedPin(pin) {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + pin);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setCachedPin(pin, data) {
  try {
    localStorage.setItem(CACHE_PREFIX + pin, JSON.stringify(data));
  } catch {}
}

export function clearCachedPin(pin) {
  localStorage.removeItem(CACHE_PREFIX + pin);
}
