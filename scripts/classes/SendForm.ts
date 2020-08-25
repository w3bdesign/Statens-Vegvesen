export default class SendForm {
  public sendForm(e: Event) {
    e.preventDefault();
    SendForm.showLoadingSpinner();
    SendForm.fetchRemoteData();
  }

  static showLoadingSpinner() {
    // Show loading spinner
    window.document.getElementById('loadingSpinner')!.classList.remove('hide');
    console.log('Fmm data ...');
  }

  static async fetchRemoteData() {
    const bilInformasjon = (<HTMLInputElement>(
      window.document.getElementById('bilinformasjon')
    )).value;
    const regNummer = `https://statens-vegvesen-express.vercel.app/bil/${bilInformasjon}`;

    console.log('Fetch data ...');
    console.log(regNummer);

    //console.log(SendForm.regNummer);

    //console.log(SendForm.#)

    /*fetch(#regNummer)
    .then(async (response) => {
      const text = await response.text();
      const informasjonBil = JSON.parse(text);
  }*/
  }
}
