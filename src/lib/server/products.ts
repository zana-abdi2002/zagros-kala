import { UUID } from "crypto";
import { unstable_cache } from "next/cache";
import "server-only";
import type { Product } from "../db/databaseSchemas";
import { getProductById } from "../db/products";

export async function getProduct(productId: UUID): Promise<Product | null> {
  const getCachedProduct = unstable_cache(
    async () => {
      const product = await getProductById(productId);

      return product;
    },
    [productId],
    {
      tags: ["product_page", productId],
    },
  );

  return getCachedProduct();
}
