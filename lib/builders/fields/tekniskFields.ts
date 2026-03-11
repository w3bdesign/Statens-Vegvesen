import type { FieldDescriptor } from "../buildFields";
import { TekniskSources } from "../sources";


/** Resolve the best available tilhengerkopling description */
function resolveTilhengerkoplingLabel(s: TekniskSources): string | null {
  const kop = s.tilhengerkopling?.kopling?.[0];
  if (!kop) return null;
  return (
    kop.koplingBeskrivelse ||
    kop.koplingType?.kodeBeskrivelse ||
    kop.koplingType?.kodeNavn ||
    null
  );
}

/** Declarative field definitions for the Teknisk section */
export const tekniskFields: ReadonlyArray<FieldDescriptor<TekniskSources>> = [
  { key: "antallAksler", type: "num", get: (s) => s.akslinger?.antallAksler },
  { key: "dekkdimensjonForan", type: "str", get: (s) => s.dekkForan?.dekkdimensjon },
  { key: "felgdimensjonForan", type: "str", get: (s) => s.dekkForan?.felgdimensjon },
  { key: "hastighetsKodeDekkForan", type: "str", get: (s) => s.dekkForan?.hastighetskodeDekk },
  { key: "dekkdimensjonBak", type: "str", get: (s) => s.dekkBak?.dekkdimensjon },
  { key: "felgdimensjonBak", type: "str", get: (s) => s.dekkBak?.felgdimensjon },
  { key: "hastighetsKodeDekkBak", type: "str", get: (s) => s.dekkBak?.hastighetskodeDekk },
  { key: "sporviddeFoyanMm", type: "num", get: (s) => s.akselForan?.sporvidde },
  { key: "sporviddeBakMm", type: "num", get: (s) => s.akselBak?.sporvidde },
  { key: "tilhengerkopling", type: "str", get: resolveTilhengerkoplingLabel },
];
