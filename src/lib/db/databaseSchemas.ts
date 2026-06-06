import z from "zod";

export const ProductSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  compareAtPrice: z.number(),
  stockQuantity: z.number().int(),
  sku: z.string(),
  categoryId: z.number().int(),
  brandId: z.number().int(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Product = z.infer<typeof ProductSchema>;

// -----------------------------------------------------------

export const CartItemSchema = z.object({
  cartItemId: z.number(),
  quantity: z.number().int().positive(),
  productId: z.uuid(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number().positive(),
  stockQuantity: z.number().int().nonnegative(),
  lineTotal: z.number().positive(),
  imageUrl: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CartItem = z.infer<typeof CartItemSchema>;
