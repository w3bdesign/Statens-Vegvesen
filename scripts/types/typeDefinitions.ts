/**
 * Type definition for data returned from API.
 * Returns an object with strings.
 */

export interface IStatensVegvesenBilData {
  // Will return error message if the car was not found
  melding: string;
  /**
   * Registration number for personalised number plate)
   * @see https://www.vegvesen.no/en/vehicles/own-and-maintain/number-plates/personalised-number-plates
   */
  kjennemerke: string;
  // Details about when car was registered for the first time
  forstegangsregistrering: string;
  // Details about when car was registered on owner
  forstegangsregistreringEier: string;
  // Last time the car had a mandatory roadworthiness test
  sistKontrollert: string;
}
