import { auth } from "@/lib/auth/auth";
import { getCartCountFromDB } from "@/lib/db/cart";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cartCount = await getCartCountFromDB(session.user.id);

    return NextResponse.json(cartCount, { status: 200 });
  } catch (error) {
    console.error("Cart API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
