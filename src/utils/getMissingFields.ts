import type { Item } from "../types";
import type {
  AutoParams,
  ElectronicsParams,
  RealEstateParams,
} from "../types/index.ts";

const FIELDS: Record<
  string,
  (keyof AutoParams | keyof ElectronicsParams | keyof RealEstateParams)[]
> = {
  auto: [
    "brand",
    "model",
    "yearOfManufacture",
    "transmission",
    "mileage",
    "enginePower",
  ],
  electronics: ["type", "brand", "model", "condition", "color"],
  real_estate: ["type", "address", "area", "floor"],
};

export const PARAM_LABELS: Record<string, string> = {
  type: "Тип",
  brand: "Бренд",
  model: "Модель",
  condition: "Состояние",
  color: "Цвет",
  yearOfManufacture: "Год выпуска",
  mileage: "Пробег",
  transmission: "Коробка передач",
  enginePower: "Мощность",
  area: "Площадь",
  floor: "Этаж",
  rooms: "Комнат",
  address: "Адрес",
};

export const getMissingFields = (item: Item) => {
  const missing: string[] = [];
  if (!item.description?.trim()) missing.push("Описание");

  const required = FIELDS[item.category] || [];

  required.forEach((field) => {
    const value = item.params?.[field as keyof typeof item.params];
    const isEmpty = !value && value !== 0;
    if (isEmpty) {
      missing.push(PARAM_LABELS[field as string] || field);
    }
  });

  return missing;
};
