"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { MoveHorizontal, Sparkles } from "lucide-react";

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  description?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Tadilat Öncesi",
  afterLabel = "Tadilat Sonrası",
  title,
  description
}: BeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      let percentage = (x / rect.width) * 100;
      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;
      setSliderPosition(percentage);
    },
    []
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div className="w-full">
      {title && (
        <div className="mb-4">
          <div className="flex items-center gap-2 text-[#0f2b5c] font-bold text-sm uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#0f2b5c]" />
            <span>Dönüşüm Süreci</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-slate-600 mt-1">
              {description}
            </p>
          )}
        </div>
      )}

      <div
        ref={containerRef}
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl border border-slate-200 overflow-hidden select-none cursor-ew-resize shadow-xl group touch-pan-y"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {/* AFTER (Yeni Hali - Alt katman) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={afterImage}
            alt="Tadilat Sonrası"
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
          />
          <div className="absolute top-4 right-4 bg-[#0f2b5c]/90 backdrop-blur-md text-white border border-white/20 text-xs font-bold uppercase px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-2 z-10">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            {afterLabel}
          </div>
        </div>

        {/* BEFORE (Eski Hali - Üst katman, clip-path ile kırpılır) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            src={beforeImage}
            alt="Tadilat Öncesi"
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
          <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white border border-white/20 text-xs font-bold uppercase px-3.5 py-1.5 rounded-full shadow-lg z-10">
            {beforeLabel}
          </div>
        </div>

        {/* Çizgi ve Tutamaç (Handle) */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-[#0f2b5c] shadow-[0_0_15px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-[#0f2b5c] rounded-full shadow-2xl flex items-center justify-center border-2 border-white text-white font-bold group-hover:scale-110 transition-transform">
            <MoveHorizontal className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>

        {/* Alt Bilgi İpucu */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-slate-900/70 backdrop-blur-md text-white text-[11px] font-medium px-4 py-1.5 rounded-full pointer-events-none z-10 transition-opacity opacity-85 group-hover:opacity-100">
          ↔️ Karşılaştırmak için sola/sağa kaydırın
        </div>
      </div>
    </div>
  );
}
