import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface HeroSectionProps {
  onShopNow: () => void;
}

export default function HeroSection({ onShopNow }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative min-h-[60vh] md:min-h-[80vh] lg:min-h-screen max-h-[800px] overflow-hidden flex flex-col md:flex-row"
    >
      <div className="relative z-10 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24 py-16 md:py-0 w-full md:w-[52%] lg:w-[48%] bg-background">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4 md:mb-6">
            New Collection 2026
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.05] text-foreground mb-4 md:mb-6">
            Elegance
            <br />
            <em className="italic text-gold">in Every</em>
            <br />
            Detail
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-xs mb-8 md:mb-10 leading-relaxed">
            Handcrafted 22K gold jewelry where timeless artistry meets modern
            elegance. Each piece tells a story of heritage and passion.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onShopNow}
              className="btn-brand px-6 md:px-8 py-3 md:py-3.5 rounded flex items-center gap-2"
              data-ocid="hero.primary_button"
            >
              Shop Now
              <ArrowRight size={14} />
            </button>
            <button
              type="button"
              className="btn-brand-outline px-6 md:px-8 py-3 md:py-3.5 rounded"
              data-ocid="hero.secondary_button"
            >
              Our Story
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex gap-6 md:gap-8 mt-10 md:mt-14 pt-6 md:pt-8 border-t border-border"
        >
          {[
            { value: "22K", label: "Certified Gold" },
            { value: "500+", label: "Designs" },
            { value: "15K+", label: "Happy Clients" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-xl md:text-2xl font-semibold text-gold">
                {stat.value}
              </div>
              <div className="text-[10px] tracking-widest uppercase text-muted-foreground mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-full md:w-[48%] lg:w-[52%] min-h-[300px] md:min-h-0 relative overflow-hidden"
      >
        <img
          src="/assets/generated/hero-jewelry.dim_1200x700.jpg"
          alt="Urbenia Jewelry Collection"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent md:from-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-background/90 backdrop-blur-sm border border-gold/50 rounded px-4 py-3"
        >
          <div className="text-[10px] tracking-widest uppercase text-gold mb-1">
            Live Price
          </div>
          <div className="font-display text-lg font-semibold text-foreground">
            22K Gold
          </div>
          <div className="text-xs text-muted-foreground">
            Updated in real-time
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
