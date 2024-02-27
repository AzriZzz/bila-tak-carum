import { create } from "zustand";

type BasicCarumStore = {
  satuBulanPekerja: string;
  satuBulanMajikan: string;
  kapitalEPF: number;
  carumanMasuk: number;
  dividenTahunan: number;
  pungutanDividen: number;
  jumlahBesarCaruman: number;
  setSatuBulanPekerja: (value: string) => void;
  setDuaBelasBulanMajikan: (value: string) => void;
};

export const useBasicCarumStore = create<BasicCarumStore>((set) => ({
  satuBulanPekerja: "0.00",
  satuBulanMajikan: "0.00",
  kapitalEPF: 0,
  carumanMasuk: 0,
  dividenTahunan: 0,
  pungutanDividen: 0,
  jumlahBesarCaruman: 0,
  setSatuBulanPekerja: (value: string) => set({ satuBulanPekerja: value }),
  setDuaBelasBulanMajikan: (value: string) => set({ satuBulanMajikan: value }),
}));
