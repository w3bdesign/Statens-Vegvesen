// Import for animations
import "animate.css";

// Class imports
import classValidText from "./classes/ValidText/classValidText";
import classProcessInputForm from "./classes/ProcessInputForm/classProcessInputForm";

/**
 * Main class
 * @property {HTMLElement} #textInput Value from text input in form. Used to add event listener for when we type text.
 * @property {HTMLElement} #textForm Reference to form on page. Used to add event listener for form submit.
 */
class MainClass {
  /**
   * Initialize the class and add the event handlers
   * @return void
   */
  public initialize() {
    this.addEventHandlers();
  }

  /**
   * Add the event handlers to textInput and textForm
   * @return void
   */
  private addEventHandlers() {
    const sendForm = new classProcessInputForm();
    const checkValidText = new classValidText();

    const textInput = window.document.getElementById("bilinformasjon");
    const textForm = window.document.getElementById("regnrform");

    if (textInput && textForm) {
      textInput.addEventListener("input", checkValidText.checkValidText);
      textForm.addEventListener("submit", sendForm.sendForm);
    }
  }
}

const main = new MainClass();
main.initialize();
/* lgtm [js/unused-local-variable] */
