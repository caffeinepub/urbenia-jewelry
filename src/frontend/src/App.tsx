import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import CartDrawer from "./components/CartDrawer";
import CategoryGrid from "./components/CategoryGrid";
import CategoryPage from "./components/CategoryPage";
import FeaturedProducts from "./components/FeaturedProducts";
import Footer from "./components/Footer";
import GiftBanner from "./components/GiftBanner";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";

const CATEGORY_KEYS = [
  "rings",
  "necklaces",
  "earrings",
  "bracelets",
  "mens",
  "collections",
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState("home");

  function handleCategoryChange(category: string) {
    setActiveCategory(category);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const isCategoryPage = CATEGORY_KEYS.includes(activeCategory);

  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen bg-background flex flex-col">
          <Header
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
          <main className="flex-1">
            {isCategoryPage ? (
              <CategoryPage
                category={activeCategory}
                onBack={() => handleCategoryChange("home")}
              />
            ) : (
              <>
                <HeroSection onShopNow={() => handleCategoryChange("rings")} />
                <CategoryGrid onCategorySelect={handleCategoryChange} />
                <div className="gold-divider" />
                <FeaturedProducts />
                <div className="gold-divider" />
                <GiftBanner />
              </>
            )}
          </main>
          <Footer />
          <CartDrawer />
          <Toaster />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}
