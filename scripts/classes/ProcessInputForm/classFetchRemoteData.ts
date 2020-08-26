export default class classFetchRemoteData {
  
  static fetchRemoteData()  {
    const bilInformasjon = (<HTMLInputElement>(
      window.document.getElementById('bilinformasjon')
    )).value;
    const regNummer = `https://statens-vegvesen-express.vercel.app/bil/${bilInformasjon}`;
    

    fetch(regNummer)
      .then(async (response) => {
        const informasjonBil = await response.text();
        const bilData = JSON.parse(informasjonBil);
        console.log(bilData)
        return bilData

        /*if (bilData) {
          return bilData;
        }*/

      })
      .catch(function (error) {
        console.log(error.toString());
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
