export default class classFetchRemoteData {
  static fetchRemoteData() {
    const bilInformasjon = (<HTMLInputElement>(
      window.document.getElementById('bilinformasjon')
    )).value;
    const regNummer = `https://statens-vegvesen-express.vercel.app/bil/${bilInformasjon}`;

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

  private static hideElements() {
    window.document.getElementById('tableElement')!.classList.add('scale-out');
    window.document.getElementById('loadingSpinner')!.classList.add('hide');
  }
}
