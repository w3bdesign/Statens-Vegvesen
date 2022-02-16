// Class imports
import classFetchRemoteData from "./classFetchRemoteData";
import classShowHideElements from "./classShowHideElements";
import classErrorHandler from "../ErrorHandler/classErrorHandler";

// Type definition imports
import { TStatensVegvesenBilData } from "../../types/typeDefinitions";

/**
 * Class responsible for fetching the remote data
 * @property {TStatensVegvesenBilData} remoteBilData Remote data from API
 */
export default class ClassProcessInputForm {
  private static remoteBilData: TStatensVegvesenBilData;

  /**
   * Send the form, show the loading spinner and fetch remote data
   * @param event Event Used to prevent default form submit action
   * @returns void
   */
  public async sendForm(event: Event) {
    event.preventDefault();
    classShowHideElements.showLoadingSpinner();
    classFetchRemoteData.fetchRemoteData().then((response) => {
      ClassProcessInputForm.remoteBilData = response;
      ClassProcessInputForm.processRemoteData();
    });
  }

  /**
   * Check if we get any errors from the API, if we do, display the error and return
   * Otherwise we hide the loading spinner, show the data table, add the data and reset the error text
   * @returns void
   */
  private static processRemoteData() {
    if (ClassProcessInputForm.remoteBilData.melding !== undefined) {
      classErrorHandler.displayErrorFromAPI(
        ClassProcessInputForm.remoteBilData
      );
      classShowHideElements.hideDataTable();
      return;
    }
    classShowHideElements.hideLoadingSpinner();
    classShowHideElements.showDataTable();
    this.addDataToTable();
    classErrorHandler.resetErrorText();
  }

  /**
   * Helper function to set the innerHTML attribute for each element
   * @param {string} elementId ID of element that we need to modify
   * @param {string} value Value that we modify with
   */
  private static setInnerHTML(elementId: string, value: string) {
    window.document.getElementById(elementId)!.innerHTML = value;
  }

  /**
   * Set the content of the table <td>s to the fetched remote data
   * @returns void
   */
  private static addDataToTable() {
    ClassProcessInputForm.setInnerHTML(
      "kjennemerke",
      this.remoteBilData.kjennemerke
    );
    ClassProcessInputForm.setInnerHTML(
      "forstegangsregistrering",
      this.remoteBilData.registrering.forstegangsregistrering
    );
    ClassProcessInputForm.setInnerHTML(
      "forstegangsregistreringEier",
      this.remoteBilData.registrering.forstegangsregistreringEier
    );
    ClassProcessInputForm.setInnerHTML(
      "sistKontrollert",
      this.remoteBilData.periodiskKjoretoykontroll.sistKontrollert
    );
  }
}
