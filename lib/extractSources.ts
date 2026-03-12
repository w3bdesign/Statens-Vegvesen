/**
 * Extracts and safely navigates all nested data sources from a raw
 * KjoretoydataListe record returned by the Statens Vegvesen API.
 *
 * Centralises every `safe()` call so the handler stays thin.
 */
import { safe } from "./sanitize";
import type {
  OversiktSources,
  MotorOgYtelseSources,
  MalOgVektSources,
  TekniskSources,
} from "./builders/sources";
import type { KjoretoydataListe } from "../scripts/types/typeDefinitions";

/** All four source bundles grouped together */
export interface AllSources {
  oversikt: OversiktSources;
  motorOgYtelse: MotorOgYtelseSources;
  malOgVekt: MalOgVektSources;
  teknisk: TekniskSources;
}

/** Extract every source bundle a builder needs from a single vehicle record */
export function extractSources(kjoretoy: KjoretoydataListe): AllSources {
  // Top-level technical data
  const tekniskGodkjenning = safe(
    () => kjoretoy.godkjenning.tekniskGodkjenning,
  );
  const tekniskeData = safe(() => tekniskGodkjenning?.tekniskeData);

  // First-level sections
  const generelt = safe(() => tekniskeData?.generelt);
  const motorOgDrivverk = safe(() => tekniskeData?.motorOgDrivverk);
  const miljodata = safe(() => tekniskeData?.miljodata);
  const dimensjoner = safe(() => tekniskeData?.dimensjoner);
  const vekter = safe(() => tekniskeData?.vekter);
  const persontall = safe(() => tekniskeData?.persontall);
  const karosseri = safe(() => tekniskeData?.karosseriOgLasteplan);
  const akslinger = safe(() => tekniskeData?.akslinger);
  const dekkOgFelg = safe(() => tekniskeData?.dekkOgFelg);
  const tilhengerkopling = safe(() => tekniskeData?.tilhengerkopling);

  // Deeper nested elements
  const motor = safe(() => motorOgDrivverk?.motor?.[0]);
  const miljoGruppe = safe(() => miljodata?.miljoOgdrivstoffGruppe?.[0]);
  const forbruk = safe(() => miljoGruppe?.forbrukOgUtslipp?.[0]);
  const dekkKomb = safe(() => dekkOgFelg?.akselDekkOgFelgKombinasjon?.[0]);
  const dekkForan = safe(() => dekkKomb?.akselDekkOgFelg?.[0]);
  const dekkBak = safe(() => dekkKomb?.akselDekkOgFelg?.[1]);
  const akselForan = safe(
    () => akslinger?.akselGruppe?.[0]?.akselListe?.aksel?.[0],
  );
  const akselBak = safe(
    () => akslinger?.akselGruppe?.[1]?.akselListe?.aksel?.[0],
  );

  return {
    oversikt: { kjoretoy, generelt, karosseri, tekniskGodkjenning },
    motorOgYtelse: { motor, motorOgDrivverk, miljodata, miljoGruppe, forbruk },
    malOgVekt: { dimensjoner, vekter, persontall, karosseri },
    teknisk: {
      akslinger,
      dekkForan,
      dekkBak,
      akselForan,
      akselBak,
      tilhengerkopling,
    },
  };
}
