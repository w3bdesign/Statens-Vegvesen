/**
 * Class that contains methods for hiding and showing elements when needed
 */
export default class classShowHideElements {
  /**
   * Show the loading spinner
   * @returns void
   */
  static showLoadingSpinner() {
    window.document.getElementById('loadingSpinner')!.classList.remove('hide');
  }

  /**
   * Hide the loading spinner
   * @returns void
   */
  static hideLoadingSpinner() {
    window.document.getElementById('loadingSpinner')!.classList.add('hide');
  }

  /**
   * Display the table and add animation class
   * @returns void
   */
  static showDataTable() {
    window.document
      .getElementById('tableElement')!
      .classList.remove('scale-out');
  }

  /**
   * Hide the table. Usually caused by an error
   * @returns void
   */
  static hideDataTable() {
    window.document.getElementById('tableElement')!.classList.add('scale-out');
  }
}
