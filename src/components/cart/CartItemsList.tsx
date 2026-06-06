import { getCartItems } from "@/lib/server/cart";
import CartInfoItem from "./CartInfoItem";

type Props = {
  userId: string;
};

async function CartInfoList({ userId }: Props) {
  const carts = await getCartItems(userId);

  return (
    <ul>
      {carts?.map((cart) => (
        <li key={cart.cartItemId}>
          <CartInfoItem cart={cart} />
        </li>
      ))}
    </ul>
  );
}

export default CartInfoList;
