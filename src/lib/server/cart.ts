import { unstable_cache } from "next/cache";
import "server-only";
import { getCartItemsFromDB } from "../db/cart";

export async function getCartItems(userId: string) {
  const getCachedCartItems = unstable_cache(
    async () => {
      const cartItems = await getCartItemsFromDB(userId);

      return cartItems;
    },
    [userId],
    {
      tags: ["cart_items", userId],
    },
  );

  return getCachedCartItems();
}
