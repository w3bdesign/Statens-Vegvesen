import {
  safe,
  sanitizeStr,
  sanitizeNum,
  sanitizeBool,
  sanitizeKode,
} from "../sanitize";

/** Discriminated field type tag used to select the correct sanitizer */
type FieldType = "str" | "num" | "bool" | "kode";

/** A single declarative field descriptor */
export interface FieldDescriptor<S> {
  /** Property name on the output object */
  key: string;
  /** Which sanitizer to apply */
  type: FieldType;
  /** Accessor that extracts the raw value from the sources bundle */
  get: (sources: S) => unknown;
}

/** Apply the sanitizer that matches `type` to `value` */
function sanitizeValue(value: unknown, type: FieldType): unknown {
  if (type === "str") {
    return sanitizeStr(value as string | null | undefined);
  }
  if (type === "num") {
    return sanitizeNum(value as number | null | undefined);
  }
  if (type === "bool") {
    return sanitizeBool(value as boolean | null | undefined);
  }
  // type === "kode"
  return sanitizeKode(
    value as
      | { kodeBeskrivelse?: string; kodeNavn?: string }
      | null
      | undefined,
  );
}

/**
 * Generic data-driven section builder.
 *
 * Iterates over the field descriptors, safely evaluates each accessor,
 * applies the matching sanitizer, and returns a fully typed result object.
 */
export function buildSection<S, R>(
  sources: S,
  fields: ReadonlyArray<FieldDescriptor<S>>,
): R {
  const result: Record<string, unknown> = {};

  for (const field of fields) {
    const raw = safe(() => field.get(sources));
    result[field.key] = sanitizeValue(raw, field.type);
  }

  return result as R;
}
