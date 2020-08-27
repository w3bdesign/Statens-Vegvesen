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
        return bilData;
      })
      .catch(function (error) {
        // Hide elements if we have an error
        classFetchRemoteData.hideElements();
        window.document.getElementById('feilMelding')!.innerHTML =
          'En feil har oppstått, vennligst prøv igjen.';
      });
  }

  /**
   * Hide loading spinner and data table
   * @returns void
   */
  private static hideElements() {
    window.document.getElementById('tableElement')!.classList.add('scale-out');
    window.document.getElementById('loadingSpinner')!.classList.add('hide');
  }
}
