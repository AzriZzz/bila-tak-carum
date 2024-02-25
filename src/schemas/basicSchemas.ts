import * as z from "zod";

export const basicFormSchemas = {
  gaji: z.coerce
    .number({
      invalid_type_error: "Input mestilah nombor.",
    })
    .min(1, { message: "Tak boleh buat caruman kalau 0 atau negatif tuan/puan." })
    .max(1000000, {
      message:
        "Gaji lebih daripada RM 1 juta? Tuan/Puan perlu risau untuk kurangkan tax, bukan caruman.",
    }),
  carumanPekerja: z.string(),
  carumanMajikan: z.coerce.string(),
};
