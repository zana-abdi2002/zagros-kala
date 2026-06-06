import { CartItem } from "@/lib/db/databaseSchemas";

type Props = {
  cart: CartItem;
};

function CartInfoItem({ cart }: Props) {
  return (
    <ul>
      <li>{cart.name}</li>
      <li>{cart.description}</li>
      <li>{cart.price}</li>
      <li>{cart.quantity}</li>
      <li>{cart.lineTotal}</li>
    </ul>
  );
}

export default CartInfoItem;
