export default class SendForm {
  #bilInformasjon = (<HTMLInputElement>(
    window.document.getElementById('bilinformasjon')
  )).value;
  #regNummer = `https://statens-vegvesen-express.vercel.app/bil/${
    this.#bilInformasjon
  }`;

  static sendForm(e: Event) {
    e.preventDefault();
    this.showLoadingSpinner();
    console.log('Fetching ...');
  }

  static showLoadingSpinner() {
    // Show loading spinner
    window.document.getElementById('loadingSpinner')!.classList.remove('hide');
  }
}
