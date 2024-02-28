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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { advancedFormSchemas } from "@/schemas/schemas";
import { useBasicCarumStore } from "@/store/formStore";
import {
  carumanJumlahSetahunPekerjaMajikan,
  carumanSebulan,
  kiraJumlahBesarCaruman,
} from "@/util/caruman";
import Link from "next/link";
import { JadualCaruman, JadualCarumanDanDividen } from "../table";

const formSchema = z.object(advancedFormSchemas);

const FormPanjang = () => {
  const [dahKira, setDahKira] = useState(false);
  const [jenisAkaunEPF, setJenisAkaunEPF] = useState("konvensional");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_ADVANCED_FORM_VALUES,
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    const { kadarDividenTahunan, akaun1, akaun2 } = data;
    const splitValues = kadarDividenTahunan.split(" - ");

    const tahun = splitValues[0];
    const dividend = splitValues[1];

    const { satuBulanCarumanPekerja, satuBulanCarumanMajikan } =
      carumanSebulan(data);

    const carumanMasuk = carumanJumlahSetahunPekerjaMajikan(
      satuBulanCarumanPekerja,
      satuBulanCarumanMajikan
    );

    const { total, numberKadarPungutanDividen } = kiraJumlahBesarCaruman(
      carumanMasuk,
      data
    );

    useBasicCarumStore.setState({ satuBulanPekerja: satuBulanCarumanPekerja });
    useBasicCarumStore.setState({ satuBulanMajikan: satuBulanCarumanMajikan });
    useBasicCarumStore.setState({ kapitalEPF: data.capitalSemasaEPF });
    useBasicCarumStore.setState({ carumanMasuk: Number(carumanMasuk) });
    useBasicCarumStore.setState({
      dividenTahunan: Number(dividend),
    });
    useBasicCarumStore.setState({
      pungutanDividen: Number(dividend),
    });
    useBasicCarumStore.setState({
      jumlahBesarCaruman: Number(total),
    });
    useBasicCarumStore.setState({
      tahun,
    });
    useBasicCarumStore.setState({
      akaun1
    });
    useBasicCarumStore.setState({
      akaun2
    });


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
                name="akaun1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Akaun 1 (RM)</FormLabel>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="akaun2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Akaun 2 (RM)</FormLabel>
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
                      Boleh semak di akaun KWSP/EPF
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
                          // form.setValue("kadarDividenTahunan", "0.00");
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
              <FormField
                control={form.control}
                name="kadarDividenTahunan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dividen Tahunan (%)</FormLabel>
                    <Select
                      onValueChange={(newValue) => {
                        field.onChange(newValue);
                        setDahKira(false);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih dividen" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {jenisAkaunEPF === "shariah"
                          ? KADAR_FAEDAH_SHARIAH_TAHUNAN.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))
                          : KADAR_FAEDAH_KONVENSIONAL_TAHUNAN.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Source:{" "}
                      <Link
                        className="underline text-blue-500"
                        href="https://www.kwsp.gov.my/ms/lain-lain/sumber-maklumat/dividen"
                        target="_blank"
                      >
                        Dividen KWSP
                      </Link>
                    </FormDescription>
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
        <>
          {/* <JadualCaruman /> */}
          <JadualCarumanDanDividen />
        </>
      )}
    </div>
  );
};

export { FormPanjang };
