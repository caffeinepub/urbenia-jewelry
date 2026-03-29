import { Facebook, Instagram, Mail, Twitter, Youtube } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const year = new Date().getFullYear();
  const utm = encodeURIComponent(window.location.hostname);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSubscribed(true);
  }

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="gold-divider" />
      <div className="px-4 md:px-8 lg:px-16 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          <div>
            <h4 className="font-display text-base tracking-widest uppercase text-gold mb-5">
              Shop
            </h4>
            <ul className="space-y-3">
              {[
                "Rings",
                "Necklaces",
                "Earrings",
                "Bracelets",
                "Men's",
                "Gift Sets",
                "New Arrivals",
              ].map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    className="text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base tracking-widest uppercase text-gold mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {[
                "Our Story",
                "Craftsmanship",
                "Sustainability",
                "Press",
                "Careers",
                "Blog",
              ].map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    className="text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base tracking-widest uppercase text-gold mb-5">
              Customer Care
            </h4>
            <ul className="space-y-3">
              {[
                "FAQ",
                "Shipping & Returns",
                "Size Guide",
                "Care Instructions",
                "Contact Us",
                "Track Order",
              ].map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    className="text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base tracking-widest uppercase text-gold mb-5">
              Stay Connected
            </h4>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Subscribe for exclusive collections, gold price alerts, and
              styling tips.
            </p>
            {subscribed ? (
              <div
                className="bg-card border border-gold/30 rounded px-4 py-3 text-sm text-gold"
                data-ocid="newsletter.success_state"
              >
                ✓ Thank you for subscribing!
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col gap-2"
                data-ocid="newsletter.panel"
              >
                <div className="flex items-center gap-2 bg-input rounded border border-border px-3 py-2">
                  <Mail
                    size={13}
                    className="text-muted-foreground flex-shrink-0"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
                    data-ocid="newsletter.input"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-gold py-2.5 rounded w-full"
                  data-ocid="newsletter.submit_button"
                >
                  Subscribe
                </button>
              </form>
            )}
            <div className="flex gap-3 mt-5">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Facebook, label: "Facebook" },
                { icon: Twitter, label: "Twitter" },
                { icon: Youtube, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-colors"
                >
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border px-4 md:px-8 lg:px-16 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="font-display text-sm tracking-widest text-gold/80">
            URBENIA JEWELRY
          </div>
          <p>
            © {year}. Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${utm}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
            >
              caffeine.ai
            </a>
          </p>
          <div className="flex gap-4">
            <button type="button" className="hover:text-gold transition-colors">
              Privacy
            </button>
            <button type="button" className="hover:text-gold transition-colors">
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
