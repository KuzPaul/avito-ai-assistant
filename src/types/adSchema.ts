import { z } from "zod";

export const adSchema = z.object({
  category: z.string().min(1, "Категория обязательна"),
  title: z.string().min(1, "Название должно быть заполнено"),
  price: z.number().min(1, "Цена должна быть больше 0"),
  description: z.string().optional(),
  params: z.any().optional(),
});

export type AdFormValues = z.infer<typeof adSchema>;
