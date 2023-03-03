const showLoadingSpinner = () => {
  document.getElementById("loadingSpinner")?.classList.remove("d-none");
};

const hideLoadingSpinner = () => {
  document.getElementById("loadingSpinner")?.classList.add("d-none");
};

const showDataTable = () => {
  document.getElementById("tableElement")?.classList.remove("d-none");
};

const hideDataTable = () => {
  document.getElementById("tableElement")?.classList.add("animate__fadeOut");
};

const hideElements = () => {
  document.getElementById("tableElement")?.classList.add("animate__fadeOut");
  document.getElementById("loadingSpinner")?.classList.add("d-none");
};

export default {
  showLoadingSpinner,
  hideLoadingSpinner,
  showDataTable,
  hideDataTable,
  hideElements,
};