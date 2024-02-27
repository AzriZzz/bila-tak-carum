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
  carumanJumlahSebulanPekerjaMajikan,
  carumanJumlahSetahunPekerjaMajikan,
  carumanSetahun,
} from "@/util/caruman";
import { JadualCarumanDanDividen } from "./jadualCarumanDanDividen";
import { Summary } from "../summary";
const JadualCaruman = () => {
  const { satuBulanPekerja, satuBulanMajikan } = useBasicCarumStore();

  return (
    <div className="pt-3">
      <Table>
        <TableCaption className="mt-0 mb-4">
          Jadual Pembayaran Caruman
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Bulan</TableHead>
            <TableHead>Caruman Pekerja (RM)</TableHead>
            <TableHead>Caruman Majikan (RM)</TableHead>
            <TableHead className="text-right">Jumlah (RM)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Januari</TableCell>
            <TableCell>{satuBulanPekerja}</TableCell>
            <TableCell>{satuBulanMajikan}</TableCell>
            <TableCell className="text-right">
              {carumanJumlahSebulanPekerjaMajikan(
                satuBulanPekerja,
                satuBulanMajikan
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">...</TableCell>
            <TableCell>...</TableCell>
            <TableCell>...</TableCell>
            <TableCell className="text-right">...</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Disember</TableCell>
            <TableCell>{satuBulanPekerja}</TableCell>
            <TableCell>{satuBulanMajikan}</TableCell>
            <TableCell className="text-right">
              {carumanJumlahSebulanPekerjaMajikan(
                satuBulanPekerja,
                satuBulanMajikan
              )}{" "}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-semibold">Jumlah</TableCell>
            <TableCell className="font-semibold">
              {carumanSetahun(satuBulanPekerja)}
            </TableCell>
            <TableCell className="font-semibold">
              {carumanSetahun(satuBulanMajikan)}
            </TableCell>
            <TableCell className="text-right font-semibold">
              {carumanJumlahSetahunPekerjaMajikan(
                satuBulanPekerja,
                satuBulanMajikan
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <JadualCarumanDanDividen />

      <div className="pt-5 text-center">
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
        <p></p>

        <Summary />
      </div>
    </div>
  );
};

export { JadualCaruman };
