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

/**
 *
 */
export default class classProcessInputForm {
  private static remoteBilData: TStatensVegvesenBilData;

  /**
   * Send the form, show the loading spinner and fetch remote data
   * @param event Event Used to prevent default form submit action
   * @returns void
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

  /**
   * Display the table and add animation class
   * @returns void
   */
  private static showDataTable() {
    window.document
      .getElementById('tableElement')!
      .classList.remove('scale-out');
  }

  /**
   * Hide the table. Usually caused by an error
   * @returns void
   */
  private static hideDataTable() {
    window.document.getElementById('tableElement')!.classList.add('scale-out');
  }

  /**
   * Check if we get any errors from the API, if we do, display the error and return
   * Otherwise we hide the loading spinner, show the data table and add the data
   * @returns void
   */
  private static processRemoteData() {
    if (classProcessInputForm.remoteBilData.melding !== undefined) {
      this.displayErrorFromAPI();
      this.hideDataTable();
      return;
    }
    this.hideLoadingSpinner();
    this.showDataTable();
    this.addDataToTable();
    this.resetErrorText();
  }

  /**
   * Remove the error text if we fetch new data
   * @returns void
   */
  private static resetErrorText() {
    window.document.getElementById('feilMelding')!.innerHTML = '';
  }

  /**
   * Set the content of the table <td>s to the fetched remote data
   * @returns void
   */
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
