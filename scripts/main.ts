import "animate.css";

import checkValidText from "./classes/ValidText/classValidText";
import sendForm from "./classes/ProcessInputForm/classProcessInputForm";

const initialize = (): void => {
  const textInput = window.document.getElementById(
    "bilinformasjon"
  ) as HTMLInputElement;
  const textForm = window.document.getElementById(
    "regnrform"
  ) as HTMLFormElement;

  if (textInput && textForm) {
    textInput.addEventListener("input", checkValidText);

    textForm.addEventListener("submit", (event) => {
      event.preventDefault();
      sendForm;
    });
  }
};

initialize();
