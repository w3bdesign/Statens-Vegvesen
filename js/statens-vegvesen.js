function checkValidText() {
  const bilInformasjon = document.getElementById("bilinformasjon").value;
  const letters = /[A-Z]{2}[0-9]{5}/gi;
  if (
    bilInformasjon.match(letters) &&
    bilInformasjon &&
    bilInformasjon.length === 7
  ) {
    document.getElementById("submitButton").removeAttribute("disabled");
  } else {
    document.getElementById("submitButton").setAttribute("disabled", true);
  }
}

function sendForm() {
  // We utilize http://www.whateverorigin.org to get around CORS.
  // An alternate solution could be to create our own proxy in Express
  const bilInformasjon = document.getElementById("bilinformasjon").value;
  const regNummer = `https://www.vegvesen.no/ws/no/vegvesen/kjoretoy/kjoretoyoppslag/v1/kjennemerkeoppslag/kjoretoy/${bilInformasjon}`;
  
  $.getJSON(
    "http://www.whateverorigin.org/get?url=" +
      encodeURIComponent(regNummer) +
      "&callback=?",
    function(data) {
      // We receive a JSON object and need to parse it as an object
      var jsonParsedData = JSON.parse(data.contents);
      // Display the table for displaying data
      document.getElementById(
        "kjenne"
      ).innerHTML = `<td>${jsonParsedData.kjennemerke}</td>`;
      document.getElementById(
        "forstenorge"
      ).innerHTML = `<td>${jsonParsedData.registrering.forstegangsregistrering}</td>`;
      document.getElementById(
        "forsteeier"
      ).innerHTML = `<td>${jsonParsedData.registrering.forstegangsregistreringEier}</td>`;
      document.getElementById(
        "periodiskKjoretoykontroll"
      ).innerHTML = `<td>${jsonParsedData.periodiskKjoretoykontroll.sistKontrollert}</td>`;
    }
  )
    .fail(function() {
      document.getElementById("feilMelding").innerHTML =
        "En feil har oppstått under henting av informasjon</h2>";
    })
    .done(function() {
      document.getElementById("tableElement").classList.remove("scale-out");
    });
}
