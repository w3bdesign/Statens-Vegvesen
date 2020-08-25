export default class SendForm {
  static bilInformasjon: string;
  static regNummer: string;

  constructor() {
    SendForm.bilInformasjon = (<HTMLInputElement>(
      window.document.getElementById('bilinformasjon')
    )).value;
    SendForm.regNummer = `https://statens-vegvesen-express.vercel.app/bil/${SendForm.bilInformasjon}`;
  }

  public sendForm(e: Event) {
    e.preventDefault();
    SendForm.showLoadingSpinner();
    SendForm.fetchRemoteData();
  }

  static showLoadingSpinner() {
    // Show loading spinner
    window.document.getElementById('loadingSpinner')!.classList.remove('hide');
  }

  static fetchRemoteData() {
    fetch(SendForm.regNummer).then(async (response) => {
      const text = await response.text();
      const informasjonBil = JSON.parse(text);
      console.log(informasjonBil);
    });
  }
}
