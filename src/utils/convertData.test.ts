import { describe, it, expect } from "vitest";
import { formatDate } from "./convertData";

describe("formatDate", () => {
  it("formats date in ru-RU locale", () => {
    const formatted = formatDate("2024-06-15T14:30:00Z");
    expect(formatted).toMatch(/2024/);
    expect(formatted).toMatch(/июн/i);
  });
});
