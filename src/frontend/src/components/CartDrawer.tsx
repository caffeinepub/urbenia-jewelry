import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "../contexts/CartContext";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQuantity,
    totalPrice,
    totalItems,
    clearCart,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm md:max-w-md bg-card border-l border-border z-50 flex flex-col shadow-xl"
            data-ocid="cart.panel"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-brand" />
                <span className="font-display text-lg tracking-wider">
                  Shopping Bag
                </span>
                {totalItems > 0 && (
                  <span className="w-5 h-5 bg-brand text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                data-ocid="cart.close_button"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center h-full gap-4 text-center p-8"
                  data-ocid="cart.empty_state"
                >
                  <ShoppingBag size={40} className="text-border" />
                  <div>
                    <p className="font-display text-xl text-muted-foreground">
                      Your bag is empty
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Discover our exquisite collections
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="btn-brand px-6 py-2.5 rounded"
                    data-ocid="cart.primary_button"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {items.map((item, idx) => (
                    <div
                      key={item.product.id.toString()}
                      className="p-4 flex gap-3"
                      data-ocid={`cart.item.${idx + 1}`}
                    >
                      <div className="w-16 h-16 rounded border border-border overflow-hidden flex-shrink-0">
                        <img
                          src={
                            item.product.imageUrl ||
                            "/assets/generated/featured-product-1.dim_500x500.jpg"
                          }
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-gold tracking-widest uppercase">
                          {item.product.category}
                        </p>
                        <p className="font-medium text-sm text-foreground line-clamp-1 mt-0.5">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.product.weightGrams}g 22K
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 border border-border rounded">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1,
                                )
                              }
                              className="px-2 py-1 text-muted-foreground hover:text-foreground transition-colors"
                              data-ocid={`cart.secondary_button.${idx + 1}`}
                            >
                              <Minus size={10} />
                            </button>
                            <span className="text-xs w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1,
                                )
                              }
                              className="px-2 py-1 text-muted-foreground hover:text-foreground transition-colors"
                              data-ocid={`cart.primary_button.${idx + 1}`}
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                          <p className="font-semibold text-sm text-foreground">
                            ₹
                            {(item.price * item.quantity).toLocaleString(
                              "en-IN",
                              { maximumFractionDigits: 0 },
                            )}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.product.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors self-start mt-1 flex-shrink-0"
                        data-ocid={`cart.delete_button.${idx + 1}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">
                    Subtotal
                  </span>
                  <span className="font-semibold text-foreground">
                    ₹
                    {totalPrice.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Taxes and shipping calculated at checkout
                </p>
                <button
                  type="button"
                  className="btn-brand w-full py-3.5 rounded"
                  data-ocid="cart.submit_button"
                >
                  Proceed to Checkout
                </button>
                <button
                  type="button"
                  onClick={clearCart}
                  className="btn-gold-outline w-full py-2.5 rounded text-destructive border-destructive/50 hover:bg-destructive hover:text-foreground"
                  data-ocid="cart.delete_button"
                >
                  Clear Bag
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
