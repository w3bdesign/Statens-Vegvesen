import "animate.css";

import checkValidText from "./classes/ValidText/classValidText";
import sendForm from "./classes/ProcessInputForm/classProcessInputForm";

const initialize = (): void => {
  const textInput = window.document.getElementById(
    "bilinformasjon"
  ) as HTMLInputElement;
  const textForm = window.document.getElementById("regnrform");

  if (textInput && textForm) {

    console.log("Adding event listeners ...");


    textInput.addEventListener("input", () => checkValidText);
    textForm.addEventListener("submit", () => sendForm);
  }
};

initialize();
