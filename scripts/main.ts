import classValidText from './classes/ValidText/classValidText';
import classProcessInputForm from './classes/ProcessInputForm/classProcessInputForm';

class MainClass {
  /**
   * Private fields for the input and form. 
   * Necessary to add the required event handlers
   */
  #textInput = window.document.getElementById('bilinformasjon');
  #textForm = window.document.getElementById('regnrform');

  constructor() {
    this.initialize();
  }

  /**
   * Initialize the class and add the event handlers
   * @returns void     
   */
  private initialize() {
    this.addEventHandlers();
  }

  /**
   * Add the event handlers
   */
  private addEventHandlers() {
    const sendForm = new classProcessInputForm();
    const checkValidText = new classValidText();

    this.#textInput!.addEventListener('input', checkValidText.checkValidText);
    this.#textForm!.addEventListener('submit', sendForm.sendForm);
  }
}

const Main = new MainClass();
