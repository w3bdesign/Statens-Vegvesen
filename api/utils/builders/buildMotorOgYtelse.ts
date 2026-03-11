import { buildSection, FieldDescriptor } from "./buildFields";
import type {
  IMotorOgYtelse,
  Motor,
  MotorOgDrivverk,
  Miljodata,
  MiljoOgdrivstoffGruppe,
  ForbrukOgUtslipp,
} from "../../../scripts/types/typeDefinitions";

/** Source bundle passed into each field accessor */
interface MotorOgYtelseSources {
  motor: Motor | null;
  motorOgDrivverk: MotorOgDrivverk | null;
  miljodata: Miljodata | null;
  miljoGruppe: MiljoOgdrivstoffGruppe | null;
  forbruk: ForbrukOgUtslipp | null;
}

/** Declarative field definitions for the Motor & Ytelse section */
const motorOgYtelseFields: ReadonlyArray<FieldDescriptor<MotorOgYtelseSources>> = [
  { key: "drivstofftype", type: "kode", get: (s) => s.miljoGruppe?.drivstoffKodeMiljodata },
  { key: "motoreffektKw", type: "num", get: (s) => s.motor?.drivstoff?.[0]?.maksNettoEffekt },
  { key: "slagvolumCc", type: "num", get: (s) => s.motor?.slagvolum },
  { key: "antallSylindre", type: "num", get: (s) => s.motor?.antallSylindre },
  { key: "girkassetype", type: "kode", get: (s) => s.motorOgDrivverk?.girkassetype },
  { key: "antallGir", type: "num", get: (s) => s.motorOgDrivverk?.antallGir },
  { key: "hybridKategori", type: "kode", get: (s) => s.motorOgDrivverk?.hybridKategori },
  { key: "maksHastighetKmT", type: "num", get: (s) => s.motorOgDrivverk?.maksimumHastighet?.[0] },
  { key: "euroKlasse", type: "kode", get: (s) => s.miljodata?.euroKlasse },
  { key: "co2BlandetKjoring", type: "num", get: (s) => s.forbruk?.co2BlandetKjoring },
  { key: "forbrukBlandetKjoring", type: "num", get: (s) => s.forbruk?.forbrukBlandetKjoring },
  { key: "noxUtslippMgKm", type: "num", get: (s) => s.forbruk?.utslippNOxMgPrKm },
  { key: "partikkelfilter", type: "bool", get: (s) => s.forbruk?.partikkelfilterFabrikkmontert },
  { key: "rekkeviddeKm", type: "num", get: (s) => s.forbruk?.rekkeviddeKm },
  { key: "stoynivaaDb", type: "num", get: (s) => s.miljoGruppe?.lyd?.standstoy },
];

/** Build the Motor & Ytelse section of the vehicle data response */
export function buildMotorOgYtelse(
  motor: Motor | null,
  motorOgDrivverk: MotorOgDrivverk | null,
  miljodata: Miljodata | null,
  miljoGruppe: MiljoOgdrivstoffGruppe | null,
  forbruk: ForbrukOgUtslipp | null,
): IMotorOgYtelse {
  return buildSection<MotorOgYtelseSources, IMotorOgYtelse>(
    { motor, motorOgDrivverk, miljodata, miljoGruppe, forbruk },
    motorOgYtelseFields,
  );
}
