// Type definition imports
import { TStatensVegvesenBilData } from '../../types/typeDefinitions';

/**
 * Class responsible for handling errors
 * @property {TStatensVegvesenBilData} remoteBilData Remote data from API
 */
export default class classErrorHandler {
  /**
   * Display error from API if the registration number was not found
   * Also hide the loading spinner
   * @returns void
   */
  static displayErrorFromAPI(remoteBilData: TStatensVegvesenBilData) {
    window.document.getElementById('feilMelding')!.innerHTML =
      remoteBilData.melding;
    window.document.getElementById('loadingSpinner')!.classList.add('hide');
  }

  /**
   * Remove the error text if we fetch new data
   * @returns void
   */
  static resetErrorText() {
    window.document.getElementById('feilMelding')!.innerHTML = '';
  }
}
