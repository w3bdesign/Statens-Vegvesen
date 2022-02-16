import fetch from "node-fetch";
import { VercelRequest, VercelResponse } from "@vercel/node";

import escapeHtml from "../scripts/utils/escapeHtml";

export default function getRegNummer(req: VercelRequest, res: VercelResponse) {
  const { regNummer = "" } = req.query;
  const urlToFetch = `https://www.vegvesen.no/ws/no/vegvesen/kjoretoy/kjoretoyoppslag/v1/kjennemerkeoppslag/kjoretoy/${regNummer}`;
  if (regNummer !== undefined) {
    fetch(urlToFetch)
      .then((response) => response.json())
      .then((data: any) => {
        escapeHtml(res.send(data));
      })
      .catch((error) => res.send(error));
  }
}
