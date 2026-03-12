import { buildSection } from "./buildFields";

import type { MotorOgYtelseSources } from "./sources";
import type { IMotorOgYtelse } from "../../scripts/types/typeDefinitions";
import { motorOgYtelseFields } from "./fields/motorOgYtelseFields";

/** Build the Motor & Ytelse section of the vehicle data response */
export function buildMotorOgYtelse(
  sources: MotorOgYtelseSources,
): IMotorOgYtelse {
  return buildSection<MotorOgYtelseSources, IMotorOgYtelse>(
    sources,
    motorOgYtelseFields,
  );
}
