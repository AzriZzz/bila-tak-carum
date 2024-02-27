"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormPanjang, FormPendek } from "@/components/product/form";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";

const PilihForm = () => {
  return (
    <div className="w-full">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="w-full flex pb-4">
          <TabsTrigger value="basic" className="w-full shadow-sm">
            Basic
          </TabsTrigger>
          <TabsTrigger value="advanced" className="w-full">
            Advanced
          </TabsTrigger>
        </TabsList>
        <Card className="w-full md:w-fit">
          <CardContent className="p-5">
            <TabsContent value="basic">
              <FormPendek />
            </TabsContent>
            <TabsContent value="advanced">
              <FormPanjang />
            </TabsContent>
          </CardContent>

          <CardFooter>
            <p className="text-xs font-semibold text-center w-full">
              Disclaimer: Data yang dikongsi hanyalah untuk tujuan ilustrasi dan
              tidak mewakili sebarang nasihat kewangan. <br /> Untuk lebih tepat dan
              terperinci, sila rujuk kepada penasihat kewangan bertauliah atau
              link di bawah. <br />
              <Link
                className="underline text-blue-500"
                href="https://www.kwsp.gov.my/ms/majikan/tanggungjawab/caruman-wajib"
                target="_blank"
              >
                Caruman Majikan Kepada Pekerja
              </Link>{" "}
              dan{" "}
              <Link
                className="underline text-blue-500"
                href="https://www.kwsp.gov.my/documents/d/guest/jadual-ketiga-bm-pdf-1"
                target="_blank"
              >
                Jadual Ketiga - BM
              </Link>
            </p>
          </CardFooter>
        </Card>
      </Tabs>
    </div>
  );
};

export { PilihForm };
