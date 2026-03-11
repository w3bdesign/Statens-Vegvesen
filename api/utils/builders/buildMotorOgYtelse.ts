import { safe, sanitizeNum, sanitizeBool, sanitizeKode } from "../sanitize";
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
  return {
    drivstofftype: sanitizeKode(
      safe(() => miljoGruppe?.drivstoffKodeMiljodata),
    ),
    motoreffektKw: sanitizeNum(
      safe(() => motor?.drivstoff?.[0]?.maksNettoEffekt),
    ),
    slagvolumCc: sanitizeNum(safe(() => motor?.slagvolum)),
    antallSylindre: sanitizeNum(safe(() => motor?.antallSylindre)),
    girkassetype: sanitizeKode(safe(() => motorOgDrivverk?.girkassetype)),
    antallGir: sanitizeNum(safe(() => motorOgDrivverk?.antallGir)),
    hybridKategori: sanitizeKode(safe(() => motorOgDrivverk?.hybridKategori)),
    maksHastighetKmT: sanitizeNum(
      safe(() => motorOgDrivverk?.maksimumHastighet?.[0]),
    ),
    euroKlasse: sanitizeKode(safe(() => miljodata?.euroKlasse)),
    co2BlandetKjoring: sanitizeNum(safe(() => forbruk?.co2BlandetKjoring)),
    forbrukBlandetKjoring: sanitizeNum(
      safe(() => forbruk?.forbrukBlandetKjoring),
    ),
    noxUtslippMgKm: sanitizeNum(safe(() => forbruk?.utslippNOxMgPrKm)),
    partikkelfilter: sanitizeBool(
      safe(() => forbruk?.partikkelfilterFabrikkmontert),
    ),
    rekkeviddeKm: sanitizeNum(safe(() => forbruk?.rekkeviddeKm)),
    stoynivaaDb: sanitizeNum(safe(() => miljoGruppe?.lyd?.standstoy)),
  };
}
