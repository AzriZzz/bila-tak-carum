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
import {
  kiraDividenBulanan,
  kiraDividenBulananAkaun1,
  kiraDividenBulananAkaun2,
} from "@/util/caruman";
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

  const carumanBulanan = Number(satuBulanPekerja) + Number(satuBulanMajikan);

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
      carumanBulanan, // caruman
      pungutanDividen,
      Number(tahun)
    );

    return totalJumlahDividenIkutBulan;
  };

  const renderTableRow = (
    month: string,
    akaun1: number,
    akaun2: number,
    satuBulanPekerja: string,
    satuBulanMajikan: string,
    carumanBulanan: number,
    index: number
  ) => {
    const pembukaAkaun1IkutBulan = akaun1 + carumanBulanan * 0.7;
    const pembukaAkaun2IkutBulan = akaun2 + carumanBulanan * 0.3;
    return (
      <TableRow key={`${month + index}`}>
        <TableCell className="font-semibold">{month}</TableCell>
        <TableCell className="font-semibold">
          {" "}
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
          {carumanBulanan.toFixed(2)}
        </TableCell>
        <TableCell className="text-right font-semibold">
          {calculateJumlahDividenIkutBulan(
            month,
            akaun1,
            akaun2,
            pungutanDividen,
            tahun
          )}
        </TableCell>
      </TableRow>
    );
  };

  const cumulativeDividendAkaun1 = MONTHS.reduce(
    (accumulator, month, index) => {
      const akaunDanCaruman = akaun1 + carumanBulanan * index * 0.7;
      const totalJumlahDividenIkutBulan = kiraDividenBulananAkaun1(
        month,
        akaunDanCaruman,
        carumanBulanan,
        pungutanDividen,
        Number(tahun)
      );

      return accumulator + parseFloat(totalJumlahDividenIkutBulan);
    },
    0
  );

  const cumulativeDividendAkaun2 = MONTHS.reduce(
    (accumulator, month, index) => {
      const akaunDanCaruman = akaun2 + carumanBulanan * index * 0.3;

      const totalJumlahDividenIkutBulan = kiraDividenBulananAkaun2(
        month,
        akaunDanCaruman,
        carumanBulanan,
        pungutanDividen,
        Number(tahun)
      );

      return accumulator + parseFloat(totalJumlahDividenIkutBulan);
    },
    0
  );

  return (
    <div className="pt-5">
      <Table>
        <TableCaption className="mt-0 mb-4">
          Ringkasan Caruman Dan Dividen
        </TableCaption>
        <TableHeader className=" bg-slate-100">
          <TableRow>
            <TableHead>Jenis Akaun </TableHead>
            <TableHead>Baki Pembuka (RM)</TableHead>
            <TableHead>Caruman Masuk (RM)</TableHead>
            <TableHead className=" max-sm:hidden">
              Dividen Tahunan ** (RM)
            </TableHead>
            <TableHead className="max-sm:hidden">Jumlah (RM)</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Akaun 1</TableCell>
            <TableCell>{akaun1}</TableCell>
            <TableCell>{carumanMasuk * 0.7}</TableCell>
            <TableCell>{cumulativeDividendAkaun1.toFixed(2)}</TableCell>
            <TableCell className="text-right">
              {(akaun1 + carumanMasuk * 0.7 + cumulativeDividendAkaun1).toFixed(
                2
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Akaun 2</TableCell>
            <TableCell>{akaun2}</TableCell>
            <TableCell>{carumanMasuk * 0.3}</TableCell>
            <TableCell>{cumulativeDividendAkaun2.toFixed(2)}</TableCell>
            <TableCell className="text-right">
              {(akaun2 + carumanMasuk * 0.3 + cumulativeDividendAkaun2).toFixed(
                2
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

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
              carumanBulanan,
              index
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export { JadualCarumanDanDividen };
