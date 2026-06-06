import { QueryResult } from "pg";
import "server-only";
import z from "zod";
import { db } from "./client";
import { CartItem, CartItemSchema } from "./databaseSchemas";

export async function getCartItemsFromDB(userId: string) {
  try {
    const result: QueryResult<CartItem> = await db.query(
      `
SELECT 
    ci.id AS "cartItemId",
    ci.quantity,
    p.id AS "productId",
    p.name,
    p.description,
    p.price,
    p.stock_quantity AS "stockQuantity",
    (ci.quantity * p.price) AS "lineTotal",
    pi.image_url AS "imageUrl",
    ci.created_at AS "createdAt",
    ci.updated_at AS "updatedAt"
FROM cart_items ci
JOIN products p ON ci.product_id = p.id
LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true
WHERE ci.user_id = $1;`,
      [userId],
    );

    if (!result.rowCount) return null;

    console.log(result);

    return z.array(CartItemSchema).parse(result.rows);
  } catch (error) {
    console.error("Database error fetching product:", error);
    throw error;
  }
}

export async function getCartCountFromDB(userId: string) {
  try {
    const result: QueryResult<{ count: number }> = await db.query(
      `SELECT COUNT(*)
FROM cart_items ci
WHERE ci.user_id = $1;`,
      [userId],
    );

    return z.number().parse(result.rows[0].count);
  } catch (error) {
    console.error("Database error fetching product:", error);
    throw error;
  }
}
