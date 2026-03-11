import { buildSection, FieldDescriptor } from "./buildFields";
import type {
  IMalOgVekt,
  Dimensjoner,
  Vekter,
  Persontall,
  KarosseriOgLasteplan,
} from "../../../scripts/types/typeDefinitions";

/** Source bundle passed into each field accessor */
interface MalOgVektSources {
  dimensjoner: Dimensjoner | null;
  vekter: Vekter | null;
  persontall: Persontall | null;
  karosseri: KarosseriOgLasteplan | null;
}

/** Declarative field definitions for the Mål & Vekt section */
const malOgVektFields: ReadonlyArray<FieldDescriptor<MalOgVektSources>> = [
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

/** Build the Mål & Vekt section of the vehicle data response */
export function buildMalOgVekt(
  dimensjoner: Dimensjoner | null,
  vekter: Vekter | null,
  persontall: Persontall | null,
  karosseri: KarosseriOgLasteplan | null,
): IMalOgVekt {
  return buildSection<MalOgVektSources, IMalOgVekt>(
    { dimensjoner, vekter, persontall, karosseri },
    malOgVektFields,
  );
}
