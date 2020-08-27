import classFetchRemoteData from './classFetchRemoteData';
import classShowHideElements from './classShowHideElements';

/**
 * Type definition based on data returned from API
 */
type TStatensVegvesenBilData = {
  // Will return error message if the car was not found
  melding: string;
  /**
   * Registration number for personalised number plate)
   * @see https://www.vegvesen.no/en/vehicles/own-and-maintain/number-plates/personalised-number-plates
   */
  kjennemerke: string;
  registrering: {
    // Details about when car was registered for the first time
    forstegangsregistrering: string;
    // Details about when car was registered on owner
    forstegangsregistreringEier: string;
  };
  // Last time the car had a mandatory roadworthiness test
  periodiskKjoretoykontroll: { sistKontrollert: string };
};

/**
 * Class that processes the input from the form
 * @property {TStatensVegvesenBilData} remoteBilData Object with the remote data that was fetched from the API
 */
export default class classProcessInputForm {
  private static remoteBilData: TStatensVegvesenBilData;

  /**
   * Send the form, show the loading spinner and fetch remote data
   * @param {Event} event Used to prevent default form submit action
   * @returns void
   */
  public async sendForm(event: Event) {
    event.preventDefault();

    classShowHideElements.showLoadingSpinner();
    classFetchRemoteData.fetchRemoteData().then((response) => {
      classProcessInputForm.remoteBilData = response;
      classProcessInputForm.processRemoteData();
    });
  }

  /**
   * Check if we get any errors from the API, if we do, display the error and return
   * Otherwise we hide the loading spinner, show the data table, add the data and reset the error text
   * @returns void
   */
  private static processRemoteData() {
    if (classProcessInputForm.remoteBilData.melding !== undefined) {
      this.displayErrorFromAPI();
      classShowHideElements.hideDataTable();
      return;
    }
    classShowHideElements.hideLoadingSpinner();
    classShowHideElements.showDataTable();
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
   * Also hide the loading spinner
   * @returns void
   */
  private static displayErrorFromAPI() {
    window.document.getElementById(
      'feilMelding'
    )!.innerHTML = this.remoteBilData.melding;
    window.document.getElementById('loadingSpinner')!.classList.add('hide');
  }
}
