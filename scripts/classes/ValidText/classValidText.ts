interface SubmitButton extends HTMLElement {
  removeAttribute(name: string): void;
  setAttribute(name: string, value: string): void;
}

/**
 * checkValidText is where we check if the text input is valid
 * If it is, we enable the submit button
 */

const checkValidText = (event: Event): void => {
  const bilInformasjon = event.target as HTMLInputElement;

  const submitButton = window.document.getElementById(
    "submitButton"
  ) as SubmitButton;

  const letters = /[A-Z]{2}\d{5}/gi;
  const bilInformasjonMatchesFormat = letters.test(bilInformasjon.value);

  if (bilInformasjonMatchesFormat && bilInformasjon !== undefined) {
    submitButton.removeAttribute("disabled");
  } else {
    submitButton.setAttribute("disabled", "true");
  }
};

export default checkValidText;
