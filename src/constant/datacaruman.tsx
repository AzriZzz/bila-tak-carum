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
  capitalSemasaEPF: 10000,
  jenisAkaun: "konvensional" as const,
  kadarDividenTahunan: "0.00",
  akaun1: 7000,
  akaun2: 3000,
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
  { value: "2022 - 5.35", label: "2022 - 5.35" },
  { value: "2021 - 6.10", label: "2021 - 6.10" },
  { value: "2020 - 5.20", label: "2020 - 5.20" },
  { value: "2019 - 5.45", label: "2019 - 5.45" },
  { value: "2018 - 6.15", label: "2018 - 6.15" },
  { value: "2017 - 6.90", label: "2017 - 6.90" },
  { value: "2016 - 5.70", label: "2016 - 5.70" },
  { value: "2015 - 6.40", label: "2015 - 6.40" },
  { value: "2014 - 6.75", label: "2014 - 6.75" },
];

export const KADAR_FAEDAH_SHARIAH_TAHUNAN: IKadarFaedah[] = [
  { value: "2022 - 4.75", label: "2022 - 4.75" },
  { value: "2021 - 5.65", label: "2021 - 5.65" },
  { value: "2020 - 4.90", label: "2020 - 4.90" },
  { value: "2019 - 5.00", label: "2019 - 5.00" },
  { value: "2018 - 5.90", label: "2018 - 5.90" },
  { value: "2017 - 6.40", label: "2017 - 6.40" },
];
