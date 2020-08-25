export default class SendForm {
  static bilInformasjon: string;
  static regNummer: string;

  constructor() {
    SendForm.bilInformasjon = (<HTMLInputElement>(
      window.document.getElementById('bilinformasjon')
    )).value;
    SendForm.regNummer = `https://statens-vegvesen-express.vercel.appx/bil/${SendForm.bilInformasjon}`;
  }

  public sendForm(e: Event) {
    e.preventDefault();
    SendForm.showLoadingSpinner();
    SendForm.fetchRemoteData();
  }

  static showLoadingSpinner() {
    // Show loading spinner
    window.document.getElementById('loadingSpinner')!.classList.remove('hide');
  }

  static fetchRemoteData() {
    fetch(SendForm.regNummer)
      .then(async (response) => {
        const text = await response.text();
        const informasjonBil = JSON.parse(text);

        // We have an error
        if (informasjonBil.melding) {
          window.document.getElementById('feilMelding')!.innerHTML =
            informasjonBil.melding;
          window.document
            .getElementById('loadingSpinner')!
            .classList.add('hide');
        }
      })
      .catch(function (error) {
        window.document.getElementById('loadingSpinner')!.classList.add('hide');

        window.document.getElementById('feilMelding')!.innerHTML =
          'En feil har oppstått, vennligst prøv igjen.';
      });
  }

  static setDefaults(informasjonBil: any): any {
    if (informasjonBil === undefined) {
      informasjonBil = '(Ingen informasjon om kjøretøy er registrert)';
    }

    if (informasjonBil.kjennemerke === null) {
      informasjonBil.kjennemerke = '(Ingen informasjon registrert)';
    }
    if (informasjonBil.registrering.forstegangsregistrering === null) {
      informasjonBil.registrering.forstegangsregistrering =
        '(Ingen informasjon registrert)';
    }
    if (informasjonBil.registrering.forstegangsregistreringEier === null) {
      informasjonBil.registrering.forstegangsregistreringEier =
        '(Ingen informasjon registrert)';
    }
    if (informasjonBil.periodiskKjoretoykontroll.sistKontrollert === null) {
      informasjonBil.periodiskKjoretoykontroll.sistKontrollert =
        '(Ingen informasjon registrert)';
    }
    return informasjonBil;
  }
}
