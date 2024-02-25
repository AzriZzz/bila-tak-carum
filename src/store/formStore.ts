import { create } from "zustand";

type BasicCarumStore = {
  satuBulanPekerja: string;
  satuBulanMajikan: string;
  setSatuBulanPekerja: (value: string) => void;
  setDuaBelasBulanMajikan: (value: string) => void;
};

export const useBasicCarumStore = create<BasicCarumStore>((set) => ({
  satuBulanPekerja: "0.00",
  setSatuBulanPekerja: (value: string) => set({ satuBulanPekerja: value }),
  satuBulanMajikan: "0.00",
  setDuaBelasBulanMajikan: (value: string) => set({ satuBulanMajikan: value }),
}));
