interface InputEvent extends Event {
  target: HTMLInputElement;
}

interface SubmitButton extends HTMLElement {
  removeAttribute(name: string): void;
  setAttribute(name: string, value: string): void;
}

/**
 * checkValidText is where we check if the text input is valid
 * If it is, we enable the submit button
 */

const checkValidText = (event: InputEvent): void => {
  const bilInformasjon = event?.target?.value;
  const submitButton = window.document.getElementById(
    "submitButton"
  ) as SubmitButton;

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

export default checkValidText;
