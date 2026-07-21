"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Map as MapIcon, Crosshair, Navigation, Layers } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface MapMarker {
  x: number;
  y: number;
  label: string;
  type: "base" | "conflict" | "ally" | "neutral";
  info: string;
}

const markers: MapMarker[] = [
  { x: 440, y: 225, label: "WARSZAWA", type: "base", info: "HQ - Akademia Sztuki Wojennej" },
  { x: 380, y: 200, label: "BERLIN", type: "ally", info: "NATO Partner" },
  { x: 500, y: 240, label: "KIJÓW", type: "conflict", info: "Strefa działań wojennych" },
  { x: 480, y: 180, label: "WILNO", type: "ally", info: "NATO - Wschodnia Flanka" },
  { x: 520, y: 280, label: "BUKARESZT", type: "ally", info: "NATO Partner" },
  { x: 420, y: 260, label: "PRAGA", type: "ally", info: "NATO Partner" },
  { x: 460, y: 300, label: "BRATYSŁAWA", type: "neutral", info: "UE - Neutralny" },
];

const typeColors = {
  base: "#4ade80",
  ally: "#60a5fa",
  conflict: "#ef4444",
  neutral: "#fbbf24",
};

const layers = ["NATO", "UE", "POLSKA", "KONFLIKTY"];

export default function MapPage() {
  const [activeLayer, setActiveLayer] = useState("NATO");
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 800,
      y: ((e.clientY - rect.top) / rect.height) * 500,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4 h-full"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold tracking-wide">MAPA TAKTYCZNA</h1>
        <div className="flex items-center gap-2">
          {layers.map((layer) => (
            <button
              key={layer}
              onClick={() => setActiveLayer(layer)}
              className={`text-[10px] px-3 py-1.5 rounded border transition-all ${
                activeLayer === layer
                  ? "bg-military-accent text-military-green border-military-green/30"
                  : "bg-military-panel text-military-muted border-military-border hover:border-military-green/30"
              }`}
            >
              {layer}
            </button>
          ))}
        </div>
      </div>

      <Card className="p-0 overflow-hidden relative">
        <div className="relative h-[600px] bg-[#0a0f0d]">
          {/* SVG Map */}
          <svg
            viewBox="0 0 800 500"
            className="w-full h-full cursor-crosshair"
            onMouseMove={handleMouseMove}
          >
            {/* Grid Pattern */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="#1a3c2e"
                  strokeWidth="0.5"
                  opacity="0.3"
                />
              </pattern>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background Grid */}
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Europe Simplified Outline */}
            <path
              d="M 350 150 Q 400 120 450 130 Q 500 140 520 180 Q 540 220 520 260 Q 500 300 450 320 Q 400 340 350 330 Q 300 320 280 280 Q 260 240 280 200 Q 300 160 350 150 Z"
              fill="#1a3c2e"
              stroke="#2d5a3f"
              strokeWidth="1"
              opacity="0.5"
            />

            {/* Poland Highlight */}
            <motion.path
              d="M 420 200 L 460 195 L 470 220 L 460 250 L 430 255 L 410 230 Z"
              fill="#4ade80"
              fillOpacity="0.1"
              stroke="#4ade80"
              strokeWidth="1.5"
              animate={{ fillOpacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Connection Lines (NATO) */}
            {activeLayer === "NATO" && (
              <g opacity="0.3">
                <line x1="440" y1="225" x2="380" y2="200" stroke="#60a5fa" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="440" y1="225" x2="480" y2="180" stroke="#60a5fa" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="440" y1="225" x2="420" y2="260" stroke="#60a5fa" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="440" y1="225" x2="520" y2="280" stroke="#60a5fa" strokeWidth="1" strokeDasharray="4 4" />
              </g>
            )}

            {/* Markers */}
            {markers.map((marker, index) => (
              <g key={index}>
                {/* Pulse Effect */}
                <motion.circle
                  cx={marker.x}
                  cy={marker.y}
                  r="8"
                  fill={typeColors[marker.type]}
                  opacity="0.3"
                  animate={{ r: [8, 16, 8], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                />
                {/* Main Dot */}
                <circle
                  cx={marker.x}
                  cy={marker.y}
                  r="4"
                  fill={typeColors[marker.type]}
                  className="cursor-pointer hover:r-6 transition-all"
                  onClick={() => setSelectedMarker(marker)}
                  filter="url(#glow)"
                />
                {/* Label */}
                <text
                  x={marker.x}
                  y={marker.y + 18}
                  textAnchor="middle"
                  fill={typeColors[marker.type]}
                  fontSize="8"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {marker.label}
                </text>
              </g>
            ))}

            {/* MGRS Grid Lines */}
            {Array.from({ length: 20 }, (_, i) => (
              <g key={`grid-${i}`} opacity="0.1">
                <line x1={i * 40} y1="0" x2={i * 40} y2="500" stroke="#4ade80" strokeWidth="0.5" />
                <line x1="0" y1={i * 25} x2="800" y2={i * 25} stroke="#4ade80" strokeWidth="0.5" />
              </g>
            ))}

            {/* Coordinates Display */}
            <text
              x="10"
              y="490"
              fill="#5a8c6e"
              fontSize="8"
              fontFamily="monospace"
            >
              MGRS: {Math.floor(mousePos.x / 40)}-{Math.floor(mousePos.y / 25)} | X:{mousePos.x.toFixed(0)} Y:{mousePos.y.toFixed(0)}
            </text>
          </svg>

          {/* Info Panel */}
          {selectedMarker && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-4 bg-military-panel/95 backdrop-blur border border-military-border rounded p-4 max-w-xs"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-bold" style={{ color: typeColors[selectedMarker.type] }}>
                  {selectedMarker.label}
                </h4>
                <button
                  onClick={() => setSelectedMarker(null)}
                  className="text-military-muted hover:text-military-text"
                >
                  ✕
                </button>
              </div>
              <p className="text-xs text-military-muted mb-2">{selectedMarker.info}</p>
              <Badge
                variant="default"
                style={{
                  borderColor: `${typeColors[selectedMarker.type]}30`,
                  color: typeColors[selectedMarker.type],
                }}
              >
                {selectedMarker.type.toUpperCase()}
              </Badge>
            </motion.div>
          )}

          {/* Legend */}
          <div className="absolute top-4 right-4 bg-military-panel/95 backdrop-blur border border-military-border rounded p-3">
            <div className="text-[10px] text-military-muted mb-2">LEGENDA</div>
            {Object.entries(typeColors).map(([type, color]) => (
              <div key={type} className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-[10px] text-military-text capitalize">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
