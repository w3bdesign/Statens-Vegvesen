import axios from "axios";
import { sanitize } from "isomorphic-dompurify";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { IStatensVegvesenFullData } from "../scripts/types/typeDefinitions";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  const { regNummer = "" } = req.query;

  if (regNummer === undefined) {
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

    console.log("Response er: ", response);

    if (response.status === 200) {
      const {
        kjennemerke,
        registrering: { forstegangsregistrering, forstegangsregistreringEier },
        periodiskKjoretoykontroll: { sistKontrollert },
      } = response.data;

      const sanitizedData = {
        kjennemerke: sanitize(kjennemerke),
        forstegangsregistreringEier: sanitize(forstegangsregistreringEier),
        forstegangsregistrering: sanitize(forstegangsregistrering),
        sistKontrollert: sanitize(sistKontrollert),
      };

      res.status(200).json(sanitizedData);
    } else {
      res.status(500).json({ error: "Feil under henting av data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Feil under henting av data" });
  }
}
