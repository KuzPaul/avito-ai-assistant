import type { AdFormData, Category } from "../types";

export const prepareAdData = (data: AdFormData) => {
  const convertedParams: any = {};

  if (data.params) {
    const numericFields = [
      "yearOfManufacture",
      "mileage",
      "enginePower",
      "area",
      "floor",
      "rooms",
    ];

    Object.entries(data.params).forEach(([key, value]) => {
      if (value === "" || value === null || value === undefined) return;

      if (numericFields.includes(key)) {
        const num = Number(value);
        if (!isNaN(num) && num > 0) {
          convertedParams[key] = num;
        }
      } else {
        convertedParams[key] = value;
      }
    });
  }

  return {
    category: data.category as Category,
    title: data.title,
    price: Number(data.price),
    description: data.description || undefined,
    params:
      Object.keys(convertedParams).length > 0 ? convertedParams : undefined,
  };
};
