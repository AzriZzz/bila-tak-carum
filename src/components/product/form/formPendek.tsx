"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DEFAULT_FORM_VALUES } from "@/constant/datacaruman";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { basicFormSchemas } from "@/schemas/schemas";
import { useBasicCarumStore } from "@/store/formStore";
import {
  carumanJumlahSebulanPekerjaMajikan,
  carumanJumlahSetahunPekerjaMajikan,
  carumanSetahun,
  carumanSebulan,
} from "@/util/caruman";
import { MONTHS } from "@/constant/date";

const formSchema = z.object(basicFormSchemas);

const FormPendek = () => {
  const [dahKira, setDahKira] = useState(false);
  const [semakGaji, setSemakGaji] = useState(5000);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const satuBulanPekerja = useBasicCarumStore(
    (state) => state.satuBulanPekerja
  );
  const satuBulanMajikan = useBasicCarumStore(
    (state) => state.satuBulanMajikan
  );

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const { satuBulanCarumanPekerja, satuBulanCarumanMajikan } =
      carumanSebulan(data);

    useBasicCarumStore.setState({ satuBulanPekerja: satuBulanCarumanPekerja });
    useBasicCarumStore.setState({ satuBulanMajikan: satuBulanCarumanMajikan });

    setDahKira(true);
  };

  const resetCaruman = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    form.reset();
    setDahKira(false);
  };

  const renderTableRows = () => {
    return MONTHS.map((month, index) => (
      <TableRow key={index}>
        <TableCell className="font-medium">{month}</TableCell>
        <TableCell>{satuBulanPekerja}</TableCell>
        <TableCell>{satuBulanMajikan}</TableCell>
        <TableCell className="text-right">
          {carumanJumlahSebulanPekerjaMajikan(
            satuBulanPekerja,
            satuBulanMajikan
          )}
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div className="md:w-[700px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="gaji"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tawaran Gaji (RM)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="RM 0.00"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setDahKira(false);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Gaji ditawarkan oleh bakal Majikan
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="carumanPekerja"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Caruman Pekerja (%)</FormLabel>
                    <Select
                      onValueChange={(newValue) => {
                        field.onChange(newValue);
                        setDahKira(false);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Caruman Pekerja" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="7">7</SelectItem>
                        <SelectItem value="9">9</SelectItem>
                        <SelectItem value="11" defaultChecked>
                          11
                        </SelectItem>
                        <SelectItem value="12">12</SelectItem>
                        <SelectItem value="13">13</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-1">
              <FormField
                control={form.control}
                name="carumanMajikan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Caruman Majikan (%)</FormLabel>
                    <Select
                      onValueChange={(newValue) => {
                        field.onChange(newValue);
                        setDahKira(false);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Caruman Majikan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="11">11</SelectItem>
                        <SelectItem value="12">12</SelectItem>
                        <SelectItem value="13">13</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-center pt-5">
            {dahKira ? (
              <Button
                onClick={resetCaruman}
                className=" bg-blue-500 hover:bg-blue-300"
                type="button"
              >
                Kira Balik
              </Button>
            ) : (
              <Button type="submit" className=" bg-blue-500 hover:bg-blue-300">
                Kira Caruman
              </Button>
            )}
          </div>
        </form>
      </Form>

      {dahKira && (
        <div className="pt-3">
          <div className="grid grid-cols-1">
            <div className="col-span-1">
              <Table>
                <TableCaption>Jadual Pembayaran Caruman</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Bulan</TableHead>
                    <TableHead>
                      Caruman Pekerja ({form.getValues("carumanPekerja")}%)
                    </TableHead>
                    <TableHead>
                      Caruman Majikan ({form.getValues("carumanMajikan")}%)
                    </TableHead>
                    <TableHead className="text-right">Jumlah (RM)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {renderTableRows()}
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
            </div>
          </div>

          <div className="pt-5 text-center">
            <h3 className=" text-md font-semibold pb-4">Rumusan</h3>
            <p>
              Apabila bakal syarikat tidak mencarum KWSP/EPF, anda tidak layak
              untuk mendapat caruman majikan iaitu sebanyak{" "}
              <span className="font-bold text-red-500">
                RM {satuBulanMajikan}
              </span>{" "}
              sebulan. Jika dihitung selama 12 bulan, anda akan kerugian
              sebanyak{" "}
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
          </div>
        </div>
      )}
    </div>
  );
};

export { FormPendek };
