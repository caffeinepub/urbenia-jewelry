import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import GoldTicker from "./GoldTicker";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Rings", href: "#rings" },
  { label: "Necklaces", href: "#necklaces" },
  { label: "Earrings", href: "#earrings" },
  { label: "Bracelets", href: "#bracelets" },
  { label: "Men's", href: "#mens" },
  { label: "Collections", href: "#collections" },
  { label: "About", href: "#about" },
];

interface HeaderProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function Header({
  activeCategory,
  onCategoryChange,
}: HeaderProps) {
  const { totalItems, setIsOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  function handleNavClick(href: string) {
    const cat = href.replace("#", "");
    onCategoryChange(cat);
    setMobileMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 bg-brand border-b border-white/10 shadow-sm">
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-16 py-3 md:py-4">
        <a
          href="/"
          className="flex items-center gap-3 group"
          onClick={(e) => {
            e.preventDefault();
            onCategoryChange("home");
          }}
          data-ocid="nav.link"
        >
          <img
            src="/assets/uploads/aiselect_20260329_112700_instagram-019d382b-4e5e-743e-ae42-0e33cfc76176-1.jpg"
            alt="Urbania Jewellers"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full flex-shrink-0 ring-2 ring-white/30"
          />
          <div>
            <div className="font-display text-base md:text-xl font-semibold tracking-[0.2em] text-white uppercase leading-none">
              Urbania
            </div>
            <div className="text-[9px] tracking-[0.35em] text-gold uppercase mt-0.5">
              Jewellers
            </div>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-2 flex-1 max-w-sm mx-8 bg-white/10 rounded border border-white/20 px-3 py-2">
          <Search size={14} className="text-white/60 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search jewelry..."
            className="bg-transparent text-sm text-white placeholder:text-white/50 outline-none w-full"
            data-ocid="nav.search_input"
          />
        </div>

        <div className="flex items-center gap-1 md:gap-3">
          <button
            type="button"
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
          >
            <Search size={18} />
          </button>
          <button
            type="button"
            className="hidden md:flex p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Account"
          >
            <User size={18} />
          </button>
          <button
            type="button"
            className="hidden md:flex p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Wishlist"
          >
            <Heart size={18} />
          </button>
          <button
            type="button"
            className="relative p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setIsOpen(true)}
            aria-label="Cart"
            data-ocid="cart.open_modal_button"
          >
            <ShoppingBag size={18} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </button>
          <button
            type="button"
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors ml-1"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Menu"
            data-ocid="nav.toggle"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-white/10 px-4 py-2 overflow-hidden"
          >
            <div className="flex items-center gap-2 bg-white/10 rounded border border-white/20 px-3 py-2">
              <Search size={14} className="text-white/60" />
              <input
                type="text"
                placeholder="Search jewelry..."
                className="bg-transparent text-sm text-white placeholder:text-white/50 outline-none w-full"
                // biome-ignore lint/a11y/noAutofocus: intentional for search open
                autoFocus
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="gold-divider" />

      <nav className="hidden md:flex items-center justify-center gap-1 lg:gap-0 px-4 py-0 border-b border-white/10 bg-[oklch(0.28_0.1_150)]">
        {NAV_LINKS.map((link) => {
          const catKey = link.href.replace("#", "");
          const isActive = activeCategory === catKey;
          return (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className={`px-4 lg:px-5 py-3 text-xs font-medium tracking-widest uppercase transition-all relative group ${
                isActive
                  ? "bg-white/20 text-white rounded font-semibold"
                  : "text-white/70 hover:text-white"
              }`}
              data-ocid="nav.link"
            >
              {link.label}
              {!isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold transition-transform origin-center scale-x-0 group-hover:scale-x-50" />
              )}
            </a>
          );
        })}
      </nav>

      <GoldTicker />

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-card border-r border-border z-50 flex flex-col"
              data-ocid="nav.panel"
            >
              <div className="flex items-center justify-between p-5 border-b border-border">
                <div className="font-display text-lg tracking-widest text-brand uppercase">
                  Menu
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-muted-foreground hover:text-foreground"
                  data-ocid="nav.close_button"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto py-4">
                {NAV_LINKS.map((link) => {
                  const catKey = link.href.replace("#", "");
                  const isActive = activeCategory === catKey;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className={`flex items-center justify-between px-6 py-4 text-sm font-medium tracking-widest uppercase transition-colors border-b border-border/50 ${
                        isActive
                          ? "bg-brand-light text-brand font-semibold border-l-4 border-l-[oklch(var(--brand))]"
                          : "text-muted-foreground hover:text-brand hover:bg-brand-light/50 transition-colors"
                      }`}
                      data-ocid="nav.link"
                    >
                      {link.label}
                      <ChevronDown size={14} className="rotate-[-90deg]" />
                    </a>
                  );
                })}
              </nav>
              <div className="p-5 border-t border-border">
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-brand transition-colors"
                  >
                    <User size={16} /> Account
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-brand transition-colors"
                  >
                    <Heart size={16} /> Wishlist
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
