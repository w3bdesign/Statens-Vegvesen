import "animate.css";

import checkValidText from "./classes/ValidText/classValidText";
import sendForm from "./classes/ProcessInputForm/classProcessInputForm";

const initialize = (): void => {
  const textInput = window.document.getElementById(
    "bilinformasjon"
  ) as HTMLInputElement;
  const textForm = window.document.getElementById("regnrform");

  if (textInput && textForm) {
    console.log("textInput:", textInput);

    textInput.addEventListener("input", checkValidText);
    textForm.addEventListener("submit", sendForm as any);
  }
};

initialize();
