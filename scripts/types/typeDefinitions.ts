/**
 * Type definition based on data returned from API
 */
export type TStatensVegvesenBilData = {
    // Will return error message if the car was not found
    melding: string;
    /**
     * Registration number for personalised number plate)
     * @see https://www.vegvesen.no/en/vehicles/own-and-maintain/number-plates/personalised-number-plates
     */
    kjennemerke: string;
    registrering: {
      // Details about when car was registered for the first time
      forstegangsregistrering: string;
      // Details about when car was registered on owner
      forstegangsregistreringEier: string;
    };
    // Last time the car had a mandatory roadworthiness test
    periodiskKjoretoykontroll: { sistKontrollert: string };
  };