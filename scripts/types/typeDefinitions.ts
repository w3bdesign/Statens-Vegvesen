/**
 * Type definition for data returned from API.
 * Returns an object with strings.
 */

export interface IStatensVegvesenBilData {
  // Will return error message if the car was not found
  melding: string;
  /**
   * Registration number for personalised number plate)
   * @see https://www.vegvesen.no/en/vehicles/own-and-maintain/number-plates/personalised-number-plates
   */
  kjennemerke: string;
  // Details about when car was registered for the first time
  forstegangsregistrering: string;
  // Details about when car was registered on owner
  forstegangsregistreringEier: string;
  // Last time the car had a mandatory roadworthiness test
  sistKontrollert: string;
}

export interface IStatensVegvesenFullData {
  kjennemerke: string;
  understellsnummer: string;
  kuid: string;
  personligKjennemerke: string | null;
  registrering: {
    registreringsstatus: string;
    registreringsstatusDato: string;
    forstegangsregistrering: string;
    forstegangsregistreringNorge: string;
    forstegangsregistreringEier: string;
    avregistrertHosBilforhandler: boolean;
    kjennemerkefarge: string;
  };
  periodiskKjoretoykontroll: { sistKontrollert: string; nesteKontroll: string };
  tekniskKjoretoy: {
    handelsbetegnelse: string;
    typebetegnelse: string;
    merke: string;
    kjoretoyAvgiftskode: string;
    tekniskKode: string;
    miljoEuroklasse: null;
    sitteplasser: number;
    staplasser: null;
    oppbygd: boolean;
    lengde: number;
    bredde: number;
    hoyde: null;
    lastegenskaper: {
      egenvekt: number;
      tillattTotalvekt: number;
      nyttelast: number;
      tillattTilhengervektMedBrems: number;
      tillattTilhengervektUtenBrems: number;
      tillattVertikalKoplingslast: number;
      tillattVogntogvekt: number;
      tillattTaklast: number;
    };
    maksimumHastighet: number;
    hybridElektriskKjoretoy: null | boolean;
    girkasse: string;
    hybridkategori: string;
    motorer: any;
    karosseri: { farge: string; fargekode: string };
    forbrukOgUtslipp: Array<any>;
    aksler: {
      drivaksler: number;
      dekkOgFelger: Array<any>;
      aksler: Array<any>;
    };
    unntak: Array<any>;
  };
  bruktimport: null | boolean;
  vektarsavgiftOppgittGrunnlag: null;
}
