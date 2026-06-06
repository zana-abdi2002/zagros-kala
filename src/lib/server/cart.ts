import { unstable_cache } from "next/cache";
import "server-only";
import { getCartItemsFromDB } from "../db/cart";

const getCachedCartItems = unstable_cache(
  async (userId: string) => {
    return getCartItemsFromDB(userId);
  },
  ["cart-items"],
  {
    tags: ["cart_items"],
  },
);

export async function getCartItems(userId: string) {
  return getCachedCartItems(userId);
}
