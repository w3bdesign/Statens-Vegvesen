import { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

export default function getRegNummer(req: VercelRequest, res: VercelResponse) {
  const { regNummer = '' } = req.query;
  const urlToFetch = `https://www.vegvesen.no/ws/no/vegvesen/kjoretoy/kjoretoyoppslag/v1/kjennemerkeoppslag/kjoretoy/${regNummer}`;
  if (regNummer !== undefined) {
    fetch(urlToFetch)
      .then((response) => response.json())
      .then((data) => {
        res.send(data);
      })
      .catch((error) => res.send(error));
  }
}
