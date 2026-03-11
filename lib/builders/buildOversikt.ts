import { buildSection } from "./buildFields";
import { oversiktFields } from "./fields/oversiktFields";
import type { OversiktSources } from "./sources";
import type {
  IOversikt,
  Generelt,
  KarosseriOgLasteplan,
  KjoretoydataListe,
  TekniskGodkjenning,
} from "../../scripts/types/typeDefinitions";

/** Build the Oversikt section of the vehicle data response */
export function buildOversikt(
  kjoretoy: KjoretoydataListe,
  generelt: Generelt | null,
  karosseri: KarosseriOgLasteplan | null,
  tekniskGodkjenning: TekniskGodkjenning | null,
): IOversikt {
  const sources: OversiktSources = { kjoretoy, generelt, karosseri, tekniskGodkjenning };
  return buildSection<OversiktSources, IOversikt>(sources, oversiktFields);
}
