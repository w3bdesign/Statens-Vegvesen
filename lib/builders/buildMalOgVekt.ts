import { buildSection } from "./buildFields";

import type { MalOgVektSources } from "./sources";
import type { IMalOgVekt } from "../../scripts/types/typeDefinitions";
import { malOgVektFields } from "./fields/malOgVektFields";

/** Build the Mål & Vekt section of the vehicle data response */
export function buildMalOgVekt(sources: MalOgVektSources): IMalOgVekt {
  return buildSection<MalOgVektSources, IMalOgVekt>(sources, malOgVektFields);
}
