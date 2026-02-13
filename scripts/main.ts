import "animate.css";
import "bootstrap";

import checkValidText from "./classes/ValidText/classValidText";
import sendForm from "./classes/ProcessInputForm/classProcessInputForm";

const initialize = () => {
  const textInput = window.document.getElementById(
    "bilinformasjon"
  ) as HTMLInputElement;
  const textForm = window.document.getElementById(
    "regnrform"
  ) as HTMLFormElement;

  if (textInput && textForm) {
    textInput.addEventListener("input", checkValidText);

    textForm.addEventListener("submit", (event) => {
      sendForm();
      event.preventDefault();
    });
  }
};

initialize();
