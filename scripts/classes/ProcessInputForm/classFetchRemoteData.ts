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

  try {
    const response = await fetch(regNummer);
    const bilResponse = await response.text();
    return JSON.parse(bilResponse);
  } catch (error) {
    classShowHideElements.hideElements();
    classErrorHandler.showErrorFetchingRegNr();
  }
};

export default { fetchRemoteData };
