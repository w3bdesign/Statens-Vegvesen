import axios from "axios";
import { sanitize } from "isomorphic-dompurify";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { IStatensVegvesenFullData } from "../scripts/types/typeDefinitions";

export default async function getRegNummer(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  const { regNummer = "" } = req.query;

  if (regNummer === undefined) {
    res.send({ error: "Mangler regNummer parameter" });
    return;
  }

  const urlToFetch = `https://www.vegvesen.no/ws/no/vegvesen/kjoretoy/kjoretoyoppslag/v1/kjennemerkeoppslag/kjoretoy/${regNummer}`;

  try {
    const response = await axios.get<IStatensVegvesenFullData>(urlToFetch);

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

      res.send(sanitizedData);
    } else {
      res.send({ error: "Feil under henting av data" });
    }
  } catch (error) {
    console.error(error);
    res.send({ error: "Feil under henting av data" });
  }
}
