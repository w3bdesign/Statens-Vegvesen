function checkValidText() {
  const bilInformasjon = document.getElementById('bilinformasjon').value;
  const letters = /[A-Z]{2}[0-9]{5}/gi;
  if (
    bilInformasjon.match(letters) &&
    bilInformasjon &&
    bilInformasjon.length === 7
  ) {
    document.getElementById('submitButton').removeAttribute('disabled');
  } else {
    document.getElementById('submitButton').setAttribute('disabled', true);
  }
}
