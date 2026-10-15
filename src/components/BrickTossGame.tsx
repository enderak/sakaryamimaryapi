"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { 
  Trophy, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  MessageCircle, 
  ChevronRight, 
  Hammer, 
  Flame,
  Send,
  Zap,
  Target as TargetIcon
} from "lucide-react";
import { companyInfo } from "@/data/company";

// Sound Synthesizer via Web Audio API (Zero external assets needed)
class GameAudio {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMuted(muted: boolean) {
    this.muted = muted;
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
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {}
  }

  // Launch swoosh
  public playLaunch() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(240, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(650, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.16, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
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
      osc.frequency.setValueAtTime(95, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(35, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.14, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch {}
  }

  // Score / Target hit
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
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.05);
        gain.gain.setValueAtTime(0.14, this.ctx.currentTime + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.05 + 0.22);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.05);
        osc.stop(this.ctx.currentTime + idx * 0.05 + 0.22);
      });
    } catch {}
  }
}

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 380;
const GROUND_Y = 320;
const SLING_X = 85;
const SLING_Y = 245;

interface BrickTossGameProps {
  minScoreForDiscount?: number;
  discountPercentage?: number;
}

export default function BrickTossGame({
  minScoreForDiscount = 200,
  discountPercentage = 10
}: BrickTossGameProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<GameAudio>(new GameAudio());

  // Game UI state
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [bricksLeft, setBricksLeft] = useState(6);
  const [level, setLevel] = useState(1);
  const [combo, setCombo] = useState(0);
  const [wind, setWind] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [muted, setMuted] = useState(false);
  const [floatingText, setFloatingText] = useState<{ text: string; x: number; y: number } | null>(null);
  const [selectedAngle, setSelectedAngle] = useState<"low" | "medium" | "high">("medium");

  // Interaction & Physics state
  const isDragging = useRef(false);
  const dragPos = useRef({ x: SLING_X - 35, y: SLING_Y + 30 }); // Default pull for quick fire preview
  const isAimingActive = useRef(false);

  const brick = useRef({
    active: false,
    x: SLING_X,
    y: SLING_Y,
    vx: 0,
    vy: 0,
    angle: 0,
    va: 0,
    width: 22,
    height: 13,
    color: "#b91c1c"
  });

  const wall = useRef({
    x: 240,
    width: 32,
    height: 135 // height from ground
  });

  const target = useRef({
    x: 370,
    y: GROUND_Y - 28,
    width: 68,
    height: 28,
    vx: 1.1,
    points: 100
  });

  const particles = useRef<Array<{ x: number; y: number; vx: number; vy: number; color: string; life: number }>>([]);

  // Load High Score
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

  // Reset Game
  const resetGame = useCallback(() => {
    setScore(0);
    setBricksLeft(6);
    setLevel(1);
    setCombo(0);
    setWind(0);
    setGameOver(false);
    brick.current.active = false;
    brick.current.x = SLING_X;
    brick.current.y = SLING_Y;
    isDragging.current = false;
    isAimingActive.current = false;
    wall.current.height = 135;
    target.current.x = 370;
    target.current.vx = 1.1;
  }, []);

  // Configure round parameters
  const setupLevel = useCallback((lvl: number) => {
    setLevel(lvl);
    // Wall height increases with level (max 180)
    const newWallHeight = Math.min(185, 130 + lvl * 12);
    wall.current.height = newWallHeight;
    // Wind factor on level 2+
    const newWind = lvl > 1 ? Number(((Math.random() - 0.5) * (lvl * 1.4)).toFixed(1)) : 0;
    setWind(newWind);
    // Randomize target position & speed
    target.current.x = 330 + Math.random() * 85;
    target.current.vx = (lvl > 1 ? 1.2 + lvl * 0.3 : 1.0) * (Math.random() > 0.5 ? 1 : -1);
  }, []);

  // Launch brick with current drag offsets
  const launchBrick = useCallback((dx: number, dy: number) => {
    if (brick.current.active || gameOver) return;
    audioRef.current.playLaunch();
    const force = 0.18;
    brick.current.x = SLING_X;
    brick.current.y = SLING_Y;
    brick.current.vx = dx * force;
    brick.current.vy = dy * force;
    brick.current.angle = 0;
    brick.current.va = (dx > 0 ? 0.08 : -0.08);
    brick.current.active = true;
    isDragging.current = false;
    isAimingActive.current = false;
  }, [gameOver]);

  // Quick Fire Button Action
  const handleQuickFire = () => {
    if (brick.current.active || gameOver) return;
    let dx = 42;
    let dy = 44;
    if (selectedAngle === "low") {
      dx = 48;
      dy = 32;
    } else if (selectedAngle === "high") {
      dx = 34;
      dy = 52;
    }
    launchBrick(dx, dy);
  };

  // Turn End Handler
  const handleTurnFinished = useCallback((success: boolean) => {
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
        setLevel((currentLvl) => {
          const nextLvl = currentLvl + 1;
          setupLevel(nextLvl);
          return nextLvl;
        });
      }
      return remaining;
    });
  }, [setupLevel]);

  // Canvas Main Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const GRAVITY = 0.38;

    const render = () => {
      const width = CANVAS_WIDTH;
      const height = CANVAS_HEIGHT;

      // 1. Sky Gradient
      const sky = ctx.createLinearGradient(0, 0, 0, height);
      sky.addColorStop(0, "#bae6fd");
      sky.addColorStop(0.6, "#f8fafc");
      sky.addColorStop(1, "#cbd5e1");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, width, height);

      // Construction Silhouette in Background
      ctx.fillStyle = "rgba(148, 163, 184, 0.28)";
      ctx.fillRect(20, GROUND_Y - 140, 50, 140);
      ctx.fillRect(90, GROUND_Y - 180, 65, 180);
      ctx.fillRect(290, GROUND_Y - 160, 60, 160);
      ctx.fillRect(380, GROUND_Y - 210, 75, 210);

      // Crane
      ctx.strokeStyle = "rgba(203, 213, 225, 0.7)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(320, GROUND_Y - 240);
      ctx.lineTo(320, GROUND_Y);
      ctx.lineTo(430, GROUND_Y - 240);
      ctx.stroke();

      // Ground (Zemin)
      ctx.fillStyle = "#64748b";
      ctx.fillRect(0, GROUND_Y, width, height - GROUND_Y);
      ctx.fillStyle = "#334155";
      ctx.fillRect(0, GROUND_Y, width, 5);

      // Update Moving Target (Harç Teknesi)
      const t = target.current;
      if (!gameOver) {
        t.x += t.vx;
        const minX = wall.current.x + wall.current.width + 18;
        const maxX = width - t.width - 10;
        if (t.x <= minX) {
          t.x = minX;
          t.vx *= -1;
        } else if (t.x >= maxX) {
          t.x = maxX;
          t.vx *= -1;
        }
      }

      // Draw Target (El Arabası / Harç Teknesi)
      t.y = GROUND_Y - t.height;
      ctx.fillStyle = "#0f2b5c";
      ctx.beginPath();
      ctx.roundRect(t.x, t.y + 4, t.width, t.height - 4, [4, 8, 4, 4]);
      ctx.fill();

      // Mortar mix inside (Altın harç)
      ctx.fillStyle = "#f59e0b";
      ctx.fillRect(t.x + 4, t.y + 5, t.width - 8, 5);

      // Target Wheels
      ctx.fillStyle = "#0f172a";
      ctx.beginPath();
      ctx.arc(t.x + 12, GROUND_Y - 3, 5, 0, Math.PI * 2);
      ctx.arc(t.x + t.width - 12, GROUND_Y - 3, 5, 0, Math.PI * 2);
      ctx.fill();

      // Target Label
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 9px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("HARÇ TEKNESİ", t.x + t.width / 2, t.y + 19);

      // Draw Wall (Tuğla Duvar)
      const wallX = wall.current.x;
      const wallW = wall.current.width;
      const wallH = wall.current.height;
      const wallY = GROUND_Y - wallH;

      ctx.fillStyle = "#b45309";
      ctx.fillRect(wallX, wallY, wallW, wallH);

      // Horizontal Brick Morter Lines
      ctx.strokeStyle = "#fef3c7";
      ctx.lineWidth = 1.2;
      for (let y = wallY; y < GROUND_Y; y += 12) {
        ctx.beginPath();
        ctx.moveTo(wallX, y);
        ctx.lineTo(wallX + wallW, y);
        ctx.stroke();
      }

      // Scaffolding on Wall
      ctx.strokeStyle = "#0f2b5c";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(wallX - 6, wallY);
      ctx.lineTo(wallX + wallW + 6, wallY);
      ctx.moveTo(wallX + 4, wallY - 14);
      ctx.lineTo(wallX + wallW - 4, wallY - 14);
      ctx.stroke();

      ctx.fillStyle = "#fef08a";
      ctx.fillRect(wallX + 2, wallY + 12, wallW - 4, 14);
      ctx.fillStyle = "#854d0e";
      ctx.font = "bold 8px sans-serif";
      ctx.fillText("DUVAR", wallX + wallW / 2, wallY + 22);

      // Draw Slingshot Platform
      ctx.strokeStyle = "#78350f";
      ctx.lineWidth = 7;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(SLING_X, GROUND_Y);
      ctx.lineTo(SLING_X, SLING_Y + 20);
      ctx.lineTo(SLING_X - 16, SLING_Y - 14);
      ctx.moveTo(SLING_X, SLING_Y + 20);
      ctx.lineTo(SLING_X + 16, SLING_Y - 14);
      ctx.stroke();

      // Slingshot Aiming / Dragging
      if (isDragging.current || isAimingActive.current) {
        const dx = dragPos.current.x;
        const dy = dragPos.current.y;

        // Rubber Bands
        ctx.strokeStyle = "#991b1b";
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(SLING_X - 16, SLING_Y - 14);
        ctx.lineTo(dx, dy);
        ctx.moveTo(SLING_X + 16, SLING_Y - 14);
        ctx.lineTo(dx, dy);
        ctx.stroke();

        // Trajectory Guide Dots
        const simVx = (SLING_X - dx) * 0.18 + wind * 0.3;
        const simVy = (SLING_Y - dy) * 0.18;
        let simX = SLING_X;
        let simY = SLING_Y;
        let simVelY = simVy;

        ctx.fillStyle = "rgba(15, 43, 92, 0.75)";
        for (let i = 0; i < 24; i++) {
          simX += simVx;
          simVelY += GRAVITY;
          simY += simVelY;

          if (simY >= GROUND_Y) break;
          if (simX >= wallX && simX <= wallX + wallW && simY >= wallY) break;

          ctx.beginPath();
          ctx.arc(simX, simY, 2.8, 0, Math.PI * 2);
          ctx.fill();
        }

        // Brick in pouch
        ctx.save();
        ctx.translate(dx, dy);
        ctx.fillStyle = brick.current.color;
        ctx.fillRect(-brick.current.width / 2, -brick.current.height / 2, brick.current.width, brick.current.height);
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1;
        ctx.strokeRect(-brick.current.width / 2, -brick.current.height / 2, brick.current.width, brick.current.height);
        ctx.restore();
      } else if (!brick.current.active) {
        // Idle brick sitting ready in fork
        ctx.fillStyle = brick.current.color;
        ctx.fillRect(SLING_X - 11, SLING_Y - 8, brick.current.width, brick.current.height);
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1;
        ctx.strokeRect(SLING_X - 11, SLING_Y - 8, brick.current.width, brick.current.height);
      }

      // Flying Brick Logic
      if (brick.current.active) {
        const b = brick.current;
        b.x += b.vx;
        b.vy += GRAVITY;
        b.vx += wind * 0.015;
        b.y += b.vy;
        b.angle += b.va;

        // Draw spinning flying brick
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.angle);
        ctx.fillStyle = b.color;
        ctx.fillRect(-b.width / 2, -b.height / 2, b.width, b.height);
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1;
        ctx.strokeRect(-b.width / 2, -b.height / 2, b.width, b.height);
        ctx.restore();

        // 1. Collision with WALL
        if (
          b.x + b.width / 2 >= wallX &&
          b.x - b.width / 2 <= wallX + wallW &&
          b.y + b.height / 2 >= wallY &&
          b.y - b.height / 2 <= GROUND_Y
        ) {
          audioRef.current.playHitWall();
          b.active = false;
          setCombo(0);
          setFloatingText({ text: "Duvara Çarptı! 🧱", x: wallX + 10, y: wallY - 12 });
          handleTurnFinished(false);
        }

        // 2. Collision with TARGET (Success!)
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
            const nextScore = prev + earned;
            if (nextScore > highScore) {
              setHighScore(nextScore);
              try { localStorage.setItem("smy_brick_high_score", String(nextScore)); } catch {}
            }
            return nextScore;
          });

          // Celebration particles
          for (let p = 0; p < 24; p++) {
            particles.current.push({
              x: b.x,
              y: b.y,
              vx: (Math.random() - 0.5) * 6,
              vy: -Math.random() * 5 - 2,
              color: ["#f59e0b", "#10b981", "#0f2b5c", "#ef4444"][Math.floor(Math.random() * 4)],
              life: 35
            });
          }

          setFloatingText({
            text: nextCombo > 1 ? `TAM İSABET! +${earned} (x${nextCombo} Combo!) 🔥` : `HARÇ DOLDU! +${earned} 🎯`,
            x: t.x + 10,
            y: t.y - 20
          });
          handleTurnFinished(true);
        }

        // 3. Hit Ground
        else if (b.y + b.height / 2 >= GROUND_Y) {
          b.active = false;
          audioRef.current.playHitWall();
          setCombo(0);
          setFloatingText({ text: "Iskaladın! 💨", x: b.x, y: GROUND_Y - 15 });
          handleTurnFinished(false);
        }

        // 4. Out of screen
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
        p.vy += 0.22;
        p.life--;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 4, 4);
        if (p.life <= 0) particles.current.splice(i, 1);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [gameOver, combo, highScore, wind, handleTurnFinished]);

  // Touch & Mouse Event Handlers with preventDefault
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const getCoords = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: ((clientX - rect.left) / rect.width) * CANVAS_WIDTH,
        y: ((clientY - rect.top) / rect.height) * CANVAS_HEIGHT
      };
    };

    const onTouchStart = (e: TouchEvent) => {
      if (gameOver || brick.current.active) return;
      e.preventDefault();
      const touch = e.touches[0];
      const coords = getCoords(touch.clientX, touch.clientY);

      // If touched anywhere on the left side (launch zone), start aiming!
      if (coords.x <= wall.current.x) {
        isDragging.current = true;
        isAimingActive.current = true;
        audioRef.current.playPull();
        updateDrag(coords.x, coords.y);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const touch = e.touches[0];
      const coords = getCoords(touch.clientX, touch.clientY);
      updateDrag(coords.x, coords.y);
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      finishDrag();
    };

    const updateDrag = (targetX: number, targetY: number) => {
      const maxPull = 90;
      const dx = targetX - SLING_X;
      const dy = targetY - SLING_Y;
      const dist = Math.min(maxPull, Math.hypot(dx, dy));
      const angle = Math.atan2(dy, dx);

      dragPos.current = {
        x: SLING_X + Math.cos(angle) * dist,
        y: SLING_Y + Math.sin(angle) * dist
      };
    };

    const finishDrag = () => {
      isDragging.current = false;
      const dx = SLING_X - dragPos.current.x;
      const dy = SLING_Y - dragPos.current.y;

      if (Math.hypot(dx, dy) < 12) {
        isAimingActive.current = false;
        return;
      }
      launchBrick(dx, dy);
    };

    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd, { passive: false });

    return () => {
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, [gameOver, launchBrick]);

  // Desktop Mouse Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (gameOver || brick.current.active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * CANVAS_WIDTH;
    const y = ((e.clientY - rect.top) / rect.height) * CANVAS_HEIGHT;

    if (x <= wall.current.x) {
      isDragging.current = true;
      isAimingActive.current = true;
      audioRef.current.playPull();
      dragPos.current = { x, y };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * CANVAS_WIDTH;
    const y = ((e.clientY - rect.top) / rect.height) * CANVAS_HEIGHT;

    const maxPull = 90;
    const dx = x - SLING_X;
    const dy = y - SLING_Y;
    const dist = Math.min(maxPull, Math.hypot(dx, dy));
    const angle = Math.atan2(dy, dx);

    dragPos.current = {
      x: SLING_X + Math.cos(angle) * dist,
      y: SLING_Y + Math.sin(angle) * dist
    };
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const dx = SLING_X - dragPos.current.x;
    const dy = SLING_Y - dragPos.current.y;

    if (Math.hypot(dx, dy) < 12) {
      isAimingActive.current = false;
      return;
    }
    launchBrick(dx, dy);
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden text-slate-800">
      {/* Header Bar */}
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
      <div className="bg-slate-100/90 px-3 py-2 border-b border-slate-200 grid grid-cols-4 gap-2 text-center text-xs">
        <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] text-slate-500 font-bold block">PUAN</span>
          <span className="text-sm font-black text-[#0f2b5c]">{score}</span>
        </div>

        <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] text-slate-500 font-bold block">KALAN TUĞLA</span>
          <div className="flex items-center justify-center gap-1 mt-0.5">
            {Array.from({ length: 6 }).map((_, idx) => (
              <span
                key={idx}
                className={`w-2.5 h-3.5 rounded-xs transition-colors ${
                  idx < bricksLeft ? "bg-red-600 shadow-xs" : "bg-slate-200"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] text-slate-500 font-bold block">SEVİYE {level}</span>
          <span className="text-[11px] font-bold text-slate-700">
            {wind === 0 ? "Rüzgarsız" : wind > 0 ? `➡ +${wind}` : `⬅ ${wind}`}
          </span>
        </div>

        <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] text-slate-500 font-bold block flex items-center justify-center gap-1">
            <Trophy className="w-2.5 h-2.5 text-amber-500" />
            REKOR
          </span>
          <span className="text-sm font-black text-amber-600">{highScore}</span>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="relative w-full aspect-[5/4] sm:aspect-[500/380] bg-slate-200 select-none touch-none overflow-hidden">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="w-full h-full block cursor-crosshair"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />

        {/* Floating Notification */}
        {floatingText && (
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0f2b5c] text-white px-4 py-2 rounded-2xl shadow-xl text-sm font-black animate-bounce z-20 pointer-events-none">
            {floatingText.text}
          </div>
        )}

        {/* Game Over Modal */}
        {gameOver && (
          <div className="absolute inset-0 bg-[#0f2b5c]/85 backdrop-blur-sm flex items-center justify-center p-6 z-30 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-4 shadow-2xl">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-md">
                <Trophy className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900">
                  {score >= minScoreForDiscount ? "🏆 Tebrikler Usta!" : "Tuğlalar Bitti!"}
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

              {score >= minScoreForDiscount && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-2">
                  <div className="flex items-center justify-center gap-1.5 font-bold text-emerald-800">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Özel Tadilat Keşif İndirimi!</span>
                  </div>
                  <p className="text-[11px] text-emerald-700">
                    Başarılı aşırtma atışlarınız için Sakarya Mimar Yapı&apos;dan %{discountPercentage} keşif & işçilik indirimi kazandınız!
                  </p>
                  <a
                    href={`https://wa.me/${companyInfo.primaryWhatsapp}?text=${encodeURIComponent(
                      `Merhaba Sakarya Mimar Yapı, Tuğla Aşırtma Oyununda ${score} puan yaparak %${discountPercentage} indirim kazandım! Ev tadilat keşfi için bilgi alabilir miyim?`
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

      {/* Quick Launch & Angle Controls Bar (Ensures 100% playable on ANY mobile screen!) */}
      <div className="p-3.5 bg-slate-50 border-t border-slate-200 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 text-xs">
            <span className="text-[11px] font-bold text-slate-400 px-1.5">AÇI:</span>
            <button
              onClick={() => setSelectedAngle("low")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedAngle === "low" ? "bg-[#0f2b5c] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Alçak
            </button>
            <button
              onClick={() => setSelectedAngle("medium")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedAngle === "medium" ? "bg-[#0f2b5c] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              İdeal
            </button>
            <button
              onClick={() => setSelectedAngle("high")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedAngle === "high" ? "bg-[#0f2b5c] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Yüksek
            </button>
          </div>

          {/* Big One-Tap Launch Button */}
          <button
            onClick={handleQuickFire}
            disabled={brick.current.active || gameOver}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all disabled:opacity-50"
          >
            <Zap className="w-4 h-4 text-slate-950 fill-slate-950" />
            <span>TUĞLAYI FIRLAT</span>
          </button>
        </div>

        {/* Tip */}
        <p className="text-[11px] text-center text-slate-500">
          💡 <strong>İpucu:</strong> İster ekranda parmağınızla sapanı geriye çekip bırakın, ister <strong>&ldquo;Tuğlayı Fırlat&rdquo;</strong> butonuna basın!
        </p>
      </div>
    </div>
  );
}
