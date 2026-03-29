import { Gift } from "lucide-react";
import { motion } from "motion/react";

export default function GiftBanner() {
  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded border border-gold/30 flex flex-col md:flex-row min-h-[280px] md:min-h-[360px]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-card to-secondary" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,oklch(0.72_0.12_75_/_0.08),transparent_60%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

        <div className="relative w-full md:w-2/5 min-h-[220px] md:min-h-0 overflow-hidden flex-shrink-0">
          <img
            src="/assets/generated/gift-banner.dim_800x500.jpg"
            alt="Gift Jewelry"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/80 hidden md:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent md:hidden" />
        </div>

        <div className="relative z-10 flex flex-col justify-center p-6 md:p-10 lg:p-16 flex-1">
          <div className="flex items-center gap-2 mb-4">
            <Gift size={14} className="text-gold" />
            <span className="text-gold text-xs tracking-[0.4em] uppercase">
              Gift Collection
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-light text-foreground leading-tight mb-4">
            Gift the
            <br />
            <em className="italic text-gold">Extraordinary</em>
          </h2>
          <p className="text-muted-foreground text-sm max-w-sm mb-6 md:mb-8 leading-relaxed">
            Make every occasion unforgettable with our curated gift sets. From
            anniversaries to birthdays, find the perfect gold jewelry to express
            your love.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="btn-brand px-6 py-3 rounded"
              data-ocid="gift.primary_button"
            >
              Shop Gifts
            </button>
            <button
              type="button"
              className="btn-brand-outline px-6 py-3 rounded"
              data-ocid="gift.secondary_button"
            >
              Gift Wrapping
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
