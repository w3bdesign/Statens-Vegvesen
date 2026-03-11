import { buildSection } from "./buildFields";
import { motorOgYtelseFields } from "./fields/motorOgYtelseFields";
import type { MotorOgYtelseSources } from "./sources";
import type {
  IMotorOgYtelse,
  Motor,
  MotorOgDrivverk,
  Miljodata,
  MiljoOgdrivstoffGruppe,
  ForbrukOgUtslipp,
} from "../../../scripts/types/typeDefinitions";

/** Build the Motor & Ytelse section of the vehicle data response */
export function buildMotorOgYtelse(
  motor: Motor | null,
  motorOgDrivverk: MotorOgDrivverk | null,
  miljodata: Miljodata | null,
  miljoGruppe: MiljoOgdrivstoffGruppe | null,
  forbruk: ForbrukOgUtslipp | null,
): IMotorOgYtelse {
  const sources: MotorOgYtelseSources = { motor, motorOgDrivverk, miljodata, miljoGruppe, forbruk };
  return buildSection<MotorOgYtelseSources, IMotorOgYtelse>(sources, motorOgYtelseFields);
}
