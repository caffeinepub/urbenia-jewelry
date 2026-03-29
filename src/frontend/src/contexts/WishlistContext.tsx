import { type ReactNode, createContext, useContext, useState } from "react";

interface WishlistContextValue {
  wishlist: Set<string>;
  toggleWishlist: (productId: bigint) => void;
  isWishlisted: (productId: bigint) => boolean;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  function toggleWishlist(productId: bigint) {
    const key = productId.toString();
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function isWishlisted(productId: bigint) {
    return wishlist.has(productId.toString());
  }

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isWishlisted }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
