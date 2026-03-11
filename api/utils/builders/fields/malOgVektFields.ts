import type { FieldDescriptor } from "../buildFields";
import type { MalOgVektSources } from "../sources";

/** Declarative field definitions for the Mål & Vekt section */
export const malOgVektFields: ReadonlyArray<FieldDescriptor<MalOgVektSources>> = [
  { key: "lengdeMm", type: "num", get: (s) => s.dimensjoner?.lengde },
  { key: "breddeMm", type: "num", get: (s) => s.dimensjoner?.bredde },
  { key: "hoydeMm", type: "num", get: (s) => s.dimensjoner?.hoyde },
  { key: "egenvektKg", type: "num", get: (s) => s.vekter?.egenvekt },
  { key: "nyttelastKg", type: "num", get: (s) => s.vekter?.nyttelast },
  { key: "tillattTotalvektKg", type: "num", get: (s) => s.vekter?.tillattTotalvekt },
  { key: "tillattTaklastKg", type: "num", get: (s) => s.vekter?.tillattTaklast },
  { key: "tillattTilhengervektMedBremsKg", type: "num", get: (s) => s.vekter?.tillattTilhengervektMedBrems },
  { key: "tillattTilhengervektUtenBremsKg", type: "num", get: (s) => s.vekter?.tillattTilhengervektUtenBrems },
  { key: "tillattVogntogvektKg", type: "num", get: (s) => s.vekter?.tillattVogntogvekt },
  { key: "sitteplasserTotalt", type: "num", get: (s) => s.persontall?.sitteplasserTotalt },
  { key: "sitteplasserForan", type: "num", get: (s) => s.persontall?.sitteplasserForan },
  { key: "antallDorer", type: "num", get: (s) => s.karosseri?.antallDorer?.[0] },
  { key: "kjoreSide", type: "str", get: (s) => s.karosseri?.kjoringSide },
];
