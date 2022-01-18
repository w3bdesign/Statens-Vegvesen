// Import for animations
import 'animate.css';

// Class imports
import classValidText from './classes/ValidText/classValidText';
import classProcessInputForm from './classes/ProcessInputForm/classProcessInputForm';

/**
 * Main class
 * @property {HTMLElement} #textInput Value from text input in form. Used to add event listener for when we type text.
 * @property {HTMLElement} #textForm Reference to form on page. Used to add event listener for form submit.
 */
class MainClass {
  #textInput = window.document.getElementById('bilinformasjon');
  #textForm = window.document.getElementById('regnrform');

  /**
   * Call the initialize method which sets up the event handlers
   */
  constructor() {
    this.initialize();
  }

  /**
   * Initialize the class and add the event handlers
   * @return void
   */
  private initialize() {
    this.addEventHandlers();
  }

  /**
   * Add the event handlers to textInput and textForm
   * @return void
   */
  private addEventHandlers() {
    const sendForm = new classProcessInputForm();
    const checkValidText = new classValidText();

    this.#textInput!.addEventListener('input', checkValidText.checkValidText);
    this.#textForm!.addEventListener('submit', sendForm.sendForm);
  }
}

new MainClass();
