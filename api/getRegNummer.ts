//import fetch from "node-fetch";
import axios from "axios";

import { sanitize } from "isomorphic-dompurify";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default function getRegNummer(
  req: VercelRequest,
  res: VercelResponse
): void {
  const { regNummer = "" } = req.query;
  const urlToFetch = `https://www.vegvesen.no/ws/no/vegvesen/kjoretoy/kjoretoyoppslag/v1/kjennemerkeoppslag/kjoretoy/${regNummer}`;
  if (regNummer !== undefined) {
    axios.get(urlToFetch).then((response:any) => {
      console.log(response);
      res.send("Hi")
    });



    /*
    axios.get<any>(urlToFetch)
      .then((response) => response.json())
      .then(
        ({
          kjennemerke,
          registrering: {
            forstegangsregistrering,
            forstegangsregistreringEier,
          },
          periodiskKjoretoykontroll: { sistKontrollert },
        }) => {
          const sanitizedData = {
            kjennemerke: sanitize(kjennemerke),
            forstegangsregistreringEier: sanitize(forstegangsregistreringEier),
            forstegangsregistrering: sanitize(forstegangsregistrering),
            sistKontrollert: sanitize(sistKontrollert),
          };
          res.send(sanitizedData);
        }
      )
      .catch(() => {
        return;
      });*/
  }
}
