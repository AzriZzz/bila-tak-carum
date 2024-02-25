import { BasicForm } from "@/components/product/form";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-12 md:p-24 bg-slate-100 px-5">
      <h1 className="text-2xl md:text-4xl font-bold mb-8 text-center">
        😯 Bila Tak Carum{" "}
        <span className="underline text-red-500">KWSP/EPF</span> 😯
      </h1>
      <Card className="w-full md:w-fit">
        <CardContent className="p-3">
          <BasicForm />
        </CardContent>
        <CardFooter>
          <p className="text-xs font-semibold text-center w-full">
            Disclaimer: Data yang dikongsi tidak akan disimpan dimana-mana.
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
