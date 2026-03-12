import axios from "axios";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { buildVehicleData } from "../lib/buildVehicleData";
import type { IStatensVegvesenFullData } from "../scripts/types/typeDefinitions";

// https://autosys-kjoretoy-api.atlas.vegvesen.no/api-ui/index-enkeltoppslag.html

const SVV_BASE_URL =
  "https://www.vegvesen.no/ws/no/vegvesen/kjoretoy/felles/datautlevering/enkeltoppslag/kjoretoydata";

/** Fetch vehicle data from the Statens Vegvesen API */
async function fetchVehicle(regNummer: string) {
  return axios.get<IStatensVegvesenFullData>(
    `${SVV_BASE_URL}?kjennemerke=${regNummer}`,
    {
      headers: {
        "SVV-Authorization": `Apikey ${process.env.SVV_API_KEY}`,
        "X-Client-Identifier": "my-app",
      },
    },
  );
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  const { regNummer = "" } = req.query;

  if (!regNummer) {
    res.status(400).json({ error: "Mangler regNummer parameter" });
    return;
  }

  try {
    const response = await fetchVehicle(String(regNummer));

    if (response.status !== 200) {
      res
        .status(500)
        .json({ error: `Feil under henting av data - ${response}` });
      return;
    }

    const kjoretoy = response.data?.kjoretoydataListe?.[0];

    if (!kjoretoy) {
      res.status(404).json({
        melding: "Ingen data funnet for dette registreringsnummeret",
      });
      return;
    }

    res.status(200).json(buildVehicleData(kjoretoy));
  } catch (error) {
    res.status(500).json({ error: `Feil under henting av data - ${error}` });
  }
}
