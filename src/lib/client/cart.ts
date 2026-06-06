import { fetchJson } from "./api";

export async function fetchCartCountClient() {
  return fetchJson<number>("/api/cart/count");
}
