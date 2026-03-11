import { safe, sanitizeStr, sanitizeNum } from "../sanitize";
import type {
  IMalOgVekt,
  Dimensjoner,
  Vekter,
  Persontall,
  KarosseriOgLasteplan,
} from "../../../scripts/types/typeDefinitions";

/** Build the Mål & Vekt section of the vehicle data response */
export function buildMalOgVekt(
  dimensjoner: Dimensjoner | null,
  vekter: Vekter | null,
  persontall: Persontall | null,
  karosseri: KarosseriOgLasteplan | null,
): IMalOgVekt {
  return {
    lengdeMm: sanitizeNum(safe(() => dimensjoner?.lengde)),
    breddeMm: sanitizeNum(safe(() => dimensjoner?.bredde)),
    hoydeMm: sanitizeNum(safe(() => dimensjoner?.hoyde)),
    egenvektKg: sanitizeNum(safe(() => vekter?.egenvekt)),
    nyttelastKg: sanitizeNum(safe(() => vekter?.nyttelast)),
    tillattTotalvektKg: sanitizeNum(safe(() => vekter?.tillattTotalvekt)),
    tillattTaklastKg: sanitizeNum(safe(() => vekter?.tillattTaklast)),
    tillattTilhengervektMedBremsKg: sanitizeNum(
      safe(() => vekter?.tillattTilhengervektMedBrems),
    ),
    tillattTilhengervektUtenBremsKg: sanitizeNum(
      safe(() => vekter?.tillattTilhengervektUtenBrems),
    ),
    tillattVogntogvektKg: sanitizeNum(safe(() => vekter?.tillattVogntogvekt)),
    sitteplasserTotalt: sanitizeNum(safe(() => persontall?.sitteplasserTotalt)),
    sitteplasserForan: sanitizeNum(safe(() => persontall?.sitteplasserForan)),
    antallDorer: sanitizeNum(safe(() => karosseri?.antallDorer?.[0])),
    kjoreSide: sanitizeStr(safe(() => karosseri?.kjoringSide)),
  };
}
