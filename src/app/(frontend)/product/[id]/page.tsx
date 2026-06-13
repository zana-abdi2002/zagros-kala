import { ProductSchema } from "@/lib/db/databaseSchemas";
import { getProduct } from "@/lib/server/products";
import { UUID } from "crypto";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function ProductPage({ params }: Props) {
  const { id } = await params;
  if (!isValidId(id)) notFound();

  const product = await getProduct(id as UUID);
  if (!product) {
    notFound();
  }

  return (
    <div>
      <ul>
        <li>name: {product.name}</li>
        <li>price: {product.price}</li>
      </ul>
    </div>
  );
}

export default ProductPage;

// util functions ----------------------------------------------

function isValidId(id: string) {
  return Boolean(!ProductSchema.shape["id"].safeParse(id).error);
}
