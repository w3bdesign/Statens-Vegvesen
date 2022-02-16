/**
 * classValidText is where we check if the text input is valid
 * If it is, we enable the submit button
 */
export default class classValidText {
  /**
   * Check if the entered text is either in the format "XX12345", is not undefined and length is 7
   * @param {Event} event Used to fetch the value from the text input
   */
  public checkValidText(event: Event) {
    // Need to cast this as <HTMLInputElement> or Typescript gives us an error
    const bilInformasjon = (<HTMLInputElement>event.target).value;
    const submitButton = window.document.getElementById("submitButton");
    const letters = /[A-Z]{2}[0-9]{5}/gi;

    if (
      bilInformasjon.match(letters) &&
      bilInformasjon !== undefined &&
      bilInformasjon.length === 7
    ) {
      submitButton!.removeAttribute("disabled");
    } else {
      submitButton!.setAttribute("disabled", "true");
    }
  }
}
