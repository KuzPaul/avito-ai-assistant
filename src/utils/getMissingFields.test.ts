import { describe, it, expect } from "vitest";
import { getMissingFields } from "./getMissingFields";
import type { Item } from "../types";

const baseItem: Item = {
  id: "1",
  title: "iPhone 15",
  price: 50000,
  category: "electronics",
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
  needsRevision: true,
  params: {},
};

describe("getMissingFields", () => {
  it("returns description when it is empty", () => {
    const missing = getMissingFields({ ...baseItem, description: "" });
    expect(missing).toContain("Описание");
  });

  it("returns required electronics params labels", () => {
    const missing = getMissingFields({
      ...baseItem,
      description: "Good phone",
      params: { type: "phone" },
    });
    expect(missing).toContain("Бренд");
    expect(missing).toContain("Модель");
  });

  it("returns empty array when all fields are filled", () => {
    const missing = getMissingFields({
      ...baseItem,
      description: "Full description",
      params: {
        type: "phone",
        brand: "Apple",
        model: "15",
        condition: "new",
        color: "black",
      },
    });
    expect(missing).toEqual([]);
  });
});
