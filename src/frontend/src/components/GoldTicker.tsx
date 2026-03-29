import { TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useGoldPrice } from "../hooks/useQueries";

const MARKETS = [
  { flag: "🇮🇳", name: "INDIA", modifier: 1.0, key: "india-1" },
  { flag: "🇺🇸", name: "USA", modifier: 0.012, key: "usa-1" },
  { flag: "🇦🇪", name: "UAE", modifier: 0.044, key: "uae-1" },
  { flag: "🇬🇧", name: "UK", modifier: 0.0095, key: "uk-1" },
  { flag: "🇸🇬", name: "SGP", modifier: 0.016, key: "sgp-1" },
  { flag: "🇮🇳", name: "INDIA", modifier: 1.0, key: "india-2" },
  { flag: "🇺🇸", name: "USA", modifier: 0.012, key: "usa-2" },
  { flag: "🇦🇪", name: "UAE", modifier: 0.044, key: "uae-2" },
  { flag: "🇬🇧", name: "UK", modifier: 0.0095, key: "uk-2" },
  { flag: "🇸🇬", name: "SGP", modifier: 0.016, key: "sgp-2" },
];

export default function GoldTicker() {
  const { data: goldPrice } = useGoldPrice();
  const prevPriceRef = useRef<number | null>(null);
  const [displayPrice, setDisplayPrice] = useState(6500);
  const [change, setChange] = useState(0.18);
  const [isUp, setIsUp] = useState(true);

  useEffect(() => {
    if (goldPrice !== undefined) {
      const current = Number(goldPrice);
      if (prevPriceRef.current !== null) {
        const diff =
          ((current - prevPriceRef.current) / prevPriceRef.current) * 100;
        setChange(Math.abs(diff));
        setIsUp(current >= prevPriceRef.current);
      }
      prevPriceRef.current = current;
      setDisplayPrice(current);
    }
  }, [goldPrice]);

  return (
    <div className="bg-secondary border-b border-border h-9 overflow-hidden flex items-center">
      <div className="flex-shrink-0 px-4 text-xs font-semibold text-gold uppercase tracking-widest border-r border-border h-full flex items-center">
        <span>GOLD</span>
      </div>
      <div className="flex-1 overflow-hidden relative">
        <div className="ticker-scroll flex whitespace-nowrap">
          {MARKETS.map((market) => (
            <div
              key={market.key}
              className="inline-flex items-center gap-2 px-6 text-xs"
            >
              <span>{market.flag}</span>
              <span className="font-medium text-muted-foreground">
                {market.name}
              </span>
              <span className="font-semibold text-foreground">
                {market.name === "INDIA"
                  ? `₹${(displayPrice * market.modifier).toLocaleString("en-IN", { maximumFractionDigits: 0 })}/g`
                  : market.name === "USA"
                    ? `$${(displayPrice * market.modifier).toFixed(2)}/g`
                    : market.name === "UAE"
                      ? `AED ${(displayPrice * market.modifier).toFixed(2)}/g`
                      : market.name === "UK"
                        ? `£${(displayPrice * market.modifier).toFixed(2)}/g`
                        : `SGD ${(displayPrice * market.modifier).toFixed(2)}/g`}
              </span>
              <span
                className={
                  isUp
                    ? "ticker-up flex items-center gap-0.5"
                    : "ticker-down flex items-center gap-0.5"
                }
              >
                {isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {change.toFixed(2)}%
              </span>
              <span className="text-border mx-2">|</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
