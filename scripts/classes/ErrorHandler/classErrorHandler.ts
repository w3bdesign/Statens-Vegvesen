import { IStatensVegvesenBilData } from "../../types/typeDefinitions";

const displayErrorFromAPI = (remoteBilData: IStatensVegvesenBilData): void => {
  const feilMelding = document.getElementById("feilMelding");
  if (feilMelding !== null) {
    feilMelding.innerHTML = remoteBilData.melding;
  }
  const loadingSpinner = document.getElementById("loadingSpinner");
  if (loadingSpinner !== null) {
    loadingSpinner.classList.add("d-none");
  }
};

const resetErrorText = (): void => {
  const feilMelding = document.getElementById("feilMelding");
  if (feilMelding !== null) {
    feilMelding.innerHTML = "";
  }
};

const showErrorFetchingRegNr = (): void => {
  const feilMelding = document.getElementById("feilMelding");
  if (feilMelding !== null) {
    feilMelding.innerHTML = "En feil har oppstått, vennligst prøv igjen.";
  }
};

export default { displayErrorFromAPI, resetErrorText, showErrorFetchingRegNr };
