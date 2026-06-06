import { db } from "./client";
import { Product, ProductSchema } from "./databaseSchemas";

export async function getProductById(
  productId: string,
): Promise<Product | null> {
  try {
    const result = await db.query(
      `SELECT 
        id,
        name,
        description,
        price,
        compare_at_price AS "compareAtPrice",
        stock_quantity AS "stockQuantity",
        sku,
        category_id AS "categoryId",
        brand_id AS "brandId",
        is_active AS "isActive",
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM products 
      WHERE id = $1`,
      [productId],
    );

    if (result.rows.length === 0) return null;

    // Validate with Zod
    return ProductSchema.parse(result.rows[0]);
  } catch (error) {
    // pg errors have rich metadata: code, detail, hint, etc.
    console.error("Database error fetching product:", error);
    throw error;
  }
}
