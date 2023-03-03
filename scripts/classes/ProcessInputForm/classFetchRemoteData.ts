// Class imports
import classShowHideElements from "./classShowHideElements";
import classErrorHandler from "../ErrorHandler/classErrorHandler";

/**
 * Class responsible for fetching the remote data
 */
const fetchRemoteData = async () => {
  const bilInformasjon = (<HTMLInputElement>(
    document.getElementById("bilinformasjon")
  )).value;
  const API_URL = "/api/getRegNummer?regNummer=";
  const regNummer = `${API_URL}${bilInformasjon}`;
  let bilResponse = "";

  try {
    const response = await fetch(regNummer);
    bilResponse = await response.text();
  } catch (error) {
    classShowHideElements.hideElements();
    classErrorHandler.showErrorFetchingRegNr();
  }
  return JSON.parse(bilResponse);
};

export default { fetchRemoteData };
