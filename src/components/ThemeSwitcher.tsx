"use client";

import { useEffect, useState, useRef } from "react";
import { Palette, Check, Shield, Building2, Sun, Sparkles } from "lucide-react";

export type ThemeType = "navy" | "graphite" | "light";

interface ThemeOption {
  id: ThemeType;
  name: string;
  badge: string;
  desc: string;
  colors: string[];
  icon: typeof Shield;
}

export const themeOptions: ThemeOption[] = [
  {
    id: "navy",
    name: "Derin Güven Laciverti",
    badge: "Bilimsel Güven",
    desc: "Mühendislik, resmi sözleşme taahhüdü ve sarsılmaz istikrar algısı.",
    colors: ["#090e24", "#16244e", "#c9a86a"],
    icon: Shield,
  },
  {
    id: "graphite",
    name: "Minimalist Grafit",
    badge: "Elit Mimari",
    desc: "Mat taş, sıcak vizon ve modern iç mimarlık stüdyosu prestiji.",
    colors: ["#121316", "#222329", "#c5ad97"],
    icon: Building2,
  },
  {
    id: "light",
    name: "Aydınlık Kurumsal",
    badge: "Ferah & Klasik",
    desc: "Buzul beyazı zemin, derin holding laciverti ve şeffaf yapı.",
    colors: ["#f8fafc", "#ffffff", "#0d4b82"],
    icon: Sun,
  },
];

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>("navy");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sakarya_theme") as ThemeType;
      if (saved && (saved === "navy" || saved === "graphite" || saved === "light")) {
        setCurrentTheme(saved);
        document.documentElement.setAttribute("data-theme", saved);
      } else {
        // Default to navy (trust theme)
        setCurrentTheme("navy");
        document.documentElement.setAttribute("data-theme", "navy");
      }
    } catch {
      document.documentElement.setAttribute("data-theme", "navy");
    }
  }, []);

  const handleSelect = (id: ThemeType) => {
    setCurrentTheme(id);
    document.documentElement.setAttribute("data-theme", id);
    try {
      localStorage.setItem("sakarya_theme", id);
    } catch {
      // ignore
    }
    setIsOpen(false);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentOption = themeOptions.find((t) => t.id === currentTheme) || themeOptions[0];
  const IconComponent = currentOption.icon;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#2b2d35] bg-[#18191d] hover:bg-[#222329] text-xs font-semibold text-slate-200 transition-all shadow-sm"
        title="Kurumsal Renk Temasını Değiştir"
        aria-label="Kurumsal Renk Temasını Değiştir"
      >
        <span className="flex items-center gap-1.5">
          <IconComponent className="w-3.5 h-3.5 text-[#c5ad97]" />
          <span className="hidden xl:inline">{currentOption.name}</span>
          <span className="xl:hidden text-[11px]">{currentOption.badge}</span>
        </span>
        <span className="flex gap-1 ml-1">
          {currentOption.colors.map((c, i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full border border-black/30"
              style={{ backgroundColor: c }}
            />
          ))}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-[#18191d] border border-[#2b2d35] rounded-2xl p-3 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#2b2d35] px-1">
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#c5ad97]">
              <Palette className="w-3.5 h-3.5" />
              <span>Kurumsal Tema Seçimi</span>
            </div>
            <span className="text-[10px] text-slate-400 bg-[#121316] px-2 py-0.5 rounded-full border border-[#2b2d35]">
              3 Bilimsel Mod
            </span>
          </div>

          <div className="space-y-1.5">
            {themeOptions.map((opt) => {
              const OptIcon = opt.icon;
              const isSelected = currentTheme === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  className={`w-full text-left p-2.5 rounded-xl transition-all border flex items-start justify-between gap-3 ${
                    isSelected
                      ? "bg-[#121316] border-[#c5ad97] text-white shadow-md"
                      : "bg-[#18191d] border-transparent hover:bg-[#121316]/70 text-slate-300 hover:text-white"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <OptIcon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-[#c5ad97]" : "text-slate-400"}`} />
                      <span className="text-xs font-bold truncate">{opt.name}</span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                        isSelected
                          ? "bg-[#c5ad97]/20 text-[#ded0c3] border border-[#c5ad97]/30"
                          : "bg-[#121316] text-slate-400 border border-[#2b2d35]"
                      }`}>
                        {opt.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-1 leading-snug">
                      {opt.desc}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 shrink-0 pt-0.5">
                    <div className="flex gap-1">
                      {opt.colors.map((c, i) => (
                        <span
                          key={i}
                          className="w-2.5 h-2.5 rounded-full border border-black/40 shadow-sm"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#c5ad97]" />}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-2.5 pt-2 border-t border-[#2b2d35] px-1 text-[10px] text-slate-400 leading-tight">
            💡 <strong className="text-slate-300">Renk Psikolojisi:</strong> Lacivert, inşaat ve mühendislikte tüketici algısında %57 ile en yüksek güven ve istikrar uyandıran ana renktir.
          </div>
        </div>
      )}
    </div>
  );
}
