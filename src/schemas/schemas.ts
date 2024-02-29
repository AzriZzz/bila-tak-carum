import * as z from "zod";

export const basicFormSchemas = {
  gaji: z.coerce
    .number({
      invalid_type_error: "Input mestilah nombor.",
    })
    .min(1, {
      message: "Tak boleh buat caruman kalau 0 atau negatif tuan/puan.",
    })
    .max(1000000, {
      message:
        "Gaji lebih daripada RM 1 juta? Tuan/Puan perlu risau untuk kurangkan tax, bukan caruman.",
    }),
  carumanPekerja: z.string(),
  carumanMajikan: z.coerce.string(),
};

export const advancedFormSchemas = {
  gaji: z.coerce
    .number({
      invalid_type_error: "Input mestilah nombor.",
    })
    .min(1, {
      message: "Tak boleh buat caruman kalau 0 atau negatif tuan/puan.",
    })
    .max(1000000, {
      message:
        "Gaji lebih daripada RM 1 juta? Tuan/Puan perlu risau untuk kurangkan tax, bukan caruman.",
    }),
  carumanPekerja: z.string(),
  carumanMajikan: z.coerce.string(),
  capitalSemasaEPF: z.coerce
    .number({
      invalid_type_error: "Input mestilah nombor.",
    })
    .min(1, {
      message: "Tak boleh buat caruman kalau 0 atau negatif tuan/puan.",
    })
    .max(1000000, {
      message:
        "Caruman lebih daripada RM 1 juta? Tuan/Puan perlu risau untuk kurangkan tax, bukan caruman.",
    }),
  jenisAkaun: z
    .enum(["konvensional", "shariah"], {
      required_error: "Pilih jenis akaun EPF.",
    })
    .default("konvensional"),
  kadarDividenTahunan: z.string().refine(
    (value) => {
      return value !== "0.00";
    },
    {
      message: "Sila pilih kadar dividen tahunan.",
    }
  ),
  akaun1: z.coerce
    .number({
      invalid_type_error: "Input mestilah nombor.",
    })
    .min(0, {
      message: "Tak boleh buat caruman negatif tuan/puan.",
    })
    .max(1000000, {
      message:
        "Tuan/Puan perlukan tax agent bertauliah untuk kurangkan tax, bukan caruman.",
    }),
  akaun2: z.coerce
    .number({
      invalid_type_error: "Input mestilah nombor.",
    })
    .min(0, {
      message: "Tak boleh buat caruman negatif tuan/puan.",
    })
    .max(1000000, {
      message:
        "Tuan/Puan perlukan tax agent bertauliah untuk kurangkan tax, bukan caruman.",
    }),
};
