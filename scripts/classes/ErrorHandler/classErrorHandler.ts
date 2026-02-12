const displayErrorFromAPI = (melding: string): void => {
  const feilMelding = document.getElementById("feilMelding");
  if (feilMelding !== null) {
    feilMelding.textContent = melding;
  }
  const loadingSpinner = document.getElementById("loadingSpinner");
  if (loadingSpinner !== null) {
    loadingSpinner.classList.add("d-none");
  }
};

const resetErrorText = (): void => {
  const feilMelding = document.getElementById("feilMelding");
  if (feilMelding !== null) {
    feilMelding.textContent = "";
  }
};

const showErrorFetchingRegNr = (): void => {
  const feilMelding = document.getElementById("feilMelding");
  if (feilMelding !== null) {
    feilMelding.textContent = "En feil har oppstått, vennligst prøv igjen.";
  }
};

export default { displayErrorFromAPI, resetErrorText, showErrorFetchingRegNr };
