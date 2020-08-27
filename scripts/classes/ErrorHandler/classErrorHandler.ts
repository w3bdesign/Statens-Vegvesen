/**
 * Class responsible for handling errors
 */
export default class classErrorHandler {
  private static remoteBilData: any;

  constructor(remoteBilData: any) {
    classErrorHandler.remoteBilData = remoteBilData;
  }

  /**
   * Display error from API if the registration number was not found
   * Also hide the loading spinner
   * @returns void
   */
  public displayErrorFromAPI() {
    window.document.getElementById('feilMelding')!.innerHTML =
      classErrorHandler.remoteBilData.melding;
    window.document.getElementById('loadingSpinner')!.classList.add('hide');
  }
}
