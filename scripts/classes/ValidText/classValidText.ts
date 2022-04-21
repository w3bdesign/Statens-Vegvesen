/**
 * classValidText is where we check if the text input is valid
 * If it is, we enable the submit button
 */
export default class classValidText {
  /**
   * Check if the entered text is either in the format "XX12345", is not undefined and length is 7
   * @param {Event} event Used to fetch the value from the text input
   */
  public checkValidText = (event: Event): void => {
    // Need to cast this as <HTMLInputElement> or Typescript gives us an error
    const bilInformasjon = (<HTMLInputElement>event.target).value;
    const submitButton = window.document.getElementById("submitButton");
    // Filter input to make sure it is in the format "XX12345"
    // Set button as disabled until it is valid
    // This will also prevent XSS
    const letters = /[A-Z]{2}\d{5}/gi;

    const bilInformasjonMatchesFormat = letters.test(bilInformasjon);

    if (
      bilInformasjonMatchesFormat &&
      bilInformasjon !== undefined &&
      bilInformasjon.length === 7
    ) {
      submitButton.removeAttribute("disabled");
    } else {
      submitButton.setAttribute("disabled", "true");
    }
  };
}
