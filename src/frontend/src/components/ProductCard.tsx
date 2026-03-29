import { Heart, ShoppingBag, Star } from "lucide-react";
import { motion } from "motion/react";
import type { Product } from "../backend.d";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { computePrice } from "../hooks/useQueries";

interface ProductCardProps {
  product: Product;
  goldPrice: bigint;
  index?: number;
}

export default function ProductCard({
  product,
  goldPrice,
  index = 0,
}: ProductCardProps) {
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const price = computePrice(product, goldPrice);
  const wishlisted = isWishlisted(product.id);
  const rating = 4 + (Number(product.id) % 2) * 0.5;
  const reviews = 18 + Number(product.id) * 7;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="product-card group relative bg-card rounded border border-border hover:border-gold overflow-hidden flex flex-col"
      data-ocid={`product.item.${index + 1}`}
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={
            product.imageUrl ||
            "/assets/generated/featured-product-1.dim_500x500.jpg"
          }
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {!product.inStock && (
          <div className="absolute top-3 left-3 bg-destructive/90 text-destructive-foreground text-[10px] font-semibold tracking-wider uppercase px-2 py-1 rounded">
            Sold Out
          </div>
        )}
        {product.featured && product.inStock && (
          <div className="absolute top-3 left-3 bg-gold/90 text-background text-[10px] font-semibold tracking-wider uppercase px-2 py-1 rounded">
            Featured
          </div>
        )}
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
          aria-label="Toggle wishlist"
          data-ocid={`product.toggle.${index + 1}`}
        >
          <Heart
            size={14}
            fill={wishlisted ? "currentColor" : "none"}
            className={wishlisted ? "text-destructive" : ""}
          />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <p className="text-[10px] tracking-widest uppercase text-gold">
          {product.category}
        </p>
        <h3 className="font-display text-base md:text-lg font-semibold text-foreground leading-tight line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                // biome-ignore lint/suspicious/noArrayIndexKey: star index is stable
                key={i}
                size={11}
                className={
                  i < Math.floor(rating)
                    ? "text-gold fill-gold"
                    : i < rating
                      ? "text-gold fill-gold/50"
                      : "text-border"
                }
              />
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground">({reviews})</span>
        </div>
        <div className="flex items-center justify-between mt-auto pt-2">
          <div>
            <div className="font-semibold text-foreground text-sm md:text-base">
              ₹{price.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
            </div>
            <div className="text-[10px] text-muted-foreground">
              {product.weightGrams}g 22K
            </div>
          </div>
          <button
            type="button"
            onClick={() => addItem(product, price)}
            disabled={!product.inStock}
            className="btn-brand px-3 py-2 rounded text-[10px] flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
            data-ocid={`product.primary_button.${index + 1}`}
          >
            <ShoppingBag size={11} />
            Add to Bag
          </button>
        </div>
      </div>
    </motion.div>
  );
}
