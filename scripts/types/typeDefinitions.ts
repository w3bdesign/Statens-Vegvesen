/**
 * Type definitions for data returned from the Statens Vegvesen API.
 *
 * IStatensVegvesenFullData — raw API response shape
 * IStatensVegvesenBilData — simplified frontend response (from our serverless function)
 * IVehicleData — expanded 4-section response for the new tabbed UI
 */

// ─── Frontend response types (returned by our /api/getRegNummer endpoint) ────

/** Legacy simplified response for backwards compatibility / error handling */
export interface IStatensVegvesenBilData {
  kjennemerke: string;
  forstegangsregistrering: string;
  forstegangsregistreringEier: string;
  sistKontrollert: string;
  melding: string;
}

/** Expanded 4-tab vehicle data returned by the updated API endpoint */
export interface IVehicleData {
  oversikt: IOversikt;
  motorOgYtelse: IMotorOgYtelse;
  malOgVekt: IMalOgVekt;
  teknisk: ITeknisk;
  melding?: string;
}

export interface IOversikt {
  kjennemerke: string | null;
  understellsnummer: string | null;
  merke: string | null;
  modell: string | null;
  typebetegnelse: string | null;
  farge: string | null;
  kjoretoyKlasse: string | null;
  forstegangsregistrering: string | null;
  registreringsstatus: string | null;
  kjoringensArt: string | null;
  nesteEuKontroll: string | null;
  sistGodkjentEuKontroll: string | null;
}

export interface IMotorOgYtelse {
  drivstofftype: string | null;
  motoreffektKw: number | null;
  slagvolumCc: number | null;
  antallSylindre: number | null;
  girkassetype: string | null;
  antallGir: number | null;
  hybridKategori: string | null;
  maksHastighetKmT: number | null;
  euroKlasse: string | null;
  co2BlandetKjoring: number | null;
  forbrukBlandetKjoring: number | null;
  noxUtslippMgKm: number | null;
  partikkelfilter: boolean | null;
  rekkeviddeKm: number | null;
  stoynivaaDb: number | null;
}

export interface IMalOgVekt {
  lengdeMm: number | null;
  breddeMm: number | null;
  hoydeMm: number | null;
  egenvektKg: number | null;
  nyttelastKg: number | null;
  tillattTotalvektKg: number | null;
  tillattTaklastKg: number | null;
  tillattTilhengervektMedBremsKg: number | null;
  tillattTilhengervektUtenBremsKg: number | null;
  tillattVogntogvektKg: number | null;
  sitteplasserTotalt: number | null;
  sitteplasserForan: number | null;
  antallDorer: number | null;
  kjoreSide: string | null;
}

export interface ITeknisk {
  antallAksler: number | null;
  dekkdimensjonForan: string | null;
  felgdimensjonForan: string | null;
  hastighetsKodeDekkForan: string | null;
  dekkdimensjonBak: string | null;
  felgdimensjonBak: string | null;
  hastighetsKodeDekkBak: string | null;
  sporviddeFoyanMm: number | null;
  sporviddeBakMm: number | null;
  tilhengerkopling: string | null;
}

// ─── Raw API response types (from vegvesen.no) ──────────────────────────────

export interface IStatensVegvesenFullData {
  kjoretoydataListe: KjoretoydataListe[];
}

export interface KjoretoydataListe {
  kjoretoyId: KjoretoyID;
  forstegangsregistrering: Forstegangsregistrering;
  kjennemerke: Kjennemerke[];
  registrering: Registrering;
  godkjenning: Godkjenning;
  periodiskKjoretoyKontroll: PeriodiskKjoretoyKontroll;
}

export interface Forstegangsregistrering {
  registrertForstegangNorgeDato: string;
}

export interface Godkjenning {
  forstegangsGodkjenning: ForstegangsGodkjenning;
  kjoretoymerknad: Kjoretoymerknad[];
  registreringsbegrensninger: Registreringsbegrensninger;
  tekniskGodkjenning: TekniskGodkjenning;
  tilleggsgodkjenninger: string[];
}

export interface ForstegangsGodkjenning {
  forstegangRegistrertDato: Date;
  godkjenningsId: string;
  godkjenningsundertype: KjoringensArt;
  gyldigFraDato: Date;
  gyldigFraDatoTid: Date;
  kvalitetskodeForstegangRegDato: KjoringensArt;
  unntak: string[];
}

export interface KjoringensArt {
  kodeNavn?: string;
  kodeVerdi: string;
  tidligereKodeVerdi: string[];
  kodeBeskrivelse?: string;
  kodeTypeId?: string;
}

export interface Kjoretoymerknad {
  merknad: string;
  merknadtypeKode: string;
}

export interface Registreringsbegrensninger {
  registreringsbegrensning: string[];
}

export interface TekniskGodkjenning {
  godkjenningsId: string;
  godkjenningsundertype: KjoringensArt;
  gyldigFraDato: Date;
  gyldigFraDatoTid: Date;
  kjoretoyklassifisering: Kjoretoyklassifisering;
  krav: Krav[];
  tekniskeData: TekniskeData;
  unntak: string[];
}

export interface Kjoretoyklassifisering {
  beskrivelse: string;
  efTypegodkjenning: EfTypegodkjenning;
  kjoretoyAvgiftsKode: KjoringensArt;
  nasjonalGodkjenning: NasjonalGodkjenning;
  spesielleKjennetegn: string;
  tekniskKode: KjoringensArt;
  tekniskUnderkode: TekniskUnderkode;
  iSamsvarMedTypegodkjenning: boolean;
}

export interface EfTypegodkjenning {
  typegodkjenningNrTekst: string;
  typegodkjenningnummer: Typegodkjenningnummer;
  variant: string;
}

export interface Typegodkjenningnummer {
  direktiv: string;
  land: string;
  serie: string;
  utvidelse: string;
}

export interface NasjonalGodkjenning {
  nasjonaltGodkjenningsAr: string;
  nasjonaltGodkjenningsHovednummer: string;
  nasjonaltGodkjenningsUndernummer: string;
}

export interface TekniskUnderkode {
  kodeVerdi: string;
  tidligereKodeVerdi: string[];
}

export interface Krav {
  kravomrade: KjoringensArt;
  kravoppfyllelse: KjoringensArt;
}

export interface TekniskeData {
  akslinger: Akslinger;
  bremser: Bremser;
  dekkOgFelg: DekkOgFelg;
  dimensjoner: Dimensjoner;
  generelt: Generelt;
  karosseriOgLasteplan: KarosseriOgLasteplan;
  miljodata: Miljodata;
  motorOgDrivverk: MotorOgDrivverk;
  ovrigeTekniskeData: string[];
  persontall: Persontall;
  tilhengerkopling: Tilhengerkopling;
  vekter: Vekter;
}

export interface Akslinger {
  akselGruppe: AkselGruppe[];
  antallAksler: number;
}

export interface AkselGruppe {
  akselListe: AkselListe;
  egenvektAkselGruppe: number;
  id: number;
  plasseringAkselGruppe: string;
  tekniskTillattAkselGruppeLast: number;
}

export interface AkselListe {
  aksel: Aksel[];
}

export interface Aksel {
  avstandTilNesteAksling?: number;
  drivAksel: boolean;
  egenvektAksel: number;
  id: number;
  plasseringAksel: string;
  sporvidde: number;
  tekniskTillattAkselLast: number;
}

export interface Bremser {
  tilhengerBremseforbindelse: string[];
}

export interface DekkOgFelg {
  akselDekkOgFelgKombinasjon: AkselDekkOgFelgKombinasjon[];
}

export interface AkselDekkOgFelgKombinasjon {
  akselDekkOgFelg: AkselDekkOgFelg[];
}

export interface AkselDekkOgFelg {
  akselId: number;
  belastningskodeDekk: string;
  dekkdimensjon: string;
  felgdimensjon: string;
  hastighetskodeDekk: string;
  innpress: string;
}

export interface Dimensjoner {
  bredde: number;
  hoyde: number;
  lengde: number;
}

export interface Generelt {
  fabrikant: string[];
  handelsbetegnelse: string[];
  merke: Merke[];
  tekniskKode: KjoringensArt;
  typebetegnelse: string;
}

export interface Merke {
  merke: string;
  merkeKode: string;
}

export interface KarosseriOgLasteplan {
  antallDorer: number[];
  dorUtforming: string[];
  kjennemerketypeBak: KjoringensArt;
  kjennemerkestorrelseBak: KjoringensArt;
  kjennemerketypeForan: KjoringensArt;
  kjennemerkestorrelseForan: KjoringensArt;
  kjoringSide: string;
  oppbygningUnderstellsnummer: string;
  plasseringFabrikasjonsplate: KjoringensArt[];
  plasseringUnderstellsnummer: KjoringensArt[];
  rFarge: KjoringensArt[];
}

export interface Miljodata {
  euroKlasse: KjoringensArt;
  miljoOgdrivstoffGruppe: MiljoOgdrivstoffGruppe[];
  okoInnovasjon: boolean;
}

export interface MiljoOgdrivstoffGruppe {
  drivstoffKodeMiljodata: KjoringensArt;
  forbrukOgUtslipp: ForbrukOgUtslipp[];
  lyd: Lyd;
}

export interface ForbrukOgUtslipp {
  co2BlandetKjoring: number;
  co2Bykjoring: number;
  co2Landeveiskjoring: number;
  forbrukBlandetKjoring: number;
  forbrukBykjoring: number;
  forbrukLandeveiskjoring: number;
  utslippNOxMgPrKm: number;
  partikkelfilterFabrikkmontert: boolean;
  rekkeviddeKm: number;
  elEnergiforbruk: number;
  malemetode: KjoringensArt;
}

export interface Lyd {
  standstoy: number;
  stoyMalingOppgittAv: KjoringensArt;
  vedAntallOmdreininger: number;
}

export interface MotorOgDrivverk {
  antallGir: number;
  girkassetype: KjoringensArt;
  girutvekslingPrGir: string[];
  hybridKategori: KjoringensArt;
  maksimumHastighet: number[];
  maksimumHastighetMalt: string[];
  motor: Motor[];
}

export interface Motor {
  antallSylindre: number;
  drivstoff: Drivstoff[];
  motorKode: string;
  slagvolum: number;
}

export interface Drivstoff {
  drivstoffKode: KjoringensArt;
  maksNettoEffekt: number;
}

export interface Persontall {
  sitteplasserForan: number;
  sitteplasserTotalt: number;
}

export interface Tilhengerkopling {
  kopling: Kopling[];
}

export interface Kopling {
  koplingType?: KjoringensArt;
  koplingBeskrivelse?: string;
}

export interface Vekter {
  egenvekt: number;
  egenvektMinimum: number;
  nyttelast: number;
  tillattTaklast: number;
  tillattTilhengervektMedBrems: number;
  tillattTilhengervektUtenBrems: number;
  tillattTotalvekt: number;
  tillattVertikalKoplingslast: number;
  tillattVogntogvekt: number;
  vogntogvektAvhBremsesystem: string[];
}

export interface Kjennemerke {
  fomTidspunkt: Date;
  kjennemerke: string;
  kjennemerkekategori: string;
  kjennemerketype: KjoringensArt;
}

export interface KjoretoyID {
  kjennemerke: string;
  understellsnummer: string;
}

export interface PeriodiskKjoretoyKontroll {
  kontrollfrist: string;
  sistGodkjent: string;
}

export interface Registrering {
  fomTidspunkt: Date;
  kjoringensArt: KjoringensArt;
  registreringsstatus: KjoringensArt;
  registrertForstegangPaEierskap: Date;
}
