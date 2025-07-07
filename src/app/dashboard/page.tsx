import { ProductsSkeletonView, ProductsView } from "@/views";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="mt-4">
      <Suspense fallback={<ProductsSkeletonView />}>
      <ProductsView />
      </Suspense>
  
    </div>
  )  
}
