import { describe, expect, test } from "vitest";
import { ShoppingCartFactory } from "./factories/ShoppingCart";
import { validateCoupon } from "../src/coupons/coupons";
import { CouponFactory } from "./factories/Coupon";

describe("Coupons", () => {
  test("should be check a valid coupon", () => {
    const coupon = new CouponFactory().withFutureDate();
    const result = validateCoupon(coupon, 10, 0);
    expect(result).toBe(coupon.discount);
  });

  test("should be check an expired coupon", () => {
    const coupon = new CouponFactory().withPastDate();
    expect(() => validateCoupon(coupon, 10, 0)).toThrow("Coupon expiré");
  });

  test("should be check a coupon with a usage limit", () => {
    const coupon = new CouponFactory().withUsageLimit(1);
    expect(() => validateCoupon(coupon, 10, 1)).toThrow(
      "Usage limite du coupon atteint"
    );
  });

  test("should be check a coupon with a min order", () => {
    const coupon = new CouponFactory().withMinOrder(10);
    expect(() => validateCoupon(coupon, 5, 0)).toThrow(
      "Montant de commande insuffisant pour ce coupon"
    );
  });
});
