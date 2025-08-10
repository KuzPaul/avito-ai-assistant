import type { FieldConfig } from "../types";

export const CATEGORY_FIELDS: Record<string, FieldConfig[]> = {
  electronics: [
    {
      name: "type",
      label: "Тип",
      type: "select",
      options: ["phone", "laptop", "tablet", "misc"],
    },
    { name: "brand", label: "Бренд", type: "text" },
    { name: "model", label: "Модель", type: "text" },
    {
      name: "condition",
      label: "Состояние",
      type: "select",
      options: ["new", "used"],
    },
    { name: "color", label: "Цвет", type: "text" },
  ],
  auto: [
    { name: "brand", label: "Бренд", type: "text" },
    { name: "model", label: "Модель", type: "text" },
    { name: "yearOfManufacture", label: "Год выпуска", type: "number" },
    {
      name: "transmission",
      label: "Коробка передач",
      type: "select",
      options: ["automatic", "manual"],
    },
    { name: "mileage", label: "Пробег (км)", type: "number" },
    { name: "enginePower", label: "Мощность (л.с.)", type: "number" },
  ],
  real_estate: [
    {
      name: "type",
      label: "Тип",
      type: "select",
      options: ["flat", "house", "room"],
    },
    { name: "address", label: "Адрес", type: "text" },
    { name: "area", label: "Площадь (м²)", type: "number" },
    { name: "floor", label: "Этаж", type: "number" },
  ],
};
