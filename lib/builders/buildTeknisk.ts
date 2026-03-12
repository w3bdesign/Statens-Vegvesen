import { buildSection } from "./buildFields";

import type { TekniskSources } from "./sources";
import type { ITeknisk } from "../../scripts/types/typeDefinitions";
import { tekniskFields } from "./fields/tekniskFields";

/** Build the Teknisk section of the vehicle data response */
export function buildTeknisk(sources: TekniskSources): ITeknisk {
  return buildSection<TekniskSources, ITeknisk>(sources, tekniskFields);
}
