import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useBasicCarumStore } from "@/store/formStore";
import { kiraDividenBulanan } from "@/util/caruman";
import { MONTHS } from "@/constant/date";

const JadualCarumanDanDividen = () => {
  const {
    satuBulanPekerja,
    satuBulanMajikan,
    kapitalEPF,
    carumanMasuk,
    dividenTahunan,
    jumlahBesarCaruman,
    pungutanDividen,
    akaun1,
    akaun2,
    tahun,
  } = useBasicCarumStore();

  const calculateJumlahDividenIkutBulan = (
    month: string,
    pembukaAkaun1IkutBulan: number,
    pembukaAkaun2IkutBulan: number,
    pungutanDividen: number,
    tahun: string
  ) => {
    const totalJumlahDividenIkutBulan = kiraDividenBulanan(
      month,
      pembukaAkaun1IkutBulan, // akaun 1
      pembukaAkaun2IkutBulan, // akaun 2
      carumanMasuk, // caruman
      pungutanDividen,
      Number(tahun)
    );

    return totalJumlahDividenIkutBulan;
  };

  const carumanBulanan = Number(satuBulanPekerja) + Number(satuBulanMajikan);

  const renderTableRow = (
    month: string,
    akaun1: number,
    akaun2: number,
    satuBulanPekerja: string,
    satuBulanMajikan: string,
    carumanBulanan: number
  ) => {
    const pembukaAkaun1IkutBulan = akaun1 + carumanBulanan * 0.7;
    const pembukaAkaun2IkutBulan = akaun2 + carumanBulanan * 0.3;

    return (
      <TableRow key={month}>
        <TableCell className="font-semibold">{month}</TableCell>
        <TableCell className="font-semibold">
          {pembukaAkaun1IkutBulan}
        </TableCell>
        <TableCell className="font-semibold text">
          {pembukaAkaun2IkutBulan}
        </TableCell>
        <TableCell className="max-sm:hidden font-semibold text">
          {satuBulanPekerja}
        </TableCell>
        <TableCell className="max-sm:hidden font-semibold text">
          {satuBulanMajikan}
        </TableCell>
        <TableCell className="max-sm:hidden font-semibold text">
          {carumanBulanan}
        </TableCell>
        <TableCell className="text-right font-semibold">
          {calculateJumlahDividenIkutBulan(
            month,
            pembukaAkaun1IkutBulan,
            pembukaAkaun2IkutBulan,
            pungutanDividen,
            tahun
          )}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className="pt-5">
      <Table>
        <TableCaption className="mt-0 mb-4">
          Illustrasi Caruman Dan Dividen
        </TableCaption>
        <TableHeader className=" bg-slate-100">
          <TableRow>
            <TableHead>Bulan</TableHead>
            <TableHead>Akaun 1 (RM)</TableHead>
            <TableHead>Akaun 2 (RM)</TableHead>

            <TableHead className=" max-sm:hidden">
              Caruman Pekerja (RM)
            </TableHead>
            <TableHead className="max-sm:hidden">
              Caruman Majikan (RM)
            </TableHead>
            <TableHead className="max-sm:hidden">
              Caruman Bulanan (RM)
            </TableHead>
            <TableHead className="text-right">Dividen Bulanan (RM)</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {MONTHS.map((month, index) =>
            renderTableRow(
              month,
              akaun1 + carumanBulanan * index * 0.7,
              akaun2 + carumanBulanan * index * 0.3,
              satuBulanPekerja,
              satuBulanMajikan,
              carumanBulanan
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export { JadualCarumanDanDividen };
