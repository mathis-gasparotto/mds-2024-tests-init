import { Coupon } from "../../src/coupons/coupons";

export class CouponFactory {
  withFutureDate(): Coupon {
    return {
      code: "SUMMER_SALE",
      discount: 10,
      expiresAt: new Date(new Date().getTime() + 1000 * 60 * 60 * 24), // add 1 day
      minOrder: 10,
      usageLimit: 1,
    };
  }

  withPastDate(): Coupon {
    return {
      code: "SUMMER_SALE",
      discount: 10,
      expiresAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 24), // remove 1 day
      minOrder: 10,
      usageLimit: 1,
    };
  }

  withUsageLimit(usageLimit: number): Coupon {
    return {
      ...this.withFutureDate(),
      usageLimit,
    };
  }

  withMinOrder(minOrder: number): Coupon {
    return {
      ...this.withFutureDate(),
      minOrder,
    };
  }
}
