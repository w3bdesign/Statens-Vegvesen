import CheckValidText from './classes/CheckValidText';
import SendForm from './classes/SendForm';

class MainClass {
  #textInput = <HTMLInputElement>(
    window.document.getElementById('bilinformasjon')
  );
  #textForm = window.document.getElementById('regnrform');

  constructor() {
    this.initialize();
  }

  private initialize() {
    this.addEventHandlers();   
  }

  private addEventHandlers() {
    const formSend = new SendForm()
    const checkValidText = new CheckValidText()

    console.log(formSend)

    this.#textInput!.addEventListener('input', checkValidText.checkValidText);
    this.#textForm!.addEventListener('submit', formSend.sendForm);
    
  }
}

const Main = new MainClass();
