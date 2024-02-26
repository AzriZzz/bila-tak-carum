"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  DEFAULT_ADVANCED_FORM_VALUES,
  KADAR_FAEDAH_KONVENSIONAL_TAHUNAN,
  KADAR_FAEDAH_SHARIAH_TAHUNAN,
} from "@/constant/datacaruman";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { advancedFormSchemas } from "@/schemas/schemas";
import { useBasicCarumStore } from "@/store/formStore";
import {
  carumanJumlahSebulanPekerjaMajikan,
  carumanJumlahSetahunPekerjaMajikan,
  carumanSetahun,
  carumanSebulan,
} from "@/util/caruman";

const formSchema = z.object(advancedFormSchemas);

const FormPanjang = () => {
  const [dahKira, setDahKira] = useState(false);
  const [jenisAkaunEPF, setJenisAkaunEPF] = useState("konvensional");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_ADVANCED_FORM_VALUES,
  });

  const satuBulanPekerja = useBasicCarumStore(
    (state) => state.satuBulanPekerja
  );
  const satuBulanMajikan = useBasicCarumStore(
    (state) => state.satuBulanMajikan
  );

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
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
                        <SelectItem value="12" defaultChecked>
                          12
                        </SelectItem>
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
                name="capitalSemasaEPF"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kapital Semasa EPF</FormLabel>
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
                      Boleh semak di kenyataan akaun KWSP/EPF
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-1">
              <FormField
                control={form.control}
                name="jenisAkaun"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Jenis Akaun</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(newValue) => {
                          field.onChange(newValue);
                          setDahKira(false);
                          setJenisAkaunEPF(newValue);
                        }}
                        defaultValue="konvensional"
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value="konvensional"
                              defaultChecked
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Konvensional
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="shariah" />
                          </FormControl>
                          <FormLabel className="font-normal">Shariah</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-1">
              {jenisAkaunEPF === "konvensional" ? (
                <FormField
                  control={form.control}
                  name="kadarKonvensional"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dividen Tahun Semasa (%)</FormLabel>
                      <Select
                        onValueChange={(newValue) => {
                          field.onChange(newValue);
                          setDahKira(false);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih dividen" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {
                            KADAR_FAEDAH_KONVENSIONAL_TAHUNAN.map((item) => (
                              <SelectItem
                                key={item.value}
                                value={item.value}
                                defaultChecked={item.defaultChecked}
                              >
                                {item.label}
                              </SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <FormField
                  control={form.control}
                  name="kadarShariah"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dividen Tahun Semasa (%)</FormLabel>
                      <Select
                        onValueChange={(newValue) => {
                          field.onChange(newValue);
                          setDahKira(false);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih dividen" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {KADAR_FAEDAH_SHARIAH_TAHUNAN.map((item) => (
                            <SelectItem
                              key={item.value}
                              value={item.value}
                              defaultChecked={item.defaultChecked}
                            >
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
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
          <Table>
            <TableCaption>Jadual Pembayaran Caruman</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Bulan</TableHead>
                <TableHead>Caruman Pekerja</TableHead>
                <TableHead>Caruman Majikan</TableHead>
                <TableHead className="text-right">Jumlah</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Januari</TableCell>
                <TableCell>RM {satuBulanPekerja}</TableCell>
                <TableCell>RM {satuBulanMajikan}</TableCell>
                <TableCell className="text-right">
                  RM{" "}
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
                <TableCell>RM {satuBulanPekerja}</TableCell>
                <TableCell>RM {satuBulanMajikan}</TableCell>
                <TableCell className="text-right">
                  RM{" "}
                  {carumanJumlahSebulanPekerjaMajikan(
                    satuBulanPekerja,
                    satuBulanMajikan
                  )}{" "}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-semibold">Jumlah</TableCell>
                <TableCell className="font-semibold">
                  RM {carumanSetahun(satuBulanPekerja)}
                </TableCell>
                <TableCell className="font-semibold">
                  RM {carumanSetahun(satuBulanMajikan)}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  RM{" "}
                  {carumanJumlahSetahunPekerjaMajikan(
                    satuBulanPekerja,
                    satuBulanMajikan
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

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

export { FormPanjang };
