import { describe, expect, test, vi } from "vitest";
import { ShoppingCartFactory } from "../factories/ShoppingCart";
import { processOrder } from "../../src/orders/orders";
import { CouponFactory } from "../factories/Coupon";
import { OrderService } from "../../src/services/OrderService";
import { PaymentServiceImpl } from "../../src/services/PaymentService";

describe("Order", () => {
  const paymentService = new PaymentServiceImpl();
  const orderService = new OrderService(paymentService);

  test("should be able to create an order", () => {
    const cart = new ShoppingCartFactory().withProducts([
      { id: 1, name: "Product 1", price: 10, quantity: 1 },
      { id: 2, name: "Product 2", price: 20, quantity: 2 },
    ]); // total = 50
    const discount = 30;
    const cartTotal = 50;
    const orderTax = cartTotal * (1 - discount / 100) * 0.2;
    const shippingWeight = 10;
    const orderShipping = 5 + 0.5 * shippingWeight;
    const orderDiscount = cartTotal * (discount / 100);
    const orderTotal = cartTotal - orderDiscount + orderShipping + orderTax;

    const coupon = new CouponFactory().withDiscount(discount);

    const processPaymentSpy = vi.spyOn(paymentService, "processPayment");

    const order = orderService.createOrder(cart, {
      coupon,
      couponUsageCount: 1,
      shippingDestination: "domestic",
      shippingMethod: "standard",
      shippingWeight,
    });

    expect(order.discount).toBe(orderDiscount);
    expect(order.shipping).toBe(orderShipping);
    expect(order.tax).toBe(orderTax);
    expect(order.total).toBe(orderTotal);
    expect(processPaymentSpy).toHaveBeenCalledWith(orderTotal);
  });
});
