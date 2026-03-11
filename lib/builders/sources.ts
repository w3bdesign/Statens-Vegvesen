/**
 * Source bundle interfaces — one per section.
 * Each bundle groups the nullable raw-data objects that a builder needs.
 */
import type {
  KjoretoydataListe,
  Generelt,
  KarosseriOgLasteplan,
  TekniskGodkjenning,
  Motor,
  MotorOgDrivverk,
  Miljodata,
  MiljoOgdrivstoffGruppe,
  ForbrukOgUtslipp,
  Dimensjoner,
  Vekter,
  Persontall,
  Akslinger,
  AkselDekkOgFelg,
  Aksel,
  Tilhengerkopling,
} from "../../scripts/types/typeDefinitions";

export interface OversiktSources {
  kjoretoy: KjoretoydataListe;
  generelt: Generelt | null;
  karosseri: KarosseriOgLasteplan | null;
  tekniskGodkjenning: TekniskGodkjenning | null;
}

export interface MotorOgYtelseSources {
  motor: Motor | null;
  motorOgDrivverk: MotorOgDrivverk | null;
  miljodata: Miljodata | null;
  miljoGruppe: MiljoOgdrivstoffGruppe | null;
  forbruk: ForbrukOgUtslipp | null;
}

export interface MalOgVektSources {
  dimensjoner: Dimensjoner | null;
  vekter: Vekter | null;
  persontall: Persontall | null;
  karosseri: KarosseriOgLasteplan | null;
}

export interface TekniskSources {
  akslinger: Akslinger | null;
  dekkForan: AkselDekkOgFelg | null;
  dekkBak: AkselDekkOgFelg | null;
  akselForan: Aksel | null;
  akselBak: Aksel | null;
  tilhengerkopling: Tilhengerkopling | null;
}
