import fetch from "node-fetch";
import DOMPurify from 'isomorphic-dompurify';
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
      .then((data: VercelResponse) => {
        const sanitizedData = DOMPurify.sanitize(data);

        console.log("Old data: ", data)
        console.log("sanitizedData: ", sanitizedData)
        res.send(sanitizedData);
      })
      .catch(() => {
        return;
      });
  }
}
