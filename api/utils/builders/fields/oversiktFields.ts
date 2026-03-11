import type { FieldDescriptor } from "../buildFields";
import type { OversiktSources } from "../sources";

/** Declarative field definitions for the Oversikt section */
export const oversiktFields: ReadonlyArray<FieldDescriptor<OversiktSources>> = [
  { key: "kjennemerke", type: "str", get: (s) => s.kjoretoy.kjoretoyId.kjennemerke },
  { key: "understellsnummer", type: "str", get: (s) => s.kjoretoy.kjoretoyId.understellsnummer },
  { key: "merke", type: "str", get: (s) => s.generelt?.merke?.[0]?.merke },
  { key: "modell", type: "str", get: (s) => s.generelt?.handelsbetegnelse?.[0] },
  { key: "typebetegnelse", type: "str", get: (s) => s.generelt?.typebetegnelse },
  { key: "farge", type: "kode", get: (s) => s.karosseri?.rFarge?.[0] },
  { key: "kjoretoyKlasse", type: "str", get: (s) => s.tekniskGodkjenning?.kjoretoyklassifisering?.beskrivelse },
  { key: "forstegangsregistrering", type: "str", get: (s) => s.kjoretoy.forstegangsregistrering?.registrertForstegangNorgeDato },
  { key: "registreringsstatus", type: "kode", get: (s) => s.kjoretoy.registrering?.registreringsstatus },
  { key: "kjoringensArt", type: "kode", get: (s) => s.kjoretoy.registrering?.kjoringensArt },
  { key: "nesteEuKontroll", type: "str", get: (s) => s.kjoretoy.periodiskKjoretoyKontroll?.kontrollfrist },
  { key: "sistGodkjentEuKontroll", type: "str", get: (s) => s.kjoretoy.periodiskKjoretoyKontroll?.sistGodkjent },
];
