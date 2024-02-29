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
      </div>
    </main>
  );
}
