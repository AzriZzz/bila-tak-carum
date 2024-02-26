import {
  KADAR_FAEDAH_KONVENSIONAL_TAHUNAN,
  KADAR_FAEDAH_SHARIAH_TAHUNAN,
} from "@/constant/datacaruman";
import { Caruman } from "@/types/form";

export const carumanSebulan = (data: Caruman) => {
  const { gaji, carumanPekerja, carumanMajikan } = data;
  const carumanPekerjaPercentage = Number(carumanPekerja) / 100;
  const carumanMajikanPercentage = Number(carumanMajikan) / 100;

  const satuBulanCarumanPekerja = (gaji * carumanPekerjaPercentage).toFixed(2);
  const satuBulanCarumanMajikan = (gaji * carumanMajikanPercentage).toFixed(2);
  return {
    satuBulanCarumanPekerja,
    satuBulanCarumanMajikan,
  };
};

export const carumanJumlahSebulanPekerjaMajikan = (
  satuBulanPekerja: string,
  satuBulanMajikan: string
) => {
  return (Number(satuBulanPekerja) + Number(satuBulanMajikan)).toFixed(2);
};

export const carumanSetahun = (carumSetahun: string) => {
  return (Number(carumSetahun) * 12).toFixed(2);
};

export const carumanJumlahSetahunPekerjaMajikan = (
  satuBulanPekerja: string,
  satuBulanMajikan: string
) => {
  return (
    Number(satuBulanPekerja) * 12 +
    Number(satuBulanMajikan) * 12
  ).toFixed(2);
};
