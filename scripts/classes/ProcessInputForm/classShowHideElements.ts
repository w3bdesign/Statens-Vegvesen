/**
 * Class that contains methods for hiding and showing elements when needed
 */
export default class classShowHideElements {
  /**
   * Show the loading spinner
   * @returns void
   */
  static showLoadingSpinner() {
    window.document
      .getElementById("loadingSpinner")!
      .classList.remove("d-none");
  }

  /**
   * Hide the loading spinner
   * @returns void
   */
  static hideLoadingSpinner() {
    window.document.getElementById("loadingSpinner")!.classList.add("d-none");
  }

  /**
   * Display the table and add animation class
   * @returns void
   */
  static showDataTable() {
    window.document.getElementById("tableElement")!.classList.remove("d-none");
  }

  /**
   * Hide the table. Usually caused by an error
   * @returns void
   */
  static hideDataTable() {
    window.document
      .getElementById("tableElement")!
      .classList.add("animate__fadeOut");
  }

  /**
   * Hide loading spinner and data table
   * @returns void
   */
  static hideElements() {
    window.document
      .getElementById("tableElement")!
      .classList.add("animate__fadeOut");
    window.document.getElementById("loadingSpinner")!.classList.add("d-none");
  }
}
