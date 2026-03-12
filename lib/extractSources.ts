/**
 * Extracts and safely navigates all nested data sources from a raw
 * KjoretoydataListe record returned by the Statens Vegvesen API.
 *
 * Each section has its own focused extraction function to keep complexity low.
 */
import { safe } from "./sanitize";
import type {
  OversiktSources,
  MotorOgYtelseSources,
  MalOgVektSources,
  TekniskSources,
} from "./builders/sources";
import type {
  KjoretoydataListe,
  TekniskeData,
  TekniskGodkjenning,
  Akslinger,
  Aksel,
  MotorOgDrivverk,
  Miljodata,
} from "../scripts/types/typeDefinitions";

/** All four source bundles grouped together */
export interface AllSources {
  oversikt: OversiktSources;
  motorOgYtelse: MotorOgYtelseSources;
  malOgVekt: MalOgVektSources;
  teknisk: TekniskSources;
}

/** Resolve the top-level teknisk godkjenning and tekniske data from a vehicle record */
function extractTekniskeData(kjoretoy: KjoretoydataListe) {
  const tekniskGodkjenning = safe(
    () => kjoretoy.godkjenning.tekniskGodkjenning,
  );
  const tekniskeData = safe(() => tekniskGodkjenning?.tekniskeData);
  return { tekniskGodkjenning, tekniskeData };
}

/** Extract sources for the Oversikt section */
function extractOversiktSources(
  kjoretoy: KjoretoydataListe,
  tekniskeData: TekniskeData | null,
  tekniskGodkjenning: TekniskGodkjenning | null,
): OversiktSources {
  const generelt = safe(() => tekniskeData?.generelt);
  const karosseri = safe(() => tekniskeData?.karosseriOgLasteplan);
  return { kjoretoy, generelt, karosseri, tekniskGodkjenning };
}

/** Extract the primary motor from a drivverk section */
function extractMotor(motorOgDrivverk: MotorOgDrivverk | null) {
  return safe(() => motorOgDrivverk?.motor?.[0]);
}

/** Extract the first miljø group and its forbruk entry */
function extractMiljoForbruk(miljodata: Miljodata | null) {
  const miljoGruppe = safe(() => miljodata?.miljoOgdrivstoffGruppe?.[0]);
  const forbruk = safe(() => miljoGruppe?.forbrukOgUtslipp?.[0]);
  return { miljoGruppe, forbruk };
}

/** Extract sources for the Motor og Ytelse section */
function extractMotorOgYtelseSources(
  tekniskeData: TekniskeData | null,
): MotorOgYtelseSources {
  const motorOgDrivverk = safe(() => tekniskeData?.motorOgDrivverk);
  const miljodata = safe(() => tekniskeData?.miljodata);
  const motor = extractMotor(motorOgDrivverk);
  const { miljoGruppe, forbruk } = extractMiljoForbruk(miljodata);
  return { motor, motorOgDrivverk, miljodata, miljoGruppe, forbruk };
}

/** Extract sources for the Mål og Vekt section */
function extractMalOgVektSources(
  tekniskeData: TekniskeData | null,
): MalOgVektSources {
  const dimensjoner = safe(() => tekniskeData?.dimensjoner);
  const vekter = safe(() => tekniskeData?.vekter);
  const persontall = safe(() => tekniskeData?.persontall);
  const karosseri = safe(() => tekniskeData?.karosseriOgLasteplan);
  return { dimensjoner, vekter, persontall, karosseri };
}

/** Extract dekk (tyre) data from the raw tekniske data */
function extractDekkData(tekniskeData: TekniskeData | null) {
  const dekkOgFelg = safe(() => tekniskeData?.dekkOgFelg);
  const dekkKomb = safe(() => dekkOgFelg?.akselDekkOgFelgKombinasjon?.[0]);
  const dekkForan = safe(() => dekkKomb?.akselDekkOgFelg?.[0]);
  const dekkBak = safe(() => dekkKomb?.akselDekkOgFelg?.[1]);
  return { dekkForan, dekkBak };
}

/** Retrieve the first aksel from a specific akselGruppe by index */
function extractAkselAtGroup(
  akslinger: Akslinger | null,
  groupIndex: number,
): Aksel | null {
  const gruppe = safe(() => akslinger?.akselGruppe?.[groupIndex]);
  return safe(() => gruppe?.akselListe?.aksel?.[0]);
}

/** Extract aksel (axle) data from the raw tekniske data */
function extractAkselData(tekniskeData: TekniskeData | null) {
  const akslinger = safe(() => tekniskeData?.akslinger);
  const akselForan = extractAkselAtGroup(akslinger, 0);
  const akselBak = extractAkselAtGroup(akslinger, 1);
  return { akslinger, akselForan, akselBak };
}

/** Extract sources for the Teknisk section */
function extractTekniskSources(
  tekniskeData: TekniskeData | null,
): TekniskSources {
  const tilhengerkopling = safe(() => tekniskeData?.tilhengerkopling);
  const { dekkForan, dekkBak } = extractDekkData(tekniskeData);
  const { akslinger, akselForan, akselBak } = extractAkselData(tekniskeData);
  return { akslinger, dekkForan, dekkBak, akselForan, akselBak, tilhengerkopling };
}

/** Extract every source bundle a builder needs from a single vehicle record */
export function extractSources(kjoretoy: KjoretoydataListe): AllSources {
  const { tekniskGodkjenning, tekniskeData } = extractTekniskeData(kjoretoy);

  return {
    oversikt: extractOversiktSources(kjoretoy, tekniskeData, tekniskGodkjenning),
    motorOgYtelse: extractMotorOgYtelseSources(tekniskeData),
    malOgVekt: extractMalOgVektSources(tekniskeData),
    teknisk: extractTekniskSources(tekniskeData),
  };
}
