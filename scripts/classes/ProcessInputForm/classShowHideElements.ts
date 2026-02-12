const showLoadingSpinner = () => {
  document.getElementById("loadingSpinner")?.classList.remove("d-none");
};

const hideLoadingSpinner = () => {
  document.getElementById("loadingSpinner")?.classList.add("d-none");
};

const showVehicleResults = () => {
  const el = document.getElementById("vehicleResults");
  if (el) {
    el.classList.remove("d-none");
    el.classList.remove("animate__fadeOut");
    el.classList.add("animate__fadeIn");
  }
};

const hideVehicleResults = () => {
  const el = document.getElementById("vehicleResults");
  if (el) {
    el.classList.add("d-none");
    el.classList.remove("animate__fadeIn");
  }
};

const hideElements = () => {
  hideVehicleResults();
  hideLoadingSpinner();
};

export default {
  showLoadingSpinner,
  hideLoadingSpinner,
  showVehicleResults,
  hideVehicleResults,
  hideElements,
};
