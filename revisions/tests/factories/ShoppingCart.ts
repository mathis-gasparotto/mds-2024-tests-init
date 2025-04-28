import { CartItem, ShoppingCart } from "../../src/cart/cart";

export class ShoppingCartFactory extends ShoppingCart {
  withProducts(items: CartItem[]): ShoppingCartFactory {
    items.forEach((item) => {
      this.addItem(item);
    });
    return this;
  }
}
