import { buildSection, FieldDescriptor } from "./buildFields";
import type {
  ITeknisk,
  Akslinger,
  AkselDekkOgFelg,
  Aksel,
  Tilhengerkopling,
} from "../../../scripts/types/typeDefinitions";

/** Source bundle passed into each field accessor */
interface TekniskSources {
  akslinger: Akslinger | null;
  dekkForan: AkselDekkOgFelg | null;
  dekkBak: AkselDekkOgFelg | null;
  akselForan: Aksel | null;
  akselBak: Aksel | null;
  tilhengerkopling: Tilhengerkopling | null;
}

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
const tekniskFields: ReadonlyArray<FieldDescriptor<TekniskSources>> = [
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

/** Build the Teknisk section of the vehicle data response */
export function buildTeknisk(
  akslinger: Akslinger | null,
  dekkForan: AkselDekkOgFelg | null,
  dekkBak: AkselDekkOgFelg | null,
  akselForan: Aksel | null,
  akselBak: Aksel | null,
  tilhengerkopling: Tilhengerkopling | null,
): ITeknisk {
  return buildSection<TekniskSources, ITeknisk>(
    { akslinger, dekkForan, dekkBak, akselForan, akselBak, tilhengerkopling },
    tekniskFields,
  );
}
