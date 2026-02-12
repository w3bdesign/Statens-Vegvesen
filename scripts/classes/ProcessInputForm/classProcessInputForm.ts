import classFetchRemoteData from "./classFetchRemoteData";
import classShowHideElements from "./classShowHideElements";
import classErrorHandler from "../ErrorHandler/classErrorHandler";

import type { IVehicleData } from "../../types/typeDefinitions";

let remoteVehicleData: IVehicleData;

/** Format a value for display — returns "—" for null/undefined */
const formatValue = (
  value: string | number | boolean | null | undefined,
): string => {
  if (value === null || value === undefined) return "—";
  if (typeof value === "boolean") return value ? "Ja" : "Nei";
  return String(value);
};

/** Set text content of an element by ID */
const setText = (elementId: string, value: string | number | boolean | null | undefined): void => {
  const element = window.document.getElementById(elementId);
  if (element) {
    element.textContent = formatValue(value);
  }
};

/**
 * Populate the vehicle header card
 */
const populateHeader = (): void => {
  const o = remoteVehicleData.oversikt;
  setText("headerMerke", o.merke);
  setText("headerModell", o.modell);
  setText("headerKjennemerke", o.kjennemerke);
  setText("headerType", o.typebetegnelse);
  setText("headerFarge", o.farge);
};

/**
 * Populate the Oversikt tab
 */
const populateOversikt = (): void => {
  const o = remoteVehicleData.oversikt;
  setText("val-kjennemerke", o.kjennemerke);
  setText("val-understellsnummer", o.understellsnummer);
  setText("val-merke", o.merke);
  setText("val-modell", o.modell);
  setText("val-typebetegnelse", o.typebetegnelse);
  setText("val-farge", o.farge);
  setText("val-kjoretoyKlasse", o.kjoretoyKlasse);
  setText("val-forstegangsregistrering", o.forstegangsregistrering);
  setText("val-registreringsstatus", o.registreringsstatus);
  setText("val-kjoringensArt", o.kjoringensArt);
  setText("val-nesteEuKontroll", o.nesteEuKontroll);
  setText("val-sistGodkjentEuKontroll", o.sistGodkjentEuKontroll);
};

/**
 * Populate the Motor & Ytelse tab
 */
const populateMotorOgYtelse = (): void => {
  const m = remoteVehicleData.motorOgYtelse;
  setText("val-drivstofftype", m.drivstofftype);
  setText("val-motoreffektKw", m.motoreffektKw);
  setText("val-slagvolumCc", m.slagvolumCc);
  setText("val-antallSylindre", m.antallSylindre);
  setText("val-girkassetype", m.girkassetype);
  setText("val-antallGir", m.antallGir);
  setText("val-hybridKategori", m.hybridKategori);
  setText("val-maksHastighetKmT", m.maksHastighetKmT);
  setText("val-euroKlasse", m.euroKlasse);
  setText("val-co2BlandetKjoring", m.co2BlandetKjoring);
  setText("val-forbrukBlandetKjoring", m.forbrukBlandetKjoring);
  setText("val-noxUtslippMgKm", m.noxUtslippMgKm);
  setText("val-partikkelfilter", m.partikkelfilter);
  setText("val-rekkeviddeKm", m.rekkeviddeKm);
  setText("val-stoynivaaDb", m.stoynivaaDb);
};

/**
 * Populate the Mål & Vekt tab
 */
const populateMalOgVekt = (): void => {
  const v = remoteVehicleData.malOgVekt;
  setText("val-lengdeMm", v.lengdeMm);
  setText("val-breddeMm", v.breddeMm);
  setText("val-hoydeMm", v.hoydeMm);
  setText("val-egenvektKg", v.egenvektKg);
  setText("val-nyttelastKg", v.nyttelastKg);
  setText("val-tillattTotalvektKg", v.tillattTotalvektKg);
  setText("val-tillattTaklastKg", v.tillattTaklastKg);
  setText("val-tillattTilhengervektMedBremsKg", v.tillattTilhengervektMedBremsKg);
  setText("val-tillattTilhengervektUtenBremsKg", v.tillattTilhengervektUtenBremsKg);
  setText("val-tillattVogntogvektKg", v.tillattVogntogvektKg);
  setText("val-sitteplasserTotalt", v.sitteplasserTotalt);
  setText("val-sitteplasserForan", v.sitteplasserForan);
  setText("val-antallDorer", v.antallDorer);
  setText("val-kjoreSide", v.kjoreSide);
};

/**
 * Populate the Teknisk tab
 */
const populateTeknisk = (): void => {
  const t = remoteVehicleData.teknisk;
  setText("val-antallAksler", t.antallAksler);
  setText("val-dekkdimensjonForan", t.dekkdimensjonForan);
  setText("val-felgdimensjonForan", t.felgdimensjonForan);
  setText("val-hastighetsKodeDekkForan", t.hastighetsKodeDekkForan);
  setText("val-dekkdimensjonBak", t.dekkdimensjonBak);
  setText("val-felgdimensjonBak", t.felgdimensjonBak);
  setText("val-hastighetsKodeDekkBak", t.hastighetsKodeDekkBak);
  setText("val-sporviddeForanMm", t.sporviddeFoyanMm);
  setText("val-sporviddeBakMm", t.sporviddeBakMm);
  setText("val-tilhengerkopling", t.tilhengerkopling);
};

/**
 * Add all remote data to the 4 tab sections + header
 */
const addDataToTabs = (): void => {
  populateHeader();
  populateOversikt();
  populateMotorOgYtelse();
  populateMalOgVekt();
  populateTeknisk();
};

/**
 * Process the remote data — check for errors, then populate UI
 */
const processRemoteData = (): void => {
  if (remoteVehicleData.melding !== undefined) {
    classErrorHandler.displayErrorFromAPI(remoteVehicleData.melding);
    classShowHideElements.hideVehicleResults();
    return;
  }

  classShowHideElements.hideLoadingSpinner();
  classShowHideElements.showVehicleResults();
  addDataToTabs();
  classErrorHandler.resetErrorText();
};

/**
 * Called when the form is submitted
 */
const sendForm = (): void => {
  classShowHideElements.showLoadingSpinner();
  classShowHideElements.hideVehicleResults();

  classFetchRemoteData
    .fetchRemoteData()
    .then((response) => {
      remoteVehicleData = response;
      processRemoteData();
    })
    .catch(() => {
      return;
    });
};

export default sendForm;
