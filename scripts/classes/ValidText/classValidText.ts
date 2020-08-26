export default class classValidText {
  public checkValidText(event: Event) {
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
