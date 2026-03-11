/** Escape HTML special characters to prevent XSS */
export function escapeHtml(str: string): string {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/** Safely access deeply nested properties, returning null if any part is missing */
export function safe<T>(fn: () => T): Exclude<T, undefined> | null {
  try {
    const result = fn();
    return result === undefined ? null : (result as Exclude<T, undefined>);
  } catch {
    return null;
  }
}

/** Sanitize a string value, or return null */
export function sanitizeStr(val: string | null | undefined): string | null {
  if (val === null || val === undefined) return null;
  return escapeHtml(String(val));
}

/** Sanitize a number value, or return null */
export function sanitizeNum(val: number | null | undefined): number | null {
  if (val === null || val === undefined || Number.isNaN(Number(val)))
    return null;
  return Number(val);
}

/** Sanitize a boolean value, or return null */
export function sanitizeBool(val: boolean | null | undefined): boolean | null {
  if (val === null || val === undefined) return null;
  return Boolean(val);
}

/** Extract kodeBeskrivelse or kodeNavn from a KjoringensArt-like object, or return null */
export function sanitizeKode(
  obj: { kodeBeskrivelse?: string; kodeNavn?: string } | null | undefined,
): string | null {
  return sanitizeStr(safe(() => obj?.kodeBeskrivelse || obj?.kodeNavn));
}
