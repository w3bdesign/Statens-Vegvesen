import { buildSection } from "./buildFields";
import { oversiktFields } from "./fields/oversiktFields";
import type { OversiktSources } from "./sources";
import type { IOversikt } from "../../scripts/types/typeDefinitions";

/** Build the Oversikt section of the vehicle data response */
export function buildOversikt(sources: OversiktSources): IOversikt {
  return buildSection<OversiktSources, IOversikt>(sources, oversiktFields);
}
