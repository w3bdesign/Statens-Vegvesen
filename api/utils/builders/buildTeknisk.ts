import { buildSection } from "./buildFields";
import { tekniskFields } from "./fields/tekniskFields";
import type { TekniskSources } from "./sources";
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
  const sources: TekniskSources = { akslinger, dekkForan, dekkBak, akselForan, akselBak, tilhengerkopling };
  return buildSection<TekniskSources, ITeknisk>(sources, tekniskFields);
}
