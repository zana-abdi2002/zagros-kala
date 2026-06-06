"use client";

import { authClient } from "@/lib/auth/auth-client";
import { fetchCartCountClient } from "@/lib/client/cart";
import { setCount } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ShoppingBagOutlined } from "@mui/icons-material";
import { Badge, IconButton } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";

function CartIcon() {
  const cartCount = useAppSelector((state) => state.cart.count);
  const dispatch = useAppDispatch();

  // check if user is signed in
  const { data: session, isPending: isAuthPending } = authClient.useSession();
  const isSignedIn = !!session?.user.id;

  // set RTK state on database change
  useEffect(() => {
    if (!isSignedIn) return;

    async function getInitialCartCount() {
      try {
        const initialCartCount = await fetchCartCountClient();
        dispatch(setCount(initialCartCount));
      } catch (error) {
        console.log(error);
        alert("Failed to fetch cart data");
      }
    }

    getInitialCartCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

  return (
    <div>
      <Link
        href={isAuthPending ? "" : isSignedIn ? "/cart" : "/signup"}
        aria-label="cart"
        prefetch={!isAuthPending}
      >
        <IconButton aria-label="cart" sx={{ padding: 0, color: "black" }}>
          <Badge
            badgeContent={cartCount}
            color="primary"
            max={9}
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            invisible={!isSignedIn || cartCount === 0}
          >
            <ShoppingBagOutlined fontSize="large" />
          </Badge>
        </IconButton>
      </Link>
    </div>
  );
}

export default CartIcon;
