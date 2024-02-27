import { useBasicCarumStore } from "@/store/formStore";
import React from "react";

const Summary = () => {
  const { kapitalEPF, dividenTahunan, pungutanDividen, jumlahBesarCaruman } =
    useBasicCarumStore();

  return (
    <div>
      <p>
        Jika dihitung dengan kapital semasa anda iaitu RM {kapitalEPF} bersama
        kadar dividen tahunan sebanyak{" "}
        <span className="font-bold text-red-500">RM {dividenTahunan}</span>%,
        anda akan mendapat{" "}
        <span className="font-bold text-red-500">RM {pungutanDividen}</span>{" "}
        dividen setahun. Jumlah anggaran caruman untuk tahun berkenaan adalah{" "}
        <span className="font-bold text-red-500">RM {jumlahBesarCaruman}</span>.
      </p>
    </div>
  );
};

export { Summary };
