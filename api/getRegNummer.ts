import axios from "axios";
import { sanitize } from "isomorphic-dompurify";
import { VercelRequest, VercelResponse } from "@vercel/node";
import type {
  IStatensVegvesenFullData,
  IVehicleData,
} from "../scripts/types/typeDefinitions";

// https://autosys-kjoretoy-api.atlas.vegvesen.no/api-ui/index-enkeltoppslag.html

/** Safely access deeply nested properties, returning null if any part is missing */

function safe<T>(fn: () => T): T | null {
  try {
    const result = fn();
    return result === undefined ? null : result;
  } catch {
    return null;
  }
}

/** Sanitize a string value, or return null */
function sanitizeStr(val: string | null | undefined): string | null {
  if (val === null || val === undefined) return null;
  return sanitize(String(val));
}

/** Sanitize a number value, or return null */
function sanitizeNum(val: number | null | undefined): number | null {
  if (val === null || val === undefined || isNaN(Number(val))) return null;
  return Number(val);
}

/** Sanitize a boolean value, or return null */
function sanitizeBool(val: boolean | null | undefined): boolean | null {
  if (val === null || val === undefined) return null;
  return Boolean(val);
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
        res
          .status(404)
          .json({
            melding: "Ingen data funnet for dette registreringsnummeret",
          });
        return;
      }

      const tekniskGodkjenning = safe(
        () => kjoretoy.godkjenning.tekniskGodkjenning,
      );
      const tekniskeData = safe(() => tekniskGodkjenning!.tekniskeData);
      const generelt = safe(() => tekniskeData!.generelt);
      const motorOgDrivverk = safe(() => tekniskeData!.motorOgDrivverk);
      const miljodata = safe(() => tekniskeData!.miljodata);
      const dimensjoner = safe(() => tekniskeData!.dimensjoner);
      const vekter = safe(() => tekniskeData!.vekter);
      const persontall = safe(() => tekniskeData!.persontall);
      const karosseri = safe(() => tekniskeData!.karosseriOgLasteplan);
      const akslinger = safe(() => tekniskeData!.akslinger);
      const dekkOgFelg = safe(() => tekniskeData!.dekkOgFelg);
      const tilhengerkopling = safe(() => tekniskeData!.tilhengerkopling);

      const motor = safe(() => motorOgDrivverk!.motor?.[0]);
      const miljoGruppe = safe(() => miljodata!.miljoOgdrivstoffGruppe?.[0]);
      const forbruk = safe(() => miljoGruppe!.forbrukOgUtslipp?.[0]);
      const dekkKomb = safe(() => dekkOgFelg!.akselDekkOgFelgKombinasjon?.[0]);
      const dekkForan = safe(() => dekkKomb!.akselDekkOgFelg?.[0]);
      const dekkBak = safe(() => dekkKomb!.akselDekkOgFelg?.[1]);
      const akselForan = safe(
        () => akslinger!.akselGruppe?.[0]?.akselListe?.aksel?.[0],
      );
      const akselBak = safe(
        () => akslinger!.akselGruppe?.[1]?.akselListe?.aksel?.[0],
      );

      const vehicleData: IVehicleData = {
        oversikt: {
          kjennemerke: sanitizeStr(safe(() => kjoretoy.kjoretoyId.kjennemerke)),
          understellsnummer: sanitizeStr(
            safe(() => kjoretoy.kjoretoyId.understellsnummer),
          ),
          merke: sanitizeStr(safe(() => generelt!.merke?.[0]?.merke)),
          modell: sanitizeStr(safe(() => generelt!.handelsbetegnelse?.[0])),
          typebetegnelse: sanitizeStr(safe(() => generelt!.typebetegnelse)),
          farge: sanitizeStr(
            safe(
              () =>
                karosseri!.rFarge?.[0]?.kodeBeskrivelse ||
                karosseri!.rFarge?.[0]?.kodeNavn,
            ),
          ),
          kjoretoyKlasse: sanitizeStr(
            safe(() => tekniskGodkjenning!.kjoretoyklassifisering?.beskrivelse),
          ),
          forstegangsregistrering: sanitizeStr(
            safe(
              () =>
                kjoretoy.forstegangsregistrering?.registrertForstegangNorgeDato,
            ),
          ),
          registreringsstatus: sanitizeStr(
            safe(
              () =>
                kjoretoy.registrering?.registreringsstatus?.kodeBeskrivelse ||
                kjoretoy.registrering?.registreringsstatus?.kodeNavn,
            ),
          ),
          kjoringensArt: sanitizeStr(
            safe(
              () =>
                kjoretoy.registrering?.kjoringensArt?.kodeBeskrivelse ||
                kjoretoy.registrering?.kjoringensArt?.kodeNavn,
            ),
          ),
          nesteEuKontroll: sanitizeStr(
            safe(() => kjoretoy.periodiskKjoretoyKontroll?.kontrollfrist),
          ),
          sistGodkjentEuKontroll: sanitizeStr(
            safe(() => kjoretoy.periodiskKjoretoyKontroll?.sistGodkjent),
          ),
        },
        motorOgYtelse: {
          drivstofftype: sanitizeStr(
            safe(
              () =>
                miljoGruppe!.drivstoffKodeMiljodata?.kodeBeskrivelse ||
                miljoGruppe!.drivstoffKodeMiljodata?.kodeNavn,
            ),
          ),
          motoreffektKw: sanitizeNum(
            safe(() => motor!.drivstoff?.[0]?.maksNettoEffekt),
          ),
          slagvolumCc: sanitizeNum(safe(() => motor!.slagvolum)),
          antallSylindre: sanitizeNum(safe(() => motor!.antallSylindre)),
          girkassetype: sanitizeStr(
            safe(
              () =>
                motorOgDrivverk!.girkassetype?.kodeBeskrivelse ||
                motorOgDrivverk!.girkassetype?.kodeNavn,
            ),
          ),
          antallGir: sanitizeNum(safe(() => motorOgDrivverk!.antallGir)),
          hybridKategori: sanitizeStr(
            safe(
              () =>
                motorOgDrivverk!.hybridKategori?.kodeBeskrivelse ||
                motorOgDrivverk!.hybridKategori?.kodeNavn,
            ),
          ),
          maksHastighetKmT: sanitizeNum(
            safe(() => motorOgDrivverk!.maksimumHastighet?.[0]),
          ),
          euroKlasse: sanitizeStr(
            safe(
              () =>
                miljodata!.euroKlasse?.kodeBeskrivelse ||
                miljodata!.euroKlasse?.kodeNavn,
            ),
          ),
          co2BlandetKjoring: sanitizeNum(
            safe(() => forbruk!.co2BlandetKjoring),
          ),
          forbrukBlandetKjoring: sanitizeNum(
            safe(() => forbruk!.forbrukBlandetKjoring),
          ),
          noxUtslippMgKm: sanitizeNum(safe(() => forbruk!.utslippNOxMgPrKm)),
          partikkelfilter: sanitizeBool(
            safe(() => forbruk!.partikkelfilterFabrikkmontert),
          ),
          rekkeviddeKm: sanitizeNum(safe(() => forbruk!.rekkeviddeKm)),
          stoynivaaDb: sanitizeNum(safe(() => miljoGruppe!.lyd?.standstoy)),
        },
        malOgVekt: {
          lengdeMm: sanitizeNum(safe(() => dimensjoner!.lengde)),
          breddeMm: sanitizeNum(safe(() => dimensjoner!.bredde)),
          hoydeMm: sanitizeNum(safe(() => dimensjoner!.hoyde)),
          egenvektKg: sanitizeNum(safe(() => vekter!.egenvekt)),
          nyttelastKg: sanitizeNum(safe(() => vekter!.nyttelast)),
          tillattTotalvektKg: sanitizeNum(safe(() => vekter!.tillattTotalvekt)),
          tillattTaklastKg: sanitizeNum(safe(() => vekter!.tillattTaklast)),
          tillattTilhengervektMedBremsKg: sanitizeNum(
            safe(() => vekter!.tillattTilhengervektMedBrems),
          ),
          tillattTilhengervektUtenBremsKg: sanitizeNum(
            safe(() => vekter!.tillattTilhengervektUtenBrems),
          ),
          tillattVogntogvektKg: sanitizeNum(
            safe(() => vekter!.tillattVogntogvekt),
          ),
          sitteplasserTotalt: sanitizeNum(
            safe(() => persontall!.sitteplasserTotalt),
          ),
          sitteplasserForan: sanitizeNum(
            safe(() => persontall!.sitteplasserForan),
          ),
          antallDorer: sanitizeNum(safe(() => karosseri!.antallDorer?.[0])),
          kjoreSide: sanitizeStr(safe(() => karosseri!.kjoringSide)),
        },
        teknisk: {
          antallAksler: sanitizeNum(safe(() => akslinger!.antallAksler)),
          dekkdimensjonForan: sanitizeStr(safe(() => dekkForan!.dekkdimensjon)),
          felgdimensjonForan: sanitizeStr(safe(() => dekkForan!.felgdimensjon)),
          hastighetsKodeDekkForan: sanitizeStr(
            safe(() => dekkForan!.hastighetskodeDekk),
          ),
          dekkdimensjonBak: sanitizeStr(safe(() => dekkBak!.dekkdimensjon)),
          felgdimensjonBak: sanitizeStr(safe(() => dekkBak!.felgdimensjon)),
          hastighetsKodeDekkBak: sanitizeStr(
            safe(() => dekkBak!.hastighetskodeDekk),
          ),
          sporviddeFoyanMm: sanitizeNum(safe(() => akselForan!.sporvidde)),
          sporviddeBakMm: sanitizeNum(safe(() => akselBak!.sporvidde)),
          tilhengerkopling: sanitizeStr(
            safe(() => {
              const kop = tilhengerkopling!.kopling?.[0];
              if (!kop) return null;
              return (
                kop.koplingBeskrivelse ||
                kop.koplingType?.kodeBeskrivelse ||
                kop.koplingType?.kodeNavn ||
                null
              );
            }),
          ),
        },
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
