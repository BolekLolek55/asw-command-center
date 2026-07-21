"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

interface TickerItem {
  symbol: string;
  price: string;
  change: string;
  color: string;
}

const defaultTicker: TickerItem[] = [
  { symbol: "GOLD", price: "2,412.30", change: "+1.2%", color: "#fbbf24" },
  { symbol: "BTC", price: "67,245.00", change: "+3.4%", color: "#f97316" },
  { symbol: "S&P500", price: "5,487.23", change: "-0.3%", color: "#ef4444" },
  { symbol: "WTI", price: "78.45", change: "+0.8%", color: "#84cc16" },
  { symbol: "EUR/PLN", price: "4.32", change: "-0.1%", color: "#22d3ee" },
  { symbol: "NASDAQ", price: "17,892.45", change: "+1.1%", color: "#4ade80" },
  { symbol: "ETH", price: "3,456.78", change: "+2.1%", color: "#a78bfa" },
  { symbol: "SILVER", price: "28.45", change: "+0.5%", color: "#c0c0c0" },
  { symbol: "USD/PLN", price: "3.98", change: "+0.2%", color: "#60a5fa" },
];

export function TickerBar() {
  const [time, setTime] = useState("");
  const [tickerData] = useState<TickerItem[]>(defaultTicker);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toISOString().replace("T", " ").substring(0, 19) + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-12 bg-military-panel border-b border-military-border flex items-center px-4 gap-6 overflow-hidden shrink-0">
      {/* System Status */}
      <div className="flex items-center gap-2 text-xs text-military-green shrink-0">
        <Activity className="w-3 h-3 animate-pulse" />
        <span className="font-bold tracking-widest">SYSTEM ONLINE</span>
      </div>

      <div className="h-6 w-px bg-military-border shrink-0" />

      {/* Ticker */}
      <div className="flex-1 overflow-hidden relative">
        <motion.div
          className="flex items-center gap-6 whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {[...tickerData, ...tickerData, ...tickerData].map((item, index) => (
            <div key={`${item.symbol}-${index}`} className="flex items-center gap-2 shrink-0">
              <span className="font-bold" style={{ color: item.color }}>
                {item.symbol}
              </span>
              <span className="text-military-text">{item.price}</span>
              <span
                className={
                  item.change.startsWith("+") ? "text-military-green" : "text-military-red"
                }
              >
                {item.change}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="h-6 w-px bg-military-border shrink-0" />

      {/* Clock */}
      <div className="text-xs text-military-muted font-mono shrink-0 tabular-nums">
        {time}
      </div>
    </div>
  );
}
