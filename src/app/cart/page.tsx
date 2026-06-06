import CartInfoList from "@/components/cart/CartItemsList";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function CartPage() {
  // get user id ----------------------------------------
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/signup");
  }
  const userId = session.user.id;
  // -----------------------------------------------------

  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <CartInfoList userId={userId} />
      </Suspense>
    </div>
  );
}

export default CartPage;
