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

const JadualCarumanDanDividen = () => {
  const { kapitalEPF, carumanMasuk, dividenTahunan, jumlahBesarCaruman, pungutanDividen } =
    useBasicCarumStore();

  console.log(kapitalEPF, carumanMasuk, dividenTahunan, jumlahBesarCaruman);
  return (
    <div>
      <Table>
        <TableCaption className="mt-0 mb-4">
          Illustrasi Caruman Dan Dividen
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Baki Pembuka (RM)</TableHead>
            <TableHead>Masuk (RM)</TableHead>
            <TableHead>Dividen Tahunan (%)</TableHead>
            <TableHead>Dividen Tahunan (RM)</TableHead>
            <TableHead className="text-right">Jumlah (RM)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-semibold">{kapitalEPF}</TableCell>
            <TableCell className="font-semibold">{carumanMasuk}</TableCell>
            <TableCell className="font-semibold text">
              {dividenTahunan}
            </TableCell>
            <TableCell className="font-semibold text">
              {pungutanDividen}
            </TableCell>
            <TableCell className="text-right font-semibold">
              {jumlahBesarCaruman}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export { JadualCarumanDanDividen };
