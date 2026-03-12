/**
 * High-level orchestrator: raw vehicle record → structured IVehicleData.
 *
 * Combines source extraction with the four section builders so
 * the API handler can delegate all data-shaping in a single call.
 */
import { extractSources } from "./extractSources";
import { buildOversikt } from "./builders/buildOversikt";
import { buildMotorOgYtelse } from "./builders/buildMotorOgYtelse";
import { buildMalOgVekt } from "./builders/buildMalOgVekt";
import { buildTeknisk } from "./builders/buildTeknisk";
import type {
  KjoretoydataListe,
  IVehicleData,
} from "../scripts/types/typeDefinitions";

/** Transform a raw vehicle record into the structured API response */
export function buildVehicleData(kjoretoy: KjoretoydataListe): IVehicleData {
  const sources = extractSources(kjoretoy);

  return {
    oversikt: buildOversikt(sources.oversikt),
    motorOgYtelse: buildMotorOgYtelse(sources.motorOgYtelse),
    malOgVekt: buildMalOgVekt(sources.malOgVekt),
    teknisk: buildTeknisk(sources.teknisk),
  };
}
