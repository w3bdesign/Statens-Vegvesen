import classFetchRemoteData from "./classFetchRemoteData";
import classShowHideElements from "./classShowHideElements";
import classErrorHandler from "../ErrorHandler/classErrorHandler";
import type { IStatensVegvesenBilData } from "../../types/typeDefinitions";

let remoteBilData: IStatensVegvesenBilData;

const setInnerHTML = (elementId: string, value: string) => {
  const element = window.document.getElementById(elementId);
  if (element && value) {
    element.innerHTML = value;
  }
};

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

const processRemoteData = () => {
  if (remoteBilData.melding !== undefined) {
    classErrorHandler.displayErrorFromAPI(remoteBilData);
    classShowHideElements.hideDataTable();
    return;
  }
  classShowHideElements.hideLoadingSpinner();
  classShowHideElements.showDataTable();
  addDataToTable();
  classErrorHandler.resetErrorText();
};

const sendForm = (event: Event): void => {
  event.preventDefault();
  classShowHideElements.showLoadingSpinner();
  classFetchRemoteData
    .fetchRemoteData()
    .then((response) => {
      remoteBilData = response;
      processRemoteData();
    })
    .catch(() => {
      return;
    });
};

export default {
  sendForm,
};
