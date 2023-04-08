/**

    Type definition for data returned from API.
    Returns an object with strings and optional values.
    */

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
  registrertForstegangNorgeDato: Date;
}

export interface Godkjenning {
  forstegangsGodkjenning: ForstegangsGodkjenning;
  kjoretoymerknad: Kjoretoymerknad[];
  registreringsbegrensninger: Registreringsbegrensninger;
  tekniskGodkjenning: TekniskGodkjenning;
  tilleggsgodkjenninger: any[];
}

export interface ForstegangsGodkjenning {
  forstegangRegistrertDato: Date;
  godkjenningsId: string;
  godkjenningsundertype: KjoringensArt;
  gyldigFraDato: Date;
  gyldigFraDatoTid: Date;
  kvalitetskodeForstegangRegDato: KjoringensArt;
  unntak: any[];
}

export interface KjoringensArt {
  kodeNavn?: string;
  kodeVerdi: string;
  tidligereKodeVerdi: any[];
  kodeBeskrivelse?: string;
  kodeTypeId?: string;
}

export interface Kjoretoymerknad {
  merknad: string;
  merknadtypeKode: string;
}

export interface Registreringsbegrensninger {
  registreringsbegrensning: any[];
}

export interface TekniskGodkjenning {
  godkjenningsId: string;
  godkjenningsundertype: KjoringensArt;
  gyldigFraDato: Date;
  gyldigFraDatoTid: Date;
  kjoretoyklassifisering: Kjoretoyklassifisering;
  krav: Krav[];
  tekniskeData: TekniskeData;
  unntak: any[];
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
  tidligereKodeVerdi: any[];
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
  ovrigeTekniskeData: any[];
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
  tilhengerBremseforbindelse: any[];
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
  lengde: number;
}

export interface Generelt {
  fabrikant: any[];
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
  antallDorer: any[];
  dorUtforming: any[];
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
  miljoOgdrivstoffGruppe: MiljoOgdrivstoffGruppe[];
  okoInnovasjon: boolean;
}

export interface MiljoOgdrivstoffGruppe {
  drivstoffKodeMiljodata: KjoringensArt;
  lyd: Lyd;
}

export interface Lyd {
  standstoy: number;
  stoyMalingOppgittAv: KjoringensArt;
  vedAntallOmdreininger: number;
}

export interface MotorOgDrivverk {
  girkassetype: KjoringensArt;
  girutvekslingPrGir: any[];
  hybridKategori: KjoringensArt;
  maksimumHastighet: number[];
  maksimumHastighetMalt: any[];
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
  kopling: any[];
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
  vogntogvektAvhBremsesystem: any[];
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
  kontrollfrist: Date;
  sistGodkjent: Date;
}

export interface Registrering {
  fomTidspunkt: Date;
  kjoringensArt: KjoringensArt;
  registreringsstatus: KjoringensArt;
  registrertForstegangPaEierskap: Date;
}
