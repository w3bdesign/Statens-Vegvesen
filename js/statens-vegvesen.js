function sendForm() {
  const bilInformasjon = document.getElementById("bilinformasjon").value;
  const regNummer = `https://statens-vegvesen-express.herokuapp.com/bil/${bilInformasjon}`;
  // Hide error message when try to fetch a new number
  document.getElementById("feilMelding").innerHTML = ``;
  // Show loading spinner
  document.getElementById("loadingSpinner").classList.remove("hide");
  fetch(regNummer)
    .then(async response => {
      const text = await response.text();
      const informasjonBil = JSON.parse(text);

      // Set some default values in case they are null (no information is registered)
      // We do not want to use || as it may introduce some bugs
      if (informasjonBil.kjennemerke === null) {
        informasjonBil.kjennemerke = "(Ingen informasjon registrert)";
      }
      if (informasjonBil.registrering.forstegangsregistrering === null) {
        informasjonBil.registrering.forstegangsregistrering =
          "(Ingen informasjon registrert)";
      }
      if (informasjonBil.registrering.forstegangsregistreringEier === null) {
        informasjonBil.registrering.forstegangsregistreringEier =
          "(Ingen informasjon registrert)";
      }
      if (informasjonBil.periodiskKjoretoykontroll.sistKontrollert === null) {
        informasjonBil.periodiskKjoretoykontroll.sistKontrollert =
          "(Ingen informasjon registrert)";
      }

      // Hide loading spinner
      document.getElementById("loadingSpinner").classList.add("hide");
      // Dont show information table
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
      // Convert error message to string so we can compare it
      const errorToString = error.toString();

      // TODO Replace with a switch case ?
      if (
        errorToString === "TypeError: informasjonBil.registrering is undefined"
      ) {
        error =
          "Registreringsnummeret eksisterer ikke i databasen. Vennligst prøv et annet nummer.";
      }

      // Dont show table if there is an error
      document.getElementById("tableElement").classList.add("scale-out");
      // Hide loading spinner
      document.getElementById("loadingSpinner").classList.add("hide");
      document.getElementById(
        "feilMelding"
      ).innerHTML = `En feil har oppstått under henting av informasjon.
        <br/> ${error}`;
    });
}
