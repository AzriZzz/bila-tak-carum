import { IKadarFaedah } from "@/types/form";

export const DEFAULT_FORM_VALUES = {
  gaji: 3000,
  carumanPekerja: "11",
  carumanMajikan: "12",
};

export const DEFAULT_ADVANCED_FORM_VALUES = {
  gaji: 3000,
  carumanPekerja: "11",
  carumanMajikan: "12",
  capitalSemasaEPF: "10000",
  jenisAkaun: "konvensional" as const,
  kadarKonvensional: "5.35",
  kadarShariah: "4.75",
};

export const PILIHAN_CARUMAN_PEKERJA = [
  { value: "7", label: "7" },
  { value: "9", label: "9" },
  { value: "11", label: "11" },
  { value: "12", label: "12" },
  { value: "13", label: "13" },
];

export const PILIHAN_CARUMAN_MAJIKAN = [
  { value: "11", label: "11" },
  { value: "12", label: "12" },
  { value: "13", label: "13" },
];

export const KADAR_FAEDAH_KONVENSIONAL_TAHUNAN: IKadarFaedah[] = [
  { value: "5.35", label: "2022 - 5.35", defaultChecked: false },
  { value: "6.10", label: "2021 - 6.10", defaultChecked: false },
  { value: "5.20", label: "2020 - 5.20", defaultChecked: false },
  { value: "5.45", label: "2019 - 5.45", defaultChecked: false },
  { value: "6.15", label: "2018 - 6.15", defaultChecked: false },
  { value: "6.90", label: "2017 - 6.90", defaultChecked: false },
  { value: "5.70", label: "2016 - 5.70", defaultChecked: false },
  { value: "6.40", label: "2015 - 6.40", defaultChecked: false },
  { value: "6.75", label: "2014 - 6.75", defaultChecked: false },
];

export const KADAR_FAEDAH_SHARIAH_TAHUNAN: IKadarFaedah[] = [
  { value: "4.75", label: "2022 - 4.75", defaultChecked: false },
  { value: "5.65", label: "2021 - 5.65", defaultChecked: false },
  { value: "4.90", label: "2020 - 4.90", defaultChecked: false },
  { value: "5.00", label: "2019 - 5.00", defaultChecked: false },
  { value: "5.90", label: "2018 - 5.90", defaultChecked: false },
  { value: "6.40", label: "2017 - 6.40", defaultChecked: false },
];


