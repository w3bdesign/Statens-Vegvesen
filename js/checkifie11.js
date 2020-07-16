function isIE() {
  var ua = window.navigator.userAgent; //Check the userAgent property of the window.navigator object
  var msie = ua.indexOf('MSIE '); // IE 10 or older
  var trident = ua.indexOf('Trident/'); //IE 11

  return msie > 0 || trident > 0;
}

function checkIfIE() {
  if (isIE()) {
    document.getElementById('usingie').innerHTML =
      '<h5>Vi støtter ikke lenger Internet Explorer 11. <br/><br/>Du bør oppgradere til siste versjon av <a href=https://www.microsoft.com/nb-no/windows/microsoft-edge>Microsoft Edge</a> eller velge en annen nettleser som f.eks. <a href=https://www.google.com/intl/no/chrome/>Google Chrome</a> eller <a href=https://www.mozilla.org/nb-NO/firefox/new/>Mozilla Firefox</a> </h5>';
    document.getElementById('hideifie').classList.add('hide');
  }
}
