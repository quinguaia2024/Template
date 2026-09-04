import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import eduAvatar from "@/assets/edu-avatar.png";

interface EduAvatarProps {
  /** Tips shown in the speech bubble, rotating */
  tips?: string[];
  /** Size classes for the avatar image */
  sizeClass?: string;
  className?: string;
}

const DEFAULT_TIPS = [
  "Olá! Eu sou o EDU 👋",
  "Vamos aprender juntos?",
  "Cada fase é uma conquista!",
  "O teu futuro começa aqui ✦",
];

const EduAvatar = ({
  tips = DEFAULT_TIPS,
  sizeClass = "w-36 md:w-52",
  className = "",
}: EduAvatarProps) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [tipIndex, setTipIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const [excited, setExcited] = useState(false);
  const inView = useInView(wrapRef, { margin: "-15% 0px" });

  // Rotate tips while visible
  useEffect(() => {
    if (!inView) return;
    setShowBubble(true);
    const t = setInterval(() => setTipIndex((i) => (i + 1) % tips.length), 4000);
    return () => clearInterval(t);
  }, [inView, tips.length]);

  // Tilt toward cursor (pointer devices only)
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2)));
        const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2)));
        setTilt({ x: dx * 10, y: dy * -8 });
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const poke = useCallback(() => {
    setExcited(true);
    setTipIndex((i) => (i + 1) % tips.length);
    setShowBubble(true);
    setTimeout(() => setExcited(false), 900);
  }, [tips.length]);

  return (
    <div ref={wrapRef} className={`relative flex flex-col items-center ${className}`}>
      {/* Speech bubble */}
      <AnimatePresence mode="wait">
        {showBubble && (
          <motion.div
            key={tipIndex}
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -top-12 md:-top-14 z-10 whitespace-nowrap rounded-2xl rounded-bl-sm bg-card border border-border/60 px-4 py-2 text-[11px] md:text-xs font-normal text-card-foreground shadow-lg backdrop-blur-xl"
          >
            {tips[tipIndex]}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glow under avatar */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2/3 h-4 rounded-full bg-primary/15 blur-xl pointer-events-none" />

      {/* Avatar */}
      <motion.button
        type="button"
        aria-label="EDU, o teu educador digital"
        onClick={poke}
        onHoverStart={() => setShowBubble(true)}
        animate={{
          y: excited ? [0, -18, 0] : [0, -10, 0],
          rotate: excited ? [0, -4, 4, 0] : tilt.x * 0.4,
          rotateY: tilt.x,
          rotateX: tilt.y,
          scale: excited ? [1, 1.06, 1] : 1,
        }}
        transition={
          excited
            ? { duration: 0.9, ease: "easeInOut" }
            : { y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 0.4 }, rotateY: { duration: 0.4 }, rotateX: { duration: 0.4 } }
        }
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ transformStyle: "preserve-3d", perspective: 600 }}
        className={`relative ${sizeClass} will-change-transform cursor-pointer select-none`}
      >
        <img
          src={eduAvatar}
          alt="EDU — Educador Digital do Mentor Digital"
          draggable={false}
          className="w-full h-auto drop-shadow-[0_20px_40px_hsl(var(--primary)/0.25)]"
        />
      </motion.button>
    </div>
  );
};

export default EduAvatar;
