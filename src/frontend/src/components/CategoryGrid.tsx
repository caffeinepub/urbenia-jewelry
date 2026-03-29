import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const CATEGORIES = [
  {
    label: "Rings",
    key: "rings",
    image: "/assets/generated/category-rings.dim_600x400.jpg",
    description: "Solitaires, Bands & More",
  },
  {
    label: "Necklaces",
    key: "necklaces",
    image: "/assets/generated/category-necklaces.dim_600x400.jpg",
    description: "Pendants, Chains & Sets",
  },
  {
    label: "Bracelets",
    key: "bracelets",
    image: "/assets/generated/category-bracelets.dim_600x400.jpg",
    description: "Bangles, Cuffs & Kadas",
  },
  {
    label: "Earrings",
    key: "earrings",
    image: "/assets/generated/category-earrings.dim_600x400.jpg",
    description: "Studs, Drops & Jhumkas",
  },
];

interface CategoryGridProps {
  onCategorySelect: (category: string) => void;
}

export default function CategoryGrid({ onCategorySelect }: CategoryGridProps) {
  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-16">
      <div className="text-center mb-8 md:mb-12">
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">
          Explore
        </p>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-foreground">
          Our Collections
        </h2>
      </div>
      <div className="gold-divider mb-8 md:mb-12" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
        {CATEGORIES.map((cat, idx) => (
          <motion.button
            key={cat.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            onClick={() => onCategorySelect(cat.key)}
            className="group relative overflow-hidden rounded aspect-[3/4] sm:aspect-[4/5] border border-border hover:border-gold transition-all duration-300 product-card"
            data-ocid={`category.item.${idx + 1}`}
          >
            <img
              src={cat.image}
              alt={cat.label}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="category-overlay absolute inset-0" />
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
              <div className="flex items-end justify-between">
                <div>
                  <div className="font-display text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
                    {cat.label}
                  </div>
                  <div className="text-[10px] text-muted-foreground tracking-wider mt-0.5">
                    {cat.description}
                  </div>
                </div>
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-gold/60 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-background transition-all">
                  <ArrowRight size={12} />
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
