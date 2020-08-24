export default class SendForm {
  static sendForm(e: Event): void {
    const bilInformasjon = (<HTMLInputElement>(
      window.document.getElementById('bilinformasjon')
    )).value;
    const regNummer = `https://statens-vegvesen-express.vercel.app/bil/${bilInformasjon}`;
    console.log(bilInformasjon);
    alert('Form submit!');
    e.preventDefault();
  }
}
