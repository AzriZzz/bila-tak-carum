import { FormPanjang, PilihForm } from "@/components/product";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-12 md:p-24 bg-slate-100 px-5">
      <h1 className="text-2xl md:text-4xl font-bold mb-8 text-center">
        😯 Bila Tak Carum{" "}
        <span className="underline text-red-500">KWSP/EPF</span> 😯
      </h1>
      <div className="pb-5">
        <PilihForm />
        {/* <Card className="w-full md:w-fit">
          <CardContent className="p-5">
          <FormPanjang />
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
        </Card> */}
      </div>
      
    </main>
  );
}
