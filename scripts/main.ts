/*import { sendForm } from './statens-vegvesen';
import { checkValidText } from './checkvalidtext';
import { isIE, checkIfIE } from './checkifie11';*/

import CheckValidText from './classes/CheckValidText';
import SendForm from './classes/SendForm';

class MainClass {
  #textInput = window.document.getElementById('bilinformasjon');
  #textForm = window.document.getElementById('regnrform');

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    this.addEventHandlers();
  }

  private addEventHandlers(): void {
    this.#textInput!.addEventListener('input', CheckValidText.checkValidText);

    //this.#textForm!.addEventListener('submit', SendForm.sendForm);
    this.#textForm!.addEventListener('submit', (e) => {
      e.preventDefault()
      alert('xxxxxxxxx');
    });
  }
}

const Main = new MainClass();
