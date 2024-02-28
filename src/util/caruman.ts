import { advancedFormSchemas } from "@/schemas/schemas";
import { Caruman } from "@/types/form";
import { z } from "zod";
import { getDaysInMonth, getDaysInYear } from "./date";

const formSchema = z.object(advancedFormSchemas);

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

export const kiraJumlahBesarCaruman = (
  carumanMasuk: string,
  data: z.infer<typeof formSchema>
): { total: string; numberKadarPungutanDividen: string } => {
  const { capitalSemasaEPF, kadarDividenTahunan } = data;
  const valueA = Number(carumanMasuk) + Number(capitalSemasaEPF);
  const kadarPungutanDividen = (valueA * Number(kadarDividenTahunan)) / 100;
  const total = Number(valueA + kadarPungutanDividen).toFixed(2);
  const numberKadarPungutanDividen = Number(kadarPungutanDividen).toFixed(2);

  return { total, numberKadarPungutanDividen };
};

export const kiraDividenBulanan = (
  bulan: string,
  akaun1: number,
  akaun2: number,
  caruman: number,
  dividen: number,
  tahun: number
) => {
  console.log(bulan, akaun1, akaun2, caruman, dividen, tahun);
  // tahun is 2024 in string, find out how many days in that year
  const hariDalamTahun = getDaysInYear(tahun);

  // find out how many days in that month
  const hariDalamBulan = getDaysInMonth(tahun, bulan);

  // formula dividen tak masuk 1 hari last setiap bulan
  const jumlahDividenAkaun1TakTermasukHariTerakhir =
    ((akaun1 * (dividen / 100)) / hariDalamTahun) * (hariDalamBulan - 1);

  const jumlahDividenAkaun2TakTermasukHariTerakhir =
    ((akaun2 * (dividen / 100)) / hariDalamTahun) * (hariDalamBulan - 1);

  // formula (dividen / 100) masuk 1 hari last setiap bulan
  const jumlahAkaun1HariTerakhir =
    ((akaun1 + caruman * 0.7) * (dividen / 100)) / hariDalamTahun;

  const jumlahAkaun2HariTerakhir =
    ((akaun2 + caruman * 0.3) * (dividen / 100)) / hariDalamTahun;

  console.table([
    jumlahDividenAkaun1TakTermasukHariTerakhir,
    jumlahDividenAkaun2TakTermasukHariTerakhir,
    jumlahAkaun1HariTerakhir,
    jumlahAkaun2HariTerakhir,
  ]);

  const totalJumlahDividenIkutBulan =
    jumlahDividenAkaun1TakTermasukHariTerakhir +
    jumlahDividenAkaun2TakTermasukHariTerakhir +
    jumlahAkaun1HariTerakhir +
    jumlahAkaun2HariTerakhir;

  return totalJumlahDividenIkutBulan.toFixed(2);
};
