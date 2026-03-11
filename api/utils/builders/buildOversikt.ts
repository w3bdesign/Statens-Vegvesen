import { safe, sanitizeStr, sanitizeKode } from "../sanitize";
import type {
  IOversikt,
  KjoretoydataListe,
  Generelt,
  KarosseriOgLasteplan,
  TekniskGodkjenning,
} from "../../../scripts/types/typeDefinitions";

/** Build the Oversikt section of the vehicle data response */
export function buildOversikt(
  kjoretoy: KjoretoydataListe,
  generelt: Generelt | null,
  karosseri: KarosseriOgLasteplan | null,
  tekniskGodkjenning: TekniskGodkjenning | null,
): IOversikt {
  return {
    kjennemerke: sanitizeStr(safe(() => kjoretoy.kjoretoyId.kjennemerke)),
    understellsnummer: sanitizeStr(
      safe(() => kjoretoy.kjoretoyId.understellsnummer),
    ),
    merke: sanitizeStr(safe(() => generelt?.merke?.[0]?.merke)),
    modell: sanitizeStr(safe(() => generelt?.handelsbetegnelse?.[0])),
    typebetegnelse: sanitizeStr(safe(() => generelt?.typebetegnelse)),
    farge: sanitizeKode(safe(() => karosseri?.rFarge?.[0])),
    kjoretoyKlasse: sanitizeStr(
      safe(() => tekniskGodkjenning?.kjoretoyklassifisering?.beskrivelse),
    ),
    forstegangsregistrering: sanitizeStr(
      safe(
        () => kjoretoy.forstegangsregistrering?.registrertForstegangNorgeDato,
      ),
    ),
    registreringsstatus: sanitizeKode(
      safe(() => kjoretoy.registrering?.registreringsstatus),
    ),
    kjoringensArt: sanitizeKode(
      safe(() => kjoretoy.registrering?.kjoringensArt),
    ),
    nesteEuKontroll: sanitizeStr(
      safe(() => kjoretoy.periodiskKjoretoyKontroll?.kontrollfrist),
    ),
    sistGodkjentEuKontroll: sanitizeStr(
      safe(() => kjoretoy.periodiskKjoretoyKontroll?.sistGodkjent),
    ),
  };
}
