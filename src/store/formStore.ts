import { create } from "zustand";

type BasicCarumStore = {
  satuBulanPekerja: string;
  satuBulanMajikan: string;
  kapitalEPF: number;
  carumanMasuk: number;
  dividenTahunan: number;
  pungutanDividen: number;
  jumlahBesarCaruman: number;
  akaun1: number;
  akaun2: number;
  tahun: string;
};

export const useBasicCarumStore = create<BasicCarumStore>((set) => ({
  satuBulanPekerja: "0.00",
  satuBulanMajikan: "0.00",
  kapitalEPF: 0,
  carumanMasuk: 0,
  dividenTahunan: 0,
  pungutanDividen: 0,
  jumlahBesarCaruman: 0,
  akaun1: 0,
  akaun2: 0,
  tahun: '',
}));
