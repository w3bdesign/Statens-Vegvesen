import classFetchRemoteData from './classFetchRemoteData';

type TStatensVegvesenBilData = {
  melding: string;
  kjennemerke: string;
  registrering: {
    forstegangsregistrering: string;
    forstegangsregistreringEier: string;
  };
  periodiskKjoretoykontroll: { sistKontrollert: string };
};

export default class classProcessInputForm {
  private static bilInformasjon: string;
  private static regNummer: string;
  private static remoteBilData: TStatensVegvesenBilData;

  constructor() {
    // Assign variables to an empty string
    classProcessInputForm.bilInformasjon = '';
    classProcessInputForm.regNummer = '';
  }

  /**
   * Send the form, show the loading spinner and fetch remote data
   * @param event Event Used to prevent default form submit action
   */
  public async sendForm(event: Event) {
    event.preventDefault();
    classProcessInputForm.showLoadingSpinner();
    classFetchRemoteData.fetchRemoteData().then((response) => {
      classProcessInputForm.remoteBilData = response;
      classProcessInputForm.processRemoteData();
    });
  }

  /**
   * Show the loading spinner
   * @returns void
   */
  private static showLoadingSpinner() {
    window.document.getElementById('loadingSpinner')!.classList.remove('hide');
  }

  /**
   * Hide the loading spinner
   * @returns void
   */
  private static hideLoadingSpinner() {
    window.document.getElementById('loadingSpinner')!.classList.add('hide');
  }

  private static fetchRemoteData() {
    this.bilInformasjon = (<HTMLInputElement>(
      window.document.getElementById('bilinformasjon')
    )).value;
    this.regNummer = `https://statens-vegvesen-express.vercel.app/bil/${classProcessInputForm.bilInformasjon}`;

    fetch(this.regNummer)
      .then(async (response) => {
        const informasjonBil = await response.text();
        this.remoteBilData = JSON.parse(informasjonBil);
        this.processRemoteData();
      })
      .catch(function (error) {
        classProcessInputForm.hideDataTable();
        window.document.getElementById('loadingSpinner')!.classList.add('hide');
        window.document.getElementById('feilMelding')!.innerHTML =
          'En feil har oppstått, vennligst prøv igjen.';
      });
  }

  private static showDataTable() {
    window.document
      .getElementById('tableElement')!
      .classList.remove('scale-out');
  }

  private static hideDataTable() {
    window.document.getElementById('tableElement')!.classList.add('scale-out');
  }

  private static processRemoteData() {
    classProcessInputForm.remoteBilData.melding && this.displayErrorFromAPI();
    this.hideLoadingSpinner();
    this.showDataTable();
    this.addDataToTable();
  }

  private static addDataToTable() {
    window.document.getElementById(
      'kjennemerke'
    )!.innerHTML = this.remoteBilData.kjennemerke;

    window.document.getElementById(
      'forstegangsregistrering'
    )!.innerHTML = this.remoteBilData.registrering.forstegangsregistrering;

    window.document.getElementById(
      'forstegangsregistreringEier'
    )!.innerHTML = this.remoteBilData.registrering.forstegangsregistreringEier;

    window.document.getElementById(
      'sistKontrollert'
    )!.innerHTML = this.remoteBilData.periodiskKjoretoykontroll.sistKontrollert;
  }

  /**
   * Display error from API if the registration number was not found
   * @returns void
   */
  private static displayErrorFromAPI() {
    window.document.getElementById(
      'feilMelding'
    )!.innerHTML = this.remoteBilData.melding;
    window.document.getElementById('loadingSpinner')!.classList.add('hide');
  }
}
