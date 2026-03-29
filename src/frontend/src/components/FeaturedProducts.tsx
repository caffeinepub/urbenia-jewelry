import { Skeleton } from "@/components/ui/skeleton";
import { sampleProducts } from "../data/sampleProducts";
import { useFeaturedProducts, useGoldPrice } from "../hooks/useQueries";
import ProductCard from "./ProductCard";

const SKELETON_KEYS = ["sk-1", "sk-2", "sk-3", "sk-4"];

export default function FeaturedProducts() {
  const { data: featured, isLoading: loadingProducts } = useFeaturedProducts();
  const { data: goldPrice } = useGoldPrice();

  const products =
    featured && featured.length > 0
      ? featured
      : sampleProducts.filter((p) => p.featured);
  const price = goldPrice ?? BigInt(6500);

  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-16 bg-secondary">
      <div className="text-center mb-8 md:mb-12">
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">
          Handpicked
        </p>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-foreground">
          Featured Pieces
        </h2>
      </div>
      <div className="gold-divider mb-8 md:mb-12" />
      {loadingProducts ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          data-ocid="products.loading_state"
        >
          {SKELETON_KEYS.map((k) => (
            <div
              key={k}
              className="bg-card rounded border border-border overflow-hidden"
            >
              <Skeleton className="aspect-square w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-8 w-full mt-2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, idx) => (
            <ProductCard
              key={product.id.toString()}
              product={product}
              goldPrice={price}
              index={idx}
            />
          ))}
        </div>
      )}
    </section>
  );
}
