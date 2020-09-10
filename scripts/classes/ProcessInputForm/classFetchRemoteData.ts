// Class imports
import classShowHideElements from './classShowHideElements';
import classErrorHandler from '../ErrorHandler/classErrorHandler';

/**
 * Class responsible for fetching the remote data
 */
export default class classFetchRemoteData {
  /**
   * The method responsible for fetching the remote data
   * @returns Promise Returns a promise with the data fetched. Implements a catch that hides elements and shows error message if there is an error
   */
  static fetchRemoteData() {
    const bilInformasjon = (<HTMLInputElement>(
      window.document.getElementById('bilinformasjon')
    )).value;
    const regNummer = `${process.env.API_URL}${bilInformasjon}`;

    return fetch(regNummer)
      .then(async (response) => {
        const bilResponse = await response.text();
        const bilData = JSON.parse(bilResponse);
        console.log(bilData)
        return bilData;
      })
      .catch(function (error) {
        // Hide elements if we have an error
        classShowHideElements.hideElements();
        classErrorHandler.showErrorFetchingRegNr();
      });
  }
}
