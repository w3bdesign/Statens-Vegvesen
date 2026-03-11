import { safe, sanitizeStr, sanitizeNum } from "../sanitize";
import type {
  ITeknisk,
  Akslinger,
  AkselDekkOgFelg,
  Aksel,
  Tilhengerkopling,
} from "../../../scripts/types/typeDefinitions";

/** Build the Teknisk section of the vehicle data response */
export function buildTeknisk(
  akslinger: Akslinger | null,
  dekkForan: AkselDekkOgFelg | null,
  dekkBak: AkselDekkOgFelg | null,
  akselForan: Aksel | null,
  akselBak: Aksel | null,
  tilhengerkopling: Tilhengerkopling | null,
): ITeknisk {
  return {
    antallAksler: sanitizeNum(safe(() => akslinger?.antallAksler)),
    dekkdimensjonForan: sanitizeStr(safe(() => dekkForan?.dekkdimensjon)),
    felgdimensjonForan: sanitizeStr(safe(() => dekkForan?.felgdimensjon)),
    hastighetsKodeDekkForan: sanitizeStr(
      safe(() => dekkForan?.hastighetskodeDekk),
    ),
    dekkdimensjonBak: sanitizeStr(safe(() => dekkBak?.dekkdimensjon)),
    felgdimensjonBak: sanitizeStr(safe(() => dekkBak?.felgdimensjon)),
    hastighetsKodeDekkBak: sanitizeStr(
      safe(() => dekkBak?.hastighetskodeDekk),
    ),
    sporviddeFoyanMm: sanitizeNum(safe(() => akselForan?.sporvidde)),
    sporviddeBakMm: sanitizeNum(safe(() => akselBak?.sporvidde)),
    tilhengerkopling: sanitizeStr(
      safe(() => {
        const kop = tilhengerkopling?.kopling?.[0];
        if (!kop) return null;
        return (
          kop.koplingBeskrivelse ||
          kop.koplingType?.kodeBeskrivelse ||
          kop.koplingType?.kodeNavn ||
          null
        );
      }),
    ),
  };
}
