/**
 * Class responsible for fetching the remote data
 */
export default class classFetchRemoteData {
  static fetchRemoteData() {
    const bilInformasjon = (<HTMLInputElement>(
      window.document.getElementById('bilinformasjon')
    )).value;
    const regNummer = `${process.env.API_URL}${bilInformasjon}`;

    return fetch(regNummer)
      .then(async (response) => {
        const informasjonBil = await response.text();
        const bilData = JSON.parse(informasjonBil);
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
   */
  private static hideElements() {
    window.document.getElementById('tableElement')!.classList.add('scale-out');
    window.document.getElementById('loadingSpinner')!.classList.add('hide');
  }
}
