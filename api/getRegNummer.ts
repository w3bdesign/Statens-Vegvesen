import axios from "axios";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { safe } from "./utils/sanitize";
import {
  buildOversikt,
  buildMotorOgYtelse,
  buildMalOgVekt,
  buildTeknisk,
} from "./utils/vehicleDataBuilders";
import type {
  IStatensVegvesenFullData,
  IVehicleData,
} from "../scripts/types/typeDefinitions";

// https://autosys-kjoretoy-api.atlas.vegvesen.no/api-ui/index-enkeltoppslag.html

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  const { regNummer = "" } = req.query;

  if (!regNummer) {
    res.status(400).json({ error: "Mangler regNummer parameter" });
    return;
  }

  const urlToFetch = `https://www.vegvesen.no/ws/no/vegvesen/kjoretoy/felles/datautlevering/enkeltoppslag/kjoretoydata?kjennemerke=${regNummer}`;

  try {
    const response = await axios.get<IStatensVegvesenFullData>(urlToFetch, {
      headers: {
        "SVV-Authorization": `Apikey ${process.env.SVV_API_KEY}`,
        "X-Client-Identifier": "my-app",
      },
    });

    if (response.status === 200) {
      const kjoretoy = response.data?.kjoretoydataListe?.[0];

      if (!kjoretoy) {
        res.status(404).json({
          melding: "Ingen data funnet for dette registreringsnummeret",
        });
        return;
      }

      // Extract nested data safely
      const tekniskGodkjenning = safe(
        () => kjoretoy.godkjenning.tekniskGodkjenning,
      );
      const tekniskeData = safe(() => tekniskGodkjenning?.tekniskeData);
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

      // Build the structured response
      const vehicleData: IVehicleData = {
        oversikt: buildOversikt(
          kjoretoy,
          generelt,
          karosseri,
          tekniskGodkjenning,
        ),
        motorOgYtelse: buildMotorOgYtelse(
          motor,
          motorOgDrivverk,
          miljodata,
          miljoGruppe,
          forbruk,
        ),
        malOgVekt: buildMalOgVekt(dimensjoner, vekter, persontall, karosseri),
        teknisk: buildTeknisk(
          akslinger,
          dekkForan,
          dekkBak,
          akselForan,
          akselBak,
          tilhengerkopling,
        ),
      };

      res.status(200).json(vehicleData);
    } else {
      res
        .status(500)
        .json({ error: `Feil under henting av data - ${response}` });
    }
  } catch (error) {
    res.status(500).json({ error: `Feil under henting av data - ${error}` });
  }
}
