import { safe, sanitizeStr, sanitizeNum, sanitizeBool, sanitizeKode } from "./sanitize";
import type {
  IOversikt,
  IMotorOgYtelse,
  IMalOgVekt,
  ITeknisk,
  KjoretoydataListe,
  TekniskGodkjenning,
  Generelt,
  KarosseriOgLasteplan,
  Motor,
  MotorOgDrivverk,
  Miljodata,
  MiljoOgdrivstoffGruppe,
  ForbrukOgUtslipp,
  Dimensjoner,
  Vekter,
  Persontall,
  Akslinger,
  AkselDekkOgFelg,
  Aksel,
  Tilhengerkopling,
} from "../../scripts/types/typeDefinitions";

/** Build the Oversikt section of the vehicle data response */
export function buildOversikt(
  kjoretoy: KjoretoydataListe,
  generelt: Generelt | null,
  karosseri: KarosseriOgLasteplan | null,
  tekniskGodkjenning: TekniskGodkjenning | null,
): IOversikt {
  return {
    kjennemerke: sanitizeStr(safe(() => kjoretoy.kjoretoyId.kjennemerke)),
    understellsnummer: sanitizeStr(
      safe(() => kjoretoy.kjoretoyId.understellsnummer),
    ),
    merke: sanitizeStr(safe(() => generelt?.merke?.[0]?.merke)),
    modell: sanitizeStr(safe(() => generelt?.handelsbetegnelse?.[0])),
    typebetegnelse: sanitizeStr(safe(() => generelt?.typebetegnelse)),
    farge: sanitizeKode(safe(() => karosseri?.rFarge?.[0])),
    kjoretoyKlasse: sanitizeStr(
      safe(() => tekniskGodkjenning?.kjoretoyklassifisering?.beskrivelse),
    ),
    forstegangsregistrering: sanitizeStr(
      safe(
        () => kjoretoy.forstegangsregistrering?.registrertForstegangNorgeDato,
      ),
    ),
    registreringsstatus: sanitizeKode(
      safe(() => kjoretoy.registrering?.registreringsstatus),
    ),
    kjoringensArt: sanitizeKode(
      safe(() => kjoretoy.registrering?.kjoringensArt),
    ),
    nesteEuKontroll: sanitizeStr(
      safe(() => kjoretoy.periodiskKjoretoyKontroll?.kontrollfrist),
    ),
    sistGodkjentEuKontroll: sanitizeStr(
      safe(() => kjoretoy.periodiskKjoretoyKontroll?.sistGodkjent),
    ),
  };
}

/** Build the Motor & Ytelse section of the vehicle data response */
export function buildMotorOgYtelse(
  motor: Motor | null,
  motorOgDrivverk: MotorOgDrivverk | null,
  miljodata: Miljodata | null,
  miljoGruppe: MiljoOgdrivstoffGruppe | null,
  forbruk: ForbrukOgUtslipp | null,
): IMotorOgYtelse {
  return {
    drivstofftype: sanitizeKode(
      safe(() => miljoGruppe?.drivstoffKodeMiljodata),
    ),
    motoreffektKw: sanitizeNum(
      safe(() => motor?.drivstoff?.[0]?.maksNettoEffekt),
    ),
    slagvolumCc: sanitizeNum(safe(() => motor?.slagvolum)),
    antallSylindre: sanitizeNum(safe(() => motor?.antallSylindre)),
    girkassetype: sanitizeKode(safe(() => motorOgDrivverk?.girkassetype)),
    antallGir: sanitizeNum(safe(() => motorOgDrivverk?.antallGir)),
    hybridKategori: sanitizeKode(safe(() => motorOgDrivverk?.hybridKategori)),
    maksHastighetKmT: sanitizeNum(
      safe(() => motorOgDrivverk?.maksimumHastighet?.[0]),
    ),
    euroKlasse: sanitizeKode(safe(() => miljodata?.euroKlasse)),
    co2BlandetKjoring: sanitizeNum(safe(() => forbruk?.co2BlandetKjoring)),
    forbrukBlandetKjoring: sanitizeNum(
      safe(() => forbruk?.forbrukBlandetKjoring),
    ),
    noxUtslippMgKm: sanitizeNum(safe(() => forbruk?.utslippNOxMgPrKm)),
    partikkelfilter: sanitizeBool(
      safe(() => forbruk?.partikkelfilterFabrikkmontert),
    ),
    rekkeviddeKm: sanitizeNum(safe(() => forbruk?.rekkeviddeKm)),
    stoynivaaDb: sanitizeNum(safe(() => miljoGruppe?.lyd?.standstoy)),
  };
}

/** Build the Mål & Vekt section of the vehicle data response */
export function buildMalOgVekt(
  dimensjoner: Dimensjoner | null,
  vekter: Vekter | null,
  persontall: Persontall | null,
  karosseri: KarosseriOgLasteplan | null,
): IMalOgVekt {
  return {
    lengdeMm: sanitizeNum(safe(() => dimensjoner?.lengde)),
    breddeMm: sanitizeNum(safe(() => dimensjoner?.bredde)),
    hoydeMm: sanitizeNum(safe(() => dimensjoner?.hoyde)),
    egenvektKg: sanitizeNum(safe(() => vekter?.egenvekt)),
    nyttelastKg: sanitizeNum(safe(() => vekter?.nyttelast)),
    tillattTotalvektKg: sanitizeNum(safe(() => vekter?.tillattTotalvekt)),
    tillattTaklastKg: sanitizeNum(safe(() => vekter?.tillattTaklast)),
    tillattTilhengervektMedBremsKg: sanitizeNum(
      safe(() => vekter?.tillattTilhengervektMedBrems),
    ),
    tillattTilhengervektUtenBremsKg: sanitizeNum(
      safe(() => vekter?.tillattTilhengervektUtenBrems),
    ),
    tillattVogntogvektKg: sanitizeNum(safe(() => vekter?.tillattVogntogvekt)),
    sitteplasserTotalt: sanitizeNum(safe(() => persontall?.sitteplasserTotalt)),
    sitteplasserForan: sanitizeNum(safe(() => persontall?.sitteplasserForan)),
    antallDorer: sanitizeNum(safe(() => karosseri?.antallDorer?.[0])),
    kjoreSide: sanitizeStr(safe(() => karosseri?.kjoringSide)),
  };
}

/** Build the Teknisk section of the vehicle data response */
export function buildTeknisk(
  akslinger: Akslinger | null,
  dekkForan: AkselDekkOgFelg | null,
  dekkBak: AkselDekkOgFelg | null,
  akselForan: Aksel | null,
  akselBak: Aksel | null,
  tilhengerkopling: Tilhengerkopling | null,
): ITeknisk {
  return {
    antallAksler: sanitizeNum(safe(() => akslinger?.antallAksler)),
    dekkdimensjonForan: sanitizeStr(safe(() => dekkForan?.dekkdimensjon)),
    felgdimensjonForan: sanitizeStr(safe(() => dekkForan?.felgdimensjon)),
    hastighetsKodeDekkForan: sanitizeStr(
      safe(() => dekkForan?.hastighetskodeDekk),
    ),
    dekkdimensjonBak: sanitizeStr(safe(() => dekkBak?.dekkdimensjon)),
    felgdimensjonBak: sanitizeStr(safe(() => dekkBak?.felgdimensjon)),
    hastighetsKodeDekkBak: sanitizeStr(
      safe(() => dekkBak?.hastighetskodeDekk),
    ),
    sporviddeFoyanMm: sanitizeNum(safe(() => akselForan?.sporvidde)),
    sporviddeBakMm: sanitizeNum(safe(() => akselBak?.sporvidde)),
    tilhengerkopling: sanitizeStr(
      safe(() => {
        const kop = tilhengerkopling?.kopling?.[0];
        if (!kop) return null;
        return (
          kop.koplingBeskrivelse ||
          kop.koplingType?.kodeBeskrivelse ||
          kop.koplingType?.kodeNavn ||
          null
        );
      }),
    ),
  };
}
