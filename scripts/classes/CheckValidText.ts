export default class CheckValidText {
    #textInput = window.document.getElementById('bilinformasjon');
  
    constructor() {
      this.initialize();
    }
  
    private initialize(): void {
      this.addEventHandlers();
    }
  
    private addEventHandlers(): void {
      this.#textInput!.addEventListener('input', this.checkValidText);
    }
  
    public checkValidText(event: Event): void {
      const bilInformasjon = (<HTMLInputElement>event.target).value;
      const submitButton = window.document.getElementById('submitButton');
      const letters = /[A-Z]{2}[0-9]{5}/gi;
  
      if (
        bilInformasjon.match(letters) &&
        bilInformasjon &&
        bilInformasjon.length === 7
      ) {
        submitButton!.removeAttribute('disabled');
      } else {
        submitButton!.setAttribute('disabled', 'true');
      }
    }
  }
  
  const Test = new CheckValidText();
  