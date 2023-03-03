import classFetchRemoteData from "./classFetchRemoteData";
import classShowHideElements from "./classShowHideElements";
import classErrorHandler from "../ErrorHandler/classErrorHandler";
import type { IStatensVegvesenBilData } from "../../types/typeDefinitions";

// Define a variable to hold the remote data
let remoteBilData: IStatensVegvesenBilData;

// Define a function to handle form submission
const sendForm = (event: Event): void => {
  event.preventDefault();
  // Show the loading spinner
  classShowHideElements.showLoadingSpinner();
  // Fetch the remote data
  classFetchRemoteData
    .fetchRemoteData()
    .then((response) => {
      // Store the remote data in the variable
      remoteBilData = response;
      // Process the remote data
      processRemoteData();
    })
    .catch(() => {
      return;
    });
};

// Define a function to process the remote data
const processRemoteData = () => {
  // If we get an error message from the API, display the error message and hide the data table
  if (remoteBilData.melding !== undefined) {
    classErrorHandler.displayErrorFromAPI(remoteBilData);
    classShowHideElements.hideDataTable();
    return;
  }
  // If we don't get an error message, hide the loading spinner, show the data table, add the data to the table, and reset the error text
  classShowHideElements.hideLoadingSpinner();
  classShowHideElements.showDataTable();
  addDataToTable();
  classErrorHandler.resetErrorText();
};

// Define a function to set the innerHTML of an element
const setInnerHTML = (elementId: string, value: string) => {
  const element = window.document.getElementById(elementId);
  if (element && value) {
    element.innerHTML = value;
  }
};

// Define a function to add data to the table
const addDataToTable = () => {
  setInnerHTML("kjennemerke", remoteBilData.kjennemerke);
  setInnerHTML(
    "forstegangsregistrering",
    remoteBilData.forstegangsregistrering
  );
  setInnerHTML(
    "forstegangsregistreringEier",
    remoteBilData.forstegangsregistreringEier
  );
  setInnerHTML("sistKontrollert", remoteBilData.sistKontrollert);
};

// Export the sendForm function as the default export
export default {
  sendForm,
};
