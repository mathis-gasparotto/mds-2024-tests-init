import { describe, expect, test, vi } from "vitest";
import { ShoppingCartFactory } from "../factories/ShoppingCart";

describe("Cart", () => {
  test("should be able to manage single item in the cart", () => {
    const cart = new ShoppingCartFactory();
    const addItemSpy = vi.spyOn(cart, "addItem");
    const removeItemSpy = vi.spyOn(cart, "removeItem");
    const updateItemQuantitySpy = vi.spyOn(cart, "updateItemQuantity");
    const getTotalSpy = vi.spyOn(cart, "getTotal");

    cart.addItem({ id: 1, name: "Product 1", price: 10, quantity: 1 });
    cart.removeItem(1);
    cart.updateItemQuantity(1, 2);
    cart.updateItemQuantity(1, 0);
    const total = cart.getTotal();

    expect(total).toBe(0);
    expect(addItemSpy).toHaveBeenCalledWith({
      id: 1,
      name: "Product 1",
      price: 10,
      quantity: 1,
    });
    expect(removeItemSpy).toHaveBeenCalledWith(1);
    expect(updateItemQuantitySpy).toHaveBeenCalledWith(1, 2);
    expect(updateItemQuantitySpy).toHaveBeenCalledWith(1, 0);
    expect(getTotalSpy).toHaveBeenCalled();
  });

  test("should be able to manage multiple items in the cart", () => {
    const cart = new ShoppingCartFactory().withProducts([
      { id: 1, name: "Product 1", price: 10, quantity: 1 },
      { id: 2, name: "Product 2", price: 20, quantity: 2 },
      { id: 2, name: "Product 2", price: 20, quantity: 3 },
    ]);
    const removeItemSpy = vi.spyOn(cart, "removeItem");
    const getTotalSpy = vi.spyOn(cart, "getTotal");

    cart.removeItem(1);
    const total = cart.getTotal();

    expect(total).toBe(100);
    expect(removeItemSpy).toHaveBeenCalledWith(1);
    expect(getTotalSpy).toHaveBeenCalled();
  });
});
