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
  // https://jsonplaceholder.typicode.com/posts
  const bilInformasjon = document.getElementById("bilinformasjon").value;
  //const regNummer = `https://www.vegvesen.no/ws/no/vegvesen/kjoretoy/kjoretoyoppslag/v1/kjennemerkeoppslag/kjoretoy/${bilInformasjon}`;
  //const regNummer = `http://localhost:8080/bil/${bilInformasjon}`;

  const regNummer = `https://statens-vegvesen-express.herokuapp.com/bil/${bilInformasjon}`;

  // Show loading spinner
  document.getElementById("loadingSpinner").classList.remove("hide");

  fetch(regNummer)
    .then(async response => {
      const text = await response.text();
      const informasjonBil = JSON.parse(text);
      // Hide loading spinner
      document.getElementById("loadingSpinner").classList.add("hide");
      document.getElementById("tableElement").classList.remove("scale-out");

      document.getElementById(
        "kjenne"
      ).innerHTML = `<td>${informasjonBil.kjennemerke}</td>`;
      document.getElementById(
        "forstenorge"
      ).innerHTML = `<td>${informasjonBil.registrering.forstegangsregistrering}</td>`;
      document.getElementById(
        "forsteeier"
      ).innerHTML = `<td>${informasjonBil.registrering.forstegangsregistreringEier}</td>`;
      document.getElementById(
        "periodiskKjoretoykontroll"
      ).innerHTML = `<td>${informasjonBil.periodiskKjoretoykontroll.sistKontrollert}</td>`;
    })
    .catch(function(error) {
      // If there is any error you will catch them here
      // Hide loading spinner
      document.getElementById("loadingSpinner").classList.add("hide");
      document.getElementById(
        "feilMelding"
      ).innerHTML = `En feil har oppstått under henting av informasjon.
        <br/>Feilmelding: 
        ${error}`;
    });
}
