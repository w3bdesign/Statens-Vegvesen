import { buildSection } from "./buildFields";
import { malOgVektFields } from "./fields/malOgVektFields";
import type { MalOgVektSources } from "./sources";
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
  const sources: MalOgVektSources = { dimensjoner, vekter, persontall, karosseri };
  return buildSection<MalOgVektSources, IMalOgVekt>(sources, malOgVektFields);
}
