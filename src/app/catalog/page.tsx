import { redirect } from "next/navigation";

/** Ancienne route — redirige vers /products */
export default function CatalogRedirectPage() {
  redirect("/products");
}
