import { describe, it, expect } from "vitest";
import { prepareAdData } from "./prepareAdData";
import type { AdFormData } from "../types";

describe("prepareAdData", () => {
  it("converts numeric params and strips empty values", () => {
    const data: AdFormData = {
      category: "auto",
      title: "BMW X5",
      price: 2500000,
      description: "Great car",
      params: {
        brand: "BMW",
        yearOfManufacture: "2020" as unknown as number,
        mileage: "" as unknown as number,
      },
    };

    const result = prepareAdData(data);

    expect(result.category).toBe("auto");
    expect(result.price).toBe(2500000);
    expect(result.params?.yearOfManufacture).toBe(2020);
    expect(result.params?.brand).toBe("BMW");
    expect(result.params?.mileage).toBeUndefined();
  });

  it("omits params when all values are empty", () => {
    const data: AdFormData = {
      category: "electronics",
      title: "Phone",
      price: 1000,
      description: "",
      params: { brand: "", model: "" },
    };

    const result = prepareAdData(data);
    expect(result.params).toBeUndefined();
  });
});
