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
  carumanJumlahSetahunPekerjaMajikan,
  carumanSetahun,
  kiraDividenBulanan,
  kiraDividenBulananAkaun1,
  kiraDividenBulananAkaun2,
} from "@/util/caruman";
import { MONTHS } from "@/constant/date";

const JadualCarumanDanDividen = () => {
  const {
    satuBulanPekerja,
    satuBulanMajikan,
    carumanMasuk,
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
          {pembukaAkaun1IkutBulan.toFixed(2)}
        </TableCell>
        <TableCell className="font-semibold text">
          {pembukaAkaun2IkutBulan.toFixed(2)}
        </TableCell>
        <TableCell className="max-sm:hidden font-semibold text">
          {satuBulanPekerja}
        </TableCell>
        <TableCell className="max-sm:hidden font-semibold text">
          {satuBulanMajikan}
        </TableCell>
        <TableCell className="font-semibold text">
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
    <div className="grid grid-cols-1 pt-5">
      <div className="col-span-1 pb-4 md:pb-0">
        <Table>
          <TableCaption className="mt-0 mb-4">
            Ringkasan Caruman Dan Dividen
          </TableCaption>
          <TableHeader className=" bg-slate-100">
            <TableRow>
              <TableHead>Jenis Akaun </TableHead>
              <TableHead>Baki Pembuka (RM)</TableHead>
              <TableHead>Caruman Masuk (RM)</TableHead>
              <TableHead className=" ">Dividen Tahunan ** (RM)</TableHead>
              <TableHead className=" text-right">Jumlah (RM)</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Akaun 1</TableCell>
              <TableCell>{akaun1.toFixed(2)}</TableCell>
              <TableCell>{(carumanMasuk * 0.7).toFixed(2)}</TableCell>
              <TableCell>{cumulativeDividendAkaun1.toFixed(2)}</TableCell>
              <TableCell className="text-right">
                {(
                  akaun1 +
                  carumanMasuk * 0.7 +
                  cumulativeDividendAkaun1
                ).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Akaun 2</TableCell>
              <TableCell>{akaun2.toFixed(2)}</TableCell>
              <TableCell>{(carumanMasuk * 0.3).toFixed(2)}</TableCell>
              <TableCell>{cumulativeDividendAkaun2.toFixed(2)}</TableCell>
              <TableCell className="text-right">
                {(
                  akaun2 +
                  carumanMasuk * 0.3 +
                  cumulativeDividendAkaun2
                ).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium"></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className="font-bold">Jumlah</TableCell>
              <TableCell className="text-right font-bold">
                {(
                  akaun1 +
                  carumanMasuk * 0.7 +
                  cumulativeDividendAkaun1 +
                  (akaun2 + carumanMasuk * 0.3 + cumulativeDividendAkaun2)
                ).toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="col-span-1">
        <Table>
          <TableCaption className="mt-0 mb-4">
            Illustrasi Caruman Dan Dividen
          </TableCaption>
          <TableHeader className="bg-slate-100">
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
              <TableHead>Caruman Bulanan (RM)</TableHead>
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

      <br />
      <div className="text-center">
        <h3 className=" text-md font-semibold pb-4">Rumusan</h3>
        <p>
          Apabila bakal syarikat tidak mencarum KWSP/EPF, anda tidak layak untuk
          mendapat caruman majikan iaitu sebanyak{" "}
          <span className="font-bold text-red-500">RM {satuBulanMajikan}</span>{" "}
          sebulan. Jika dihitung selama 12 bulan, anda akan kerugian sebanyak{" "}
          <span className="font-bold text-red-500">
            RM {carumanSetahun(satuBulanMajikan)}
          </span>{" "}
          dan sejumlah{" "}
          <span className="font-bold text-red-500">
            RM{" "}
            {carumanJumlahSetahunPekerjaMajikan(
              satuBulanPekerja,
              satuBulanMajikan
            )}
          </span>{" "}
          (setahun) untuk disimpan dalam tabung wang persaraan anda.
        </p>
        <br />

        <p>
          Dengan kadar dividen{" "}
          <span className="font-bold text-red-500">
            {pungutanDividen.toFixed(2)}%
          </span>{" "}
          setahun, anda berpotensi mendapat dividen sebanyak{" "}
          <span className="font-bold text-red-500">
            RM {cumulativeDividendAkaun1.toFixed(2)}
          </span>{" "}
          untuk akaun 1 dan{" "}
          <span className="font-bold text-red-500">
            RM {cumulativeDividendAkaun2.toFixed(2)}
          </span>{" "}
          untuk akaun 2. Jumlah dividen yang anda layak terima adalah sebanyak
          <span className="font-bold text-red-500">
            {""} RM{" "}
            {(cumulativeDividendAkaun1 + cumulativeDividendAkaun2).toFixed(2)}
          </span>{" "}
          untuk tahun {tahun}.
        </p>
      </div>
    </div>
  );
};

export { JadualCarumanDanDividen };
