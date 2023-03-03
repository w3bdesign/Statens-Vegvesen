import classFetchRemoteData from "./classFetchRemoteData";
import classShowHideElements from "./classShowHideElements";
import classErrorHandler from "../ErrorHandler/classErrorHandler";

import type { IStatensVegvesenBilData } from "../../types/typeDefinitions";

let remoteBilData: IStatensVegvesenBilData;

// Helper function to set innerHTML
const setInnerHTML = (elementId: string, value: string) => {
  const element = window.document.getElementById(elementId);
  if (element && value) {
    element.innerHTML = value;
  }
};

/**
 * Add remote data to the table
 */
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

// This function processes remote data
const processRemoteData = () => {
  // Check if the remote data has a 'melding' property
  if (remoteBilData.melding !== undefined) {
    // If it does, display an error message using the 'classErrorHandler' object and hide the data table
    classErrorHandler.displayErrorFromAPI(remoteBilData);
    classShowHideElements.hideDataTable();

    return;
  }
  // If the remote data does not have a 'melding' property, hide the loading spinner and show the data table
  classShowHideElements.hideLoadingSpinner();
  classShowHideElements.showDataTable();
  // Add the remote data to the table
  addDataToTable();
  // Reset any error text using the 'classErrorHandler' object
  classErrorHandler.resetErrorText();
};

// This function is called when a form is submitted

const sendForm = (): void => {
  // Show the loading spinner using the 'classShowHideElements' object
  classShowHideElements.showLoadingSpinner();
  // Fetch remote data using the 'classFetchRemoteData' object
  classFetchRemoteData
    .fetchRemoteData()
    .then((response) => {
      // If the fetch is successful, store the response in the 'remoteBilData' variable
      remoteBilData = response;
      // Call the 'processRemoteData' function to handle the data
      processRemoteData();
    })
    .catch(() => {
      // If the fetch fails, do nothing and return from the function early
      return;
    });
};

export default sendForm;
