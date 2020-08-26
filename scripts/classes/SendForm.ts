export default class SendForm {
  #bilInformasjon: string;
  #regNummer: string;
  #remoteBilData: any;

  constructor() {
    this.#bilInformasjon = (<HTMLInputElement>(
      window.document.getElementById('bilinformasjon')
    )).value;
    this.#regNummer = `https://statens-vegvesen-express.vercel.app/bil/${this.#bilInformasjon}`;
  }

  public sendForm(event: Event) {
    event.preventDefault();
    this.showLoadingSpinner();
    this.fetchRemoteData();
  }

  private showLoadingSpinner() {
    // Show loading spinner
    window.document.getElementById('loadingSpinner')!.classList.remove('hide');
  }

  private fetchRemoteData() {
    // ax58675 = Avregistrert

    fetch(this.#regNummer)
      .then(async (response) => {
        const informasjonBil = await response.text();
        this.#remoteBilData = JSON.parse(informasjonBil);
        this.processRemoteData();
      })
      .catch(function () {
        window.document.getElementById('loadingSpinner')!.classList.add('hide');
        window.document.getElementById('feilMelding')!.innerHTML =
          'En feil har oppstått, vennligst prøv igjen.';
      });
  }

  private processRemoteData() {
    // TODO Gjør noe med data vi har hentet
    console.log('processRemoteData: ');
    console.log(this.#remoteBilData);
    this.#remoteBilData.melding && this.displayErrorFromAPI();
  }

  private displayErrorFromAPI() {
    window.document.getElementById('feilMelding')!.innerHTML =
      this.#remoteBilData.melding;
    window.document.getElementById('loadingSpinner')!.classList.add('hide');
  }

  private setDefaults(informasjonBil: any): any {
    // TODO Gjør noe mer her
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
