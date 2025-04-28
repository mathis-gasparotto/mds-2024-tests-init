import { describe, expect, test } from "vitest";
import { calculateShippingCost } from "../../src/shipping/shipping";

describe("Shipping", () => {
  test("should be calculate the shipping cost for a domestic order", () => {
    const result = calculateShippingCost(10, "domestic");
    expect(result).toBe(10);
  });

  test("should be calculate the shipping cost for an international order", () => {
    const result = calculateShippingCost(10, "international");
    expect(result).toBe(25);
  });

  test("should be calculate the shipping cost for an international order with express shipping", () => {
    const result = calculateShippingCost(10, "international", "express");
    expect(result).toBe(37.5);
  });

  test("should be calculate the shipping cost for a domestic order with express shipping", () => {
    const result = calculateShippingCost(10, "domestic", "express");
    expect(result).toBe(15);
  });

  test("should be calculate the shipping cost for a negative weight", () => {
    expect(() => calculateShippingCost(-10, "domestic")).toThrow(
      "Poids négatif non autorisé"
    );
  });

  test("should be calculate the shipping cost for a zero weight", () => {
    const result = calculateShippingCost(0, "domestic");
    expect(result).toBe(5);
  });
});
