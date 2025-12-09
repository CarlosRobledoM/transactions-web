import { describe, it, expect } from "vitest";
import { parseCurrencyInput, formatCurrency } from "./currency";

describe("parseCurrencyInput", () => {
  it("parses plain numeric strings", () => {
    expect(parseCurrencyInput("1200")).toBe(1200);
  });

  it("parses formatted currency strings", () => {
    expect(parseCurrencyInput("$1.200,50")).toBe(1200.5);
  });

  it("returns 0 for invalid input", () => {
    expect(parseCurrencyInput("abc")).toBe(0);
  });
});

describe("formatCurrency", () => {
  it("formats amount into a currency string", () => {
    const result = formatCurrency(1200);
    expect(result).toContain("1.200");
  });
});
