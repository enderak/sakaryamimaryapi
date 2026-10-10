"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { 
  Trophy, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Flame, 
  Sparkles, 
  MessageCircle, 
  ChevronRight, 
  Hammer, 
  ShieldCheck, 
  Award,
  ArrowLeft
} from "lucide-react";
import { companyInfo } from "@/data/company";

// Sound Synthesizer via Web Audio API
class GameAudio {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;

  constructor() {
    // Lazy initialize on first user interaction
  }

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.muted = muted;
  }

  public isMuted() {
    return this.muted;
  }

  // Pull / Tension sound
  public playPull() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Launch sound
  public playLaunch() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch {}
  }

  // Brick hit wall (thud)
  public playHitWall() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(90, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {}
  }

  // Score / Target hit (bell/ding)
  public playScore() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.06);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.06 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.06);
        osc.stop(this.ctx.currentTime + idx * 0.06 + 0.25);
      });
    } catch {}
  }
}

interface Target {
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number;
  points: number;
}

export default function BrickTossGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<GameAudio>(new GameAudio());

  // Game state
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [bricksLeft, setBricksLeft] = useState(6);
  const [level, setLevel] = useState(1);
  const [combo, setCombo] = useState(0);
  const [wind, setWind] = useState(0); // Wind force (-2 to +2)
  const [gameOver, setGameOver] = useState(false);
  const [muted, setMuted] = useState(false);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const [floatingText, setFloatingText] = useState<{ text: string; x: number; y: number } | null>(null);

  // Slingshot anchor (launch pad)
  const slingshot = useRef({ x: 90, y: 380 });
  const isDragging = useRef(false);
  const dragPos = useRef({ x: 90, y: 380 });

  // Brick Physics state
  const brick = useRef<{
    active: boolean;
    x: number;
    y: number;
    vx: number;
    vy: number;
    angle: number;
    va: number;
    width: number;
    height: number;
    color: string;
  }>({
    active: false,
    x: 90,
    y: 380,
    vx: 0,
    vy: 0,
    angle: 0,
    va: 0,
    width: 24,
    height: 14,
    color: "#b91c1c"
  });

  // Wall obstacle
  const wall = useRef({
    x: 230,
    width: 32,
    height: 180, // from bottom
    y: 0
  });

  // Target Basket (Harç Teknesi / El Arabası)
  const target = useRef<Target>({
    x: 350,
    y: 400,
    width: 65,
    height: 35,
    vx: 1.2,
    points: 100
  });

  // Particles for celebration
  const particles = useRef<Array<{ x: number; y: number; vx: number; vy: number; color: string; life: number }>>([]);

  // Load high score
  useEffect(() => {
    try {
      const saved = localStorage.getItem("smy_brick_high_score");
      if (saved) setHighScore(parseInt(saved, 10));
    } catch {}
  }, []);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    audioRef.current.setMuted(next);
  };

  // Reset or Start New Game
  const resetGame = useCallback(() => {
    setScore(0);
    setBricksLeft(6);
    setLevel(1);
    setCombo(0);
    setWind(0);
    setGameOver(false);
    setRewardClaimed(false);
    brick.current.active = false;
    brick.current.x = slingshot.current.x;
    brick.current.y = slingshot.current.y;
    isDragging.current = false;
    dragPos.current = { x: slingshot.current.x, y: slingshot.current.y };
  }, []);

  // Next Round / Level advance
  const setupLevel = useCallback((lvl: number) => {
    setLevel(lvl);
    // Randomize wall height and wind
    const wallHeight = Math.min(240, 160 + lvl * 15);
    wall.current.height = wallHeight;
    // Wind factor on level 2+
    const newWind = lvl > 1 ? Number(((Math.random() - 0.5) * (lvl * 1.2)).toFixed(1)) : 0;
    setWind(newWind);
    // Target position & speed
    target.current.x = 320 + Math.random() * 80;
    target.current.vx = (lvl > 1 ? 1 + lvl * 0.4 : 0.8) * (Math.random() > 0.5 ? 1 : -1);
  }, []);

  // Main Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const GRAVITY = 0.38;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      // 1. Clear & Background Gradient (Construction Sky)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, "#e0f2fe");
      skyGrad.addColorStop(0.7, "#f1f5f9");
      skyGrad.addColorStop(1, "#cbd5e1");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Distant Sakarya Construction Silhouettes
      ctx.fillStyle = "rgba(148, 163, 184, 0.25)";
      ctx.fillRect(30, height - 160, 60, 160);
      ctx.fillRect(110, height - 210, 80, 210);
      ctx.fillRect(290, height - 190, 70, 190);
      ctx.fillRect(380, height - 240, 85, 240);

      // Construction Crane in Background
      ctx.strokeStyle = "rgba(203, 213, 225, 0.6)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(330, height - 260);
      ctx.lineTo(330, height - 40);
      ctx.lineTo(440, height - 260);
      ctx.stroke();

      // Ground (Zemin)
      const groundY = height - 50;
      ctx.fillStyle = "#64748b";
      ctx.fillRect(0, groundY, width, 50);
      ctx.fillStyle = "#475569";
      ctx.fillRect(0, groundY, width, 6);

      // Update Target Movement
      if (!gameOver) {
        target.current.x += target.current.vx;
        // Bounce within bounds on right side of wall
        const minX = wall.current.x + wall.current.width + 25;
        const maxX = width - target.current.width - 15;
        if (target.current.x <= minX) {
          target.current.x = minX;
          target.current.vx *= -1;
        } else if (target.current.x >= maxX) {
          target.current.x = maxX;
          target.current.vx *= -1;
        }
      }

      // Draw The Target: "Sakarya Harç Arabası / Sepet"
      const t = target.current;
      t.y = groundY - t.height;
      
      // Wheelbarrow tub
      ctx.fillStyle = "#0f2b5c";
      ctx.beginPath();
      ctx.roundRect(t.x, t.y + 6, t.width, t.height - 6, [4, 8, 4, 4]);
      ctx.fill();

      // Golden mortar inside (Hedef Harç)
      ctx.fillStyle = "#f59e0b";
      ctx.fillRect(t.x + 4, t.y + 8, t.width - 8, 6);

      // Wheelbarrow wheel
      ctx.fillStyle = "#1e293b";
      ctx.beginPath();
      ctx.arc(t.x + t.width / 2, groundY - 5, 6, 0, Math.PI * 2);
      ctx.fill();

      // Target Label
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 9px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("HARÇ TEKNESİ", t.x + t.width / 2, t.y + 22);

      // Draw The Wall (Orta Tuğla Duvar)
      const wallX = wall.current.x;
      const wallW = wall.current.width;
      const wallH = wall.current.height;
      const wallY = groundY - wallH;
      wall.current.y = wallY;

      // Draw Wall Bricks
      ctx.fillStyle = "#b45309";
      ctx.fillRect(wallX, wallY, wallW, wallH);

      // Brick mortar lines
      ctx.strokeStyle = "#fef3c7";
      ctx.lineWidth = 1.2;
      const rowHeight = 12;
      for (let y = wallY; y < groundY; y += rowHeight) {
        ctx.beginPath();
        ctx.moveTo(wallX, y);
        ctx.lineTo(wallX + wallW, y);
        ctx.stroke();
      }

      // Scaffolding on top of wall (İskele)
      ctx.strokeStyle = "#0f2b5c";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(wallX - 6, wallY);
      ctx.lineTo(wallX + wallW + 6, wallY);
      ctx.moveTo(wallX + 4, wallY - 14);
      ctx.lineTo(wallX + wallW - 4, wallY - 14);
      ctx.stroke();

      // Wall warning label
      ctx.fillStyle = "#fef08a";
      ctx.fillRect(wallX + 2, wallY + 12, wallW - 4, 14);
      ctx.fillStyle = "#854d0e";
      ctx.font = "bold 8px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("DUVAR", wallX + wallW / 2, wallY + 22);

      // Draw Slingshot Stand (Fırlatma Platformu)
      const sx = slingshot.current.x;
      const sy = slingshot.current.y;
      ctx.strokeStyle = "#78350f";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(sx, groundY);
      ctx.lineTo(sx, sy + 15);
      ctx.lineTo(sx - 14, sy - 15);
      ctx.moveTo(sx, sy + 15);
      ctx.lineTo(sx + 14, sy - 15);
      ctx.stroke();

      // If user is dragging (Aiming), draw elastic bands and predicted trajectory dots
      if (isDragging.current) {
        const dx = dragPos.current.x;
        const dy = dragPos.current.y;

        // Slingshot rubber bands
        ctx.strokeStyle = "#991b1b";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(sx - 14, sy - 15);
        ctx.lineTo(dx, dy);
        ctx.moveTo(sx + 14, sy - 15);
        ctx.lineTo(dx, dy);
        ctx.stroke();

        // Trajectory Prediction Arc (Noktalı Atış Rotası)
        const simVx = (sx - dx) * 0.17 + wind * 0.3;
        const simVy = (sy - dy) * 0.17;
        let simX = sx;
        let simY = sy;
        let simVelY = simVy;

        ctx.fillStyle = "rgba(15, 43, 92, 0.75)";
        for (let i = 0; i < 22; i++) {
          simX += simVx;
          simVelY += GRAVITY;
          simY += simVelY;

          // Stop drawing arc if it hits ground or wall
          if (simY >= groundY) break;
          if (simX >= wallX && simX <= wallX + wallW && simY >= wallY) break;

          ctx.beginPath();
          ctx.arc(simX, simY, 2.8, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw Brick inside the slingshot pouch
        ctx.save();
        ctx.translate(dx, dy);
        ctx.fillStyle = brick.current.color;
        ctx.fillRect(-brick.current.width / 2, -brick.current.height / 2, brick.current.width, brick.current.height);
        ctx.strokeStyle = "#7f1d1d";
        ctx.lineWidth = 1;
        ctx.strokeRect(-brick.current.width / 2, -brick.current.height / 2, brick.current.width, brick.current.height);
        ctx.restore();
      } else if (!brick.current.active) {
        // Idle brick resting on slingshot
        ctx.fillStyle = brick.current.color;
        ctx.fillRect(sx - 12, sy - 7, brick.current.width, brick.current.height);
      }

      // Flying Brick Physics & Collision
      if (brick.current.active) {
        const b = brick.current;
        b.x += b.vx;
        b.vy += GRAVITY;
        b.vx += wind * 0.015; // wind influence
        b.y += b.vy;
        b.angle += b.va;

        // Draw flying rotating brick
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.angle);
        ctx.fillStyle = b.color;
        ctx.fillRect(-b.width / 2, -b.height / 2, b.width, b.height);
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1;
        ctx.strokeRect(-b.width / 2, -b.height / 2, b.width, b.height);
        ctx.restore();

        // 1. Collision with WALL (Duvara Çarpma)
        if (
          b.x + b.width / 2 >= wallX &&
          b.x - b.width / 2 <= wallX + wallW &&
          b.y + b.height / 2 >= wallY &&
          b.y - b.height / 2 <= groundY
        ) {
          audioRef.current.playHitWall();
          b.active = false;
          setCombo(0);
          setFloatingText({ text: "Duvara Çarptı! 🧱", x: wallX + 10, y: wallY - 10 });
          handleTurnFinished(false);
        }

        // 2. Collision with TARGET (Harç Teknesine Başarılı Aşırtma!)
        else if (
          b.x >= t.x &&
          b.x <= t.x + t.width &&
          b.y + b.height / 2 >= t.y &&
          b.y <= t.y + t.height
        ) {
          audioRef.current.playScore();
          b.active = false;
          const nextCombo = combo + 1;
          setCombo(nextCombo);
          const bonus = nextCombo > 1 ? nextCombo * 50 : 0;
          const earned = t.points + bonus;
          setScore((prev) => {
            const newScore = prev + earned;
            if (newScore > highScore) {
              setHighScore(newScore);
              try { localStorage.setItem("smy_brick_high_score", String(newScore)); } catch {}
            }
            return newScore;
          });

          // Spawn celebration confetti particles
          for (let p = 0; p < 20; p++) {
            particles.current.push({
              x: b.x,
              y: b.y,
              vx: (Math.random() - 0.5) * 6,
              vy: -Math.random() * 5 - 2,
              color: ["#f59e0b", "#10b981", "#0f2b5c", "#ef4444"][Math.floor(Math.random() * 4)],
              life: 30
            });
          }

          setFloatingText({ 
            text: nextCombo > 1 ? `TAM İSABET! +${earned} (x${nextCombo} Combo!) 🔥` : `HARÇ DOLDU! +${earned} 🎯`, 
            x: t.x + 10, 
            y: t.y - 20 
          });
          handleTurnFinished(true);
        }

        // 3. Ground Hit (Yere Düşme)
        else if (b.y + b.height / 2 >= groundY) {
          b.active = false;
          audioRef.current.playHitWall();
          setCombo(0);
          setFloatingText({ text: "Iskaladın! 💨", x: b.x, y: groundY - 15 });
          handleTurnFinished(false);
        }

        // 4. Out of bounds (Sağdan taşma)
        else if (b.x > width + 40 || b.y > height + 40) {
          b.active = false;
          setCombo(0);
          handleTurnFinished(false);
        }
      }

      // Render Particles
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2;
        p.life--;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 4, 4);
        if (p.life <= 0) particles.current.splice(i, 1);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameOver, combo, highScore, wind]);

  // Turn finished logic (reduce brick, check game over, advance level)
  const handleTurnFinished = (success: boolean) => {
    setTimeout(() => {
      setFloatingText(null);
    }, 1800);

    setBricksLeft((prev) => {
      const remaining = prev - 1;
      if (remaining <= 0) {
        setGameOver(true);
        return 0;
      }
      if (success) {
        // Progress level every 2 successful hits
        setLevel((currentLvl) => {
          const nextLvl = currentLvl + 1;
          setupLevel(nextLvl);
          return nextLvl;
        });
      }
      return remaining;
    });
  };

  // Touch / Mouse coordinate extraction
  const getCanvasCoords = (e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    return {
      x: ((clientX - rect.left) / rect.width) * canvas.width,
      y: ((clientY - rect.top) / rect.height) * canvas.height
    };
  };

  // Interaction handlers
  const handleStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (gameOver || brick.current.active) return;
    const coords = getCanvasCoords(e);
    const sx = slingshot.current.x;
    const sy = slingshot.current.y;
    // Check if touch is near slingshot
    const dist = Math.hypot(coords.x - sx, coords.y - sy);
    if (dist < 60) {
      isDragging.current = true;
      dragPos.current = coords;
      audioRef.current.playPull();
    }
  };

  const handleMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging.current) return;
    const coords = getCanvasCoords(e);
    const sx = slingshot.current.x;
    const sy = slingshot.current.y;

    // Limit maximum drag pull distance
    const maxPull = 90;
    const dx = coords.x - sx;
    const dy = coords.y - sy;
    const angle = Math.atan2(dy, dx);
    const dist = Math.min(maxPull, Math.hypot(dx, dy));

    // Only allow dragging backwards & downwards (slingshot mechanics)
    dragPos.current = {
      x: sx + Math.cos(angle) * dist,
      y: sy + Math.sin(angle) * dist
    };
  };

  const handleEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const sx = slingshot.current.x;
    const sy = slingshot.current.y;
    const dx = sx - dragPos.current.x;
    const dy = sy - dragPos.current.y;

    // Minimum pull check
    if (Math.hypot(dx, dy) < 15) {
      return;
    }

    // Launch Brick
    audioRef.current.playLaunch();
    const forceMultiplier = 0.17;
    brick.current.x = sx;
    brick.current.y = sy;
    brick.current.vx = dx * forceMultiplier;
    brick.current.vy = dy * forceMultiplier;
    brick.current.angle = 0;
    brick.current.va = (dx > 0 ? 0.08 : -0.08) * (Math.random() + 0.5);
    brick.current.active = true;
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden text-slate-800">
      {/* Game Header Bar */}
      <div className="bg-[#0f2b5c] p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-400 text-[#0f2b5c] flex items-center justify-center font-black shadow-sm">
            <Hammer className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-black leading-tight">Duvardan Tuğla Aşırtma</h2>
            <p className="text-[10px] text-amber-300 font-medium">Sakarya Şantiye Ustası Oyunu</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            title={muted ? "Sesi Aç" : "Sesi Kapat"}
            aria-label="Ses Kontrolü"
          >
            {muted ? <VolumeX className="w-4 h-4 text-rose-300" /> : <Volume2 className="w-4 h-4 text-emerald-300" />}
          </button>

          <button
            onClick={resetGame}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Yeniden Başlat"
            aria-label="Yeniden Başlat"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="bg-slate-100/80 px-4 py-2.5 border-b border-slate-200 grid grid-cols-4 gap-2 text-center text-xs">
        {/* Puan */}
        <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] text-slate-500 font-bold block">PUAN</span>
          <span className="text-sm font-black text-[#0f2b5c]">{score}</span>
        </div>

        {/* Kalan Tuğla */}
        <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] text-slate-500 font-bold block">KALAN TUĞLA</span>
          <div className="flex items-center justify-center gap-1 mt-0.5">
            {Array.from({ length: 6 }).map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-3 rounded-xs ${
                  idx < bricksLeft ? "bg-red-600 shadow-xs" : "bg-slate-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Seviye & Rüzgar */}
        <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] text-slate-500 font-bold block">SEVİYE {level}</span>
          <span className="text-[11px] font-bold text-slate-700">
            {wind === 0 ? "Rüzgarsız" : wind > 0 ? `➡ +${wind}` : `⬅ ${wind}`}
          </span>
        </div>

        {/* En Yüksek Skor */}
        <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] text-slate-500 font-bold block flex items-center justify-center gap-1">
            <Trophy className="w-2.5 h-2.5 text-amber-500" />
            REKOR
          </span>
          <span className="text-sm font-black text-amber-600">{highScore}</span>
        </div>
      </div>

      {/* Canvas Container */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] bg-slate-200 select-none touch-none overflow-hidden">
        <canvas
          ref={canvasRef}
          width={480}
          height={380}
          className="w-full h-full block cursor-crosshair"
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
        />

        {/* Instructions Overlay on first round */}
        {!brick.current.active && !isDragging.current && score === 0 && bricksLeft === 6 && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3.5 py-2 rounded-2xl border border-slate-200 shadow-md text-xs font-semibold text-slate-700 pointer-events-none animate-pulse">
            👆 <strong>Nasıl Oynanır:</strong> Tuğlayı geriye doğru çekip nişan alın, bırakıp duvardan aşırtın!
          </div>
        )}

        {/* Floating Notification */}
        {floatingText && (
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0f2b5c] text-white px-4 py-2 rounded-2xl shadow-xl text-sm font-black animate-bounce z-20 pointer-events-none">
            {floatingText.text}
          </div>
        )}

        {/* Game Over / Victory Modal */}
        {gameOver && (
          <div className="absolute inset-0 bg-[#0f2b5c]/85 backdrop-blur-sm flex items-center justify-center p-6 z-30 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-4 shadow-2xl">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-md">
                <Trophy className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900">
                  {score >= 300 ? "🏆 Tebrikler Usta!" : "Tuğlalar Bitti!"}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Toplam Skorunuz: <strong className="text-[#0f2b5c] text-base">{score}</strong> Puan
                </p>
                {score >= highScore && score > 0 && (
                  <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                    🎉 YENİ REKOR!
                  </span>
                )}
              </div>

              {/* Special Reward for 200+ points */}
              {score >= 200 && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-2">
                  <div className="flex items-center justify-center gap-1.5 font-bold text-emerald-800">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Özel Tadilat Keşif İndirimi!</span>
                  </div>
                  <p className="text-[11px] text-emerald-700">
                    Başarılı aşırtma atışlarınız için Sakarya Mimar Yapı&apos;dan %10 keşif & işçilik indirimi kazandınız!
                  </p>
                  <a
                    href={`https://wa.me/${companyInfo.primaryWhatsapp}?text=${encodeURIComponent(
                      `Merhaba Sakarya Mimar Yapı, Tuğla Aşırtma Oyununda ${score} puan yaparak %10 indirim kazandım! Ev tadilat keşfi için bilgi alabilir miyim?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>İndirimi WhatsApp&apos;tan Bildir</span>
                  </a>
                </div>
              )}

              <div className="flex gap-2.5 pt-2">
                <button
                  onClick={resetGame}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-[#0f2b5c] hover:bg-[#163a75] text-white font-bold text-xs shadow-md transition-all"
                >
                  <RotateCcw className="w-4 h-4 text-amber-400" />
                  <span>Tekrar Oyna</span>
                </button>
                <Link
                  href="/"
                  className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition-all"
                >
                  Ana Sayfa
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Controls & Instructions */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Mobil Dokunmatik & Masaüstü Uyumlu</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/projeler" className="text-[#0f2b5c] font-bold hover:underline flex items-center gap-1">
            <span>Gerçek Projelerimiz</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
