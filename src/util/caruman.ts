import { advancedFormSchemas } from "@/schemas/schemas";
import { Caruman } from "@/types/form";
import { z } from "zod";
import { getDays } from "./date";

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

const jumlahDividenAkaunTakTermasukHariTerakhir = (
  akaun1: number,
  dividen: number,
  hariDalamTahun: number,
  hariDalamBulan: number
) => {
  return ((akaun1 * (dividen / 100)) / hariDalamTahun) * (hariDalamBulan - 1);
};

const kiraJumlahAkaun1HariTerakhir = (
  akaun: number,
  caruman: number,
  dividen: number,
  hariDalamTahun: number
) => {
  return ((akaun + caruman * 0.7) * (dividen / 100)) / hariDalamTahun;
};

const kiraJumlahAkaun2HariTerakhir = (
  akaun: number,
  caruman: number,
  dividen: number,
  hariDalamTahun: number
) => {
  return ((akaun + caruman * 0.3) * (dividen / 100)) / hariDalamTahun;
};

export const kiraDividenBulanan = (
  bulan: string,
  akaun1: number,
  akaun2: number,
  caruman: number,
  dividen: number,
  tahun: number
) => {
  const a = kiraDividenBulananAkaun1(bulan, akaun1, caruman, dividen, tahun);
  const b = kiraDividenBulananAkaun2(bulan, akaun2, caruman, dividen, tahun);

  return (Number(a) + Number(b)).toFixed(2);
};

export const kiraDividenBulananAkaun1 = (
  bulan: string,
  akaun1: number,
  caruman: number,
  dividen: number,
  tahun: number
) => {
  const { hariDalamTahun, hariDalamBulan } = getDays(tahun, bulan);

  const jumlahDividenAkaun1TakTermasukHariTerakhir =
    jumlahDividenAkaunTakTermasukHariTerakhir(
      akaun1,
      dividen,
      hariDalamTahun,
      hariDalamBulan
    );

  const jumlahAkaun1HariTerakhir = kiraJumlahAkaun1HariTerakhir(
    akaun1,
    caruman,
    dividen,
    hariDalamTahun
  );

  const totalJumlahDividenIkutBulan = (
    jumlahDividenAkaun1TakTermasukHariTerakhir + jumlahAkaun1HariTerakhir
  ).toFixed(2);

  return totalJumlahDividenIkutBulan;
};

export const kiraDividenBulananAkaun2 = (
  bulan: string,
  akaun2: number,
  caruman: number,
  dividen: number,
  tahun: number
) => {
  const { hariDalamTahun, hariDalamBulan } = getDays(tahun, bulan);

  const jumlahDividenAkaun2TakTermasukHariTerakhir =
    jumlahDividenAkaunTakTermasukHariTerakhir(
      akaun2,
      dividen,
      hariDalamTahun,
      hariDalamBulan
    );

  const jumlahAkaun2HariTerakhir = kiraJumlahAkaun2HariTerakhir(
    akaun2,
    caruman,
    dividen,
    hariDalamTahun
  );

  const totalJumlahDividenIkutBulan = (
    jumlahDividenAkaun2TakTermasukHariTerakhir + jumlahAkaun2HariTerakhir
  ).toFixed(2);

  return totalJumlahDividenIkutBulan;
};
