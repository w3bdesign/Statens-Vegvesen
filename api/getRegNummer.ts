import fetch from "node-fetch";
import DOMPurify from "isomorphic-dompurify";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default function getRegNummer(
  req: VercelRequest,
  res: VercelResponse
): void {
  const { regNummer = "" } = req.query;
  const urlToFetch = `https://www.vegvesen.no/ws/no/vegvesen/kjoretoy/kjoretoyoppslag/v1/kjennemerkeoppslag/kjoretoy/${regNummer}`;
  if (regNummer !== undefined) {
    fetch(urlToFetch)
      .then((response) => response.json())
      //.then((data: VercelResponse) => {
      .then(({ kjennemerke, forstegangsregistreringEier, sistKontrollert }) => {
        /*     classProcessInputForm.setInnerHTML(
      "kjennemerke",
      this.remoteBilData.kjennemerke
    );
    classProcessInputForm.setInnerHTML(
      "forstegangsregistrering",
      this.remoteBilData.registrering.kjennemerke
    );
    classProcessInputForm.setInnerHTML(
      "forstegangsregistreringEier",
      this.remoteBilData.registrering.forstegangsregistreringEier
    );
    classProcessInputForm.setInnerHTML(
      "sistKontrollert",
      this.remoteBilData.periodiskKjoretoykontroll.sistKontrollert
    );*/

        const test = [
          {
            kjennemerke,
            forstegangsregistreringEier,
            sistKontrollert,
          },
        ];

        console.log(kjennemerke);
        console.log(forstegangsregistreringEier);
        console.log(sistKontrollert);

        // const sanitizedData = DOMPurify.sanitize(data);

        //console.log("Old data: ", data);
        //console.log("sanitizedData: ", sanitizedData);
        //res.send(data);
      })
      .catch(() => {
        return;
      });
  }
}
