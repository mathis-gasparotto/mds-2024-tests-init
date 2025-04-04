import { describe, expect, test, vi } from "vitest";
import { ShoppingCartFactory } from "./factories/ShoppingCart";

describe("Cart", () => {
  test("should be able to add an item to the cart", () => {
    const cart = new ShoppingCartFactory();
    const addItemSpy = vi.spyOn(cart, "addItem");
    const item = { id: 1, name: "Product 1", price: 10, quantity: 1 };

    cart.addItem(item);

    expect(addItemSpy).toHaveBeenCalledWith(item);
    expect(cart.getTotal()).toBe(10);
  });

  test("should be able to add an existing item to the cart", () => {
    const cart = new ShoppingCartFactory();
    const addItemSpy = vi.spyOn(cart, "addItem");
    const item = { id: 1, name: "Product 1", price: 10, quantity: 1 };
    cart.withProducts([item]);

    cart.addItem(item);

    expect(addItemSpy).toHaveBeenCalledWith(item);
    expect(cart.getTotal()).toBe(item.price * 2);
  });

  test("should be able to add an item to the cart with a negative quantity", () => {
    const cart = new ShoppingCartFactory();
    const addItemSpy = vi.spyOn(cart, "addItem");
    const item = { id: 1, name: "Product 1", price: 10, quantity: 0 };

    expect(() => cart.addItem(item)).toThrow(
      "La quantité doit être supérieure à 0"
    );
    expect(addItemSpy).toHaveBeenCalledWith(item);
  });

  test("should be able to add an item to the cart with a negative price", () => {
    const cart = new ShoppingCartFactory();
    const addItemSpy = vi.spyOn(cart, "addItem");
    const item = { id: 1, name: "Product 1", price: -10, quantity: 1 };

    expect(() => cart.addItem(item)).toThrow(
      "Le prix doit être supérieur ou égal à 0"
    );
    expect(addItemSpy).toHaveBeenCalledWith(item);
  });

  test("should be able to remove an item from the cart", () => {
    const cart = new ShoppingCartFactory();
    const items = [{ id: 1, name: "Product 1", price: 10, quantity: 1 }];
    cart.withProducts(items);
    const removeItemSpy = vi.spyOn(cart, "removeItem");

    cart.removeItem(1);

    expect(removeItemSpy).toHaveBeenCalledWith(1);
    expect(cart.getTotal()).toBe(0);
  });

  test("should be able to update the quantity of an item in the cart", () => {
    const cart = new ShoppingCartFactory();
    const items = [{ id: 1, name: "Product 1", price: 10, quantity: 1 }];
    cart.withProducts(items);
    const updateItemQuantitySpy = vi.spyOn(cart, "updateItemQuantity");

    cart.updateItemQuantity(1, 2);

    expect(updateItemQuantitySpy).toHaveBeenCalledWith(1, 2);
    expect(cart.getTotal()).toBe(20);
  });

  test("should be able to update the quantity of an item in the cart to 0", () => {
    const cart = new ShoppingCartFactory();
    const items = [{ id: 1, name: "Product 1", price: 10, quantity: 1 }];
    cart.withProducts(items);
    const updateItemQuantitySpy = vi.spyOn(cart, "updateItemQuantity");

    cart.updateItemQuantity(1, 0);

    expect(updateItemQuantitySpy).toHaveBeenCalledWith(1, 0);
    expect(cart.getTotal()).toBe(0);
  });

  test("should be able to update the quantity of an item in the cart to a negative quantity", () => {
    const cart = new ShoppingCartFactory();
    const items = [{ id: 1, name: "Product 1", price: 10, quantity: 1 }];
    cart.withProducts(items);
    const updateItemQuantitySpy = vi.spyOn(cart, "updateItemQuantity");

    expect(() => cart.updateItemQuantity(1, -1)).toThrow(
      "La quantité doit être supérieure ou égale à 0"
    );
    expect(updateItemQuantitySpy).toHaveBeenCalledWith(1, -1);
  });

  test("should be able to get the total price of the cart", () => {
    const cart = new ShoppingCartFactory();
    const items = [
      { id: 1, name: "Product 1", price: 10, quantity: 1 },
      { id: 2, name: "Product 2", price: 20, quantity: 1 },
    ];
    cart.withProducts(items);
    const getTotalSpy = vi.spyOn(cart, "getTotal");

    expect(cart.getTotal()).toBe(30);
    expect(getTotalSpy).toHaveBeenCalled();
  });

  test("should be able to get the total price of the cart with a discount", () => {
    const cart = new ShoppingCartFactory();
    const items = [
      { id: 1, name: "Product 1", price: 10, quantity: 1 },
      { id: 2, name: "Product 2", price: 20, quantity: 1 },
    ];
    cart.withProducts(items);
    const getTotalSpy = vi.spyOn(cart, "getTotal");

    expect(cart.getTotal(10)).toBe(27);
    expect(getTotalSpy).toHaveBeenCalled();
  });
});
