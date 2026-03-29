import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import type { Category } from "../backend.d";
import { sampleProducts } from "../data/sampleProducts";
import {
  useAllProducts,
  useGoldPrice,
  useProductsByCategory,
} from "../hooks/useQueries";
import ProductCard from "./ProductCard";

const CATEGORY_LABELS: Record<string, string> = {
  rings: "Rings",
  necklaces: "Necklaces",
  earrings: "Earrings",
  bracelets: "Bracelets",
  mens: "Men's Collection",
  collections: "Collections",
};

const CATEGORY_IMAGES: Record<string, string> = {
  rings: "/assets/generated/category-rings.dim_600x400.jpg",
  necklaces: "/assets/generated/category-necklaces.dim_600x400.jpg",
  earrings: "/assets/generated/category-earrings.dim_600x400.jpg",
  bracelets: "/assets/generated/category-bracelets.dim_600x400.jpg",
  mens: "/assets/generated/category-mens.dim_600x400.jpg",
  collections: "/assets/generated/featured-product-1.dim_500x500.jpg",
};

const SKELETON_KEYS = [
  "sk-1",
  "sk-2",
  "sk-3",
  "sk-4",
  "sk-5",
  "sk-6",
  "sk-7",
  "sk-8",
];

interface CategoryPageProps {
  category: string;
  onBack: () => void;
}

export default function CategoryPage({ category, onBack }: CategoryPageProps) {
  const catEnum = category as Category;
  const { data: products, isLoading } = useProductsByCategory(catEnum);
  const { data: allProducts } = useAllProducts();
  const { data: goldPrice } = useGoldPrice();
  const price = goldPrice ?? BigInt(6500);

  const displayProducts =
    products && products.length > 0
      ? products
      : allProducts && allProducts.length > 0
        ? allProducts.filter((p) => p.category === category)
        : sampleProducts.filter((p) => p.category === category);

  const label = CATEGORY_LABELS[category] || category;
  const bannerImage = CATEGORY_IMAGES[category];

  return (
    <div>
      <div className="relative h-48 md:h-64 lg:h-72 overflow-hidden">
        <img
          src={bannerImage}
          alt={label}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 md:pb-10">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-2">
            Category
          </p>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-foreground">
            {label}
          </h1>
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-16 py-6 flex items-center gap-4 border-b border-border">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors"
          data-ocid="category.secondary_button"
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>
        <span className="text-border">|</span>
        <span className="text-sm text-muted-foreground">
          {displayProducts.length} pieces
        </span>
      </div>

      <section className="px-4 md:px-8 lg:px-16 py-8 md:py-12">
        {isLoading ? (
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            data-ocid="category.loading_state"
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
                  <Skeleton className="h-8 w-full mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : displayProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 gap-4"
            data-ocid="category.empty_state"
          >
            <p className="font-display text-2xl text-muted-foreground">
              No pieces found
            </p>
            <p className="text-sm text-muted-foreground">
              Check back soon for new arrivals
            </p>
            <button
              type="button"
              onClick={onBack}
              className="btn-gold px-6 py-3 rounded mt-4"
              data-ocid="category.primary_button"
            >
              Explore All
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {displayProducts.map((product, idx) => (
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
    </div>
  );
}
